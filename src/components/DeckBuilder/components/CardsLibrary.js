import React, { Component } from "react";
import {
    factionIndexes,
    bannedCards,
    restrictedCards,
    factionIdPrefix,
    wucards,
    wufactions,
} from "../../../data";
import { List, AutoSizer } from "react-virtualized";
import { ADD_CARD, REMOVE_CARD } from "../../../reducers/deckUnderBuild";
import { connect } from "react-redux";
import WUCard from "../../../atoms/WUCard";
import { cardTypes } from "../../../data/wudb";

class VirtualizedCardsList extends Component {
    constructor(props) {
        super(props);
        this.listWidth = this._calcListWidth();
        this.listHeight = this._calcListHeight();
        this.state = {
            cards: this.props.cards,
        };
    }

    _rowRenderer = (params) => {
        const renderedItem = this._renderItem(params.index);
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        );
    };

    _renderItem = (index) => {
        const { card, expanded } = this.state.cards[index];
        return (
            <WUCard
                key={card.id}
                {...card}
                editMode={this.props.editMode}
                isRestricted={
                    this.props.isEligibleForOp &&
                    Boolean(restrictedCards[card.id])
                }
                isAlter={index % 2 === 0}
                toggleCardInDeck={this.handleToggleCardInDeck}
                expanded={expanded}
                onExpandChange={this._handleExpanded.bind(this, index)}
                withAnimation={false}
            />
        );
    };

    handleToggleCardInDeck = (id) => {
        this.props.toggleCardInDeck(id);
    };

    _setRef = (ref) => {
        this.List = ref;
    };

    _handleExpanded = (index) => {
        this.setState((state) => ({
            cards: [
                ...state.cards.slice(0, index),
                {
                    card: state.cards[index].card,
                    expanded: !state.cards[index].expanded,
                },
                ...state.cards.slice(index + 1),
            ],
        }));
        this.List.recomputeRowHeights();
        this.List.forceUpdate();
    };

    _calcRowHeight = (params) => {
        const item = this.state.cards[params.index];
        if (item) {
            return item.expanded ? 550 : 70;
        }

        return 70;
    };

    _calcListWidth = () => {
        const screenWidth = window.screen.width;
        if (screenWidth < 800) {
            return screenWidth;
        }

        return screenWidth / 2;
    };

    _calcListHeight = () => {
        return window.screen.height * 0.8;
    };

    render() {
        return (
            <div style={{ margin: "0 0", height: "100%" }}>
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            ref={this._setRef}
                            width={width}
                            height={height}
                            rowCount={this.props.cards.length}
                            rowHeight={this._calcRowHeight}
                            rowRenderer={this._rowRenderer}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

function stringTypeToNumber(type) {
    switch(type) {
        case 'Objective': 
            return 0;
        case 'Ploy':
            return 1;
        case 'Spell': 
            return 1;
        case 'Upgrade':
            return 2;    
    }
}

const _sort = (card1, card2) => {
    const t1 = stringTypeToNumber(card1.type);
    const t2 = stringTypeToNumber(card2.type);
    return (
        t1 - t2 ||
        card2.ranking - card1.ranking ||
        card2.faction - card1.faction
    );
};

function FilterableCardLibrary(props) {
    const { searchText, visibleCardTypes, editMode, deckPlayFormat } = props;
    const currentDeck = editMode
        ? props.editModeCurrentDeck
        : props.createModeCurrentDeck;
    const selectedFaction = props.editMode
        ? props.editModeSelectedFaction
        : props.createModeSelectedFaction;
    const selectedFactionPrefix = factionIdPrefix[selectedFaction];

    const _reloadCards = () => {
        const selectedFaction = props.editMode
            ? props.editModeSelectedFaction
            : props.createModeSelectedFaction;
        // const selectedFactionDefaultSet = props.editMode
        //     ? props.editModeFactionDefaultSet
        //     : props.createModeFactionDefaultSet;
        const selectedSets = props.editMode
            ? props.editModeSelectedSets
            : props.createModeSelectedSets;

        const faction = Object.values(wufactions).find(faction => faction.name == selectedFaction);
        const factionCards = Object.values(wucards)
            .filter(card => 
                card.factionId === faction.id 
                && (!!card.duplicates ? card.id === Math.max(...card.duplicates) : true));

        console.log(factionCards, selectedSets);

        return selectedSets?.length > 0 
            ? [
                ...factionCards, 
                ...Object.values(wucards)
                    .filter(card => 
                        !!selectedSets.find(set => +set == card.setId) 
                        && card.factionId === 1
                        && (!!card.duplicates ? card.id === Math.max(...card.duplicates) : true))
            ] : factionCards;
    };

    const cards = _reloadCards().map(c => {
        // previously cards were in format '00000' where first two digits were wave 
        // (e.g. Shadespire, Beastgrave or Power Unbound) and then card number
        // =========
        // new format has cards as numbers, which requires padding 0s for now for backward compatibility.

        let cid = `${c.id}`.padStart(5, '0');
        const universalRank =
            props.cardsRanking && props.cardsRanking["universal"][cid]
                ? props.cardsRanking["universal"][cid]
                : 0;
        const rank =
            props.cardsRanking &&
            props.cardsRanking[selectedFactionPrefix] &&
            props.cardsRanking[selectedFactionPrefix][cid]
                ? props.cardsRanking[selectedFactionPrefix][cid] * 10000
                : universalRank;

        const card = { id: cid, ranking: rank, ...c };
        return card;
    });

    console.log(cards);
    let filteredCards = cards
        .filter(({ type }) => {
            return visibleCardTypes.includes(cardTypes.indexOf(type))
        })
        .filter(({ id, faction }) => {
            switch (deckPlayFormat) {
                case "championship":
                    return Number(faction) === 0
                        ? !Boolean(bannedCards[id]) && Number(id) >= 3000
                        : true;
                case "relic":
                    return !Boolean(bannedCards[id]);
                default:
                    return true;
            }
        });

    if (isNaN(searchText)) {
        filteredCards = filteredCards.filter((c) => {
            if (!searchText) return true;

            return (
                c.name.toUpperCase().includes(searchText) ||
                c.rule.toUpperCase().includes(searchText)
            );
        });
    } else {
        filteredCards = filteredCards.filter(({ id }) =>
            `${id}`.padStart(5, '0').includes(searchText)
        );
    }

    filteredCards = filteredCards.filter((c) => {
        if (c.type === 3) {
            return factionIndexes.indexOf(selectedFaction) > 8;
        }

        return true;
    });

    const sorted = filteredCards.sort((c1, c2) => _sort(c1, c2));
    const drawableCards = sorted.map((c) => ({ card: c, expanded: false }));

    return (
        <div style={{ height: "100vh" }}>
            <VirtualizedCardsList
                key={drawableCards.length * 31}
                isEligibleForOp={props.eligibleForOP}
                cards={drawableCards}
                currentDeck={currentDeck}
                editMode={props.editMode}
                restrictedCardsCount={props.restrictedCardsCount}
                editRestrictedCardsCount={props.editRestrictedCardsCount}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        searchText: state.cardLibraryFilters.searchText,
        visibleCardTypes: state.cardLibraryFilters.visibleCardTypes,
        eligibleForOP: state.cardLibraryFilters.eligibleForOP,
        cardsRanking: state.cardLibraryFilters.cardsRanking,
        deckPlayFormat: state.cardLibraryFilters.deckPlayFormat,

        createModeSelectedSets: state.cardLibraryFilters.createModeSets,
        createModeSelectedFaction: state.deckUnderBuild.faction,
        createModeFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
        createModeCurrentDeck: state.deckUnderBuild.deck,
        restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,

        editModeSelectedSets: state.cardLibraryFilters.editModeSets,
        editModeSelectedFaction: state.deckUnderEdit.faction,
        editModeFactionDefaultSet: state.deckUnderEdit.factionDefaultSet,
        editModeCurrentDeck: state.deckUnderBuild.deck,
        editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (card) => dispatch({ type: ADD_CARD, card: card }),
        removeCard: (card) => dispatch({ type: REMOVE_CARD, card: card }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableCardLibrary);
