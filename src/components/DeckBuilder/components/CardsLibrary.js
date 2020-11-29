import React, { useEffect, useRef, useState } from "react";
import {
    bannedCards,
    restrictedCards,
    wucards,
} from "../../../data";
import { List, AutoSizer } from "react-virtualized";
import { ADD_CARD, REMOVE_CARD } from "../../../reducers/deckUnderBuild";
import { connect } from "react-redux";
import WUCard from "../../../atoms/WUCard";
import { cardTypes } from "../../../data/wudb";
import { useDeckBuilderState } from "../../../pages/DeckCreator";


// I am not sure if I need to use useEffect here
// there must be some more simple way to check which cards are expanded
// without modifying cards state.
function VirtualizedCardsList(props) {
    const listRef = useRef();
    const [cards, setCards] = useState(props.cards);

    useEffect(() => {
        setCards(props.cards);
    }, [props.cards])

    const _rowRenderer = (params) => {
        const renderedItem = _renderItem(params.index);
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        );
    };

    const _renderItem = (index) => {
        const { card, expanded } = cards[index];
        return (
            <WUCard
                key={card.id}
                card={card}
                editMode={props.editMode}
                isRestricted={
                    props.isEligibleForOp &&
                    Boolean(restrictedCards[card.id])
                }
                isAlter={index % 2 === 0}
                toggleCardInDeck={handleToggleCardInDeck}
                expanded={expanded}
                onExpandChange={_handleExpanded.bind(this, index)}
                withAnimation={false}
            />
        );
    };

    const handleToggleCardInDeck = (id) => {
        props.toggleCardInDeck(id);
    };

    const _handleExpanded = (index) => {
        setCards(prev => 
            [
                ...prev.slice(0, index),
                {
                    card: prev[index].card,
                    expanded: !prev[index].expanded,
                },
                ...prev.slice(index + 1),
            ],
        );
        listRef.current.recomputeRowHeights();
        listRef.current.forceUpdate();
    };

    const _calcRowHeight = (params) => {
        const item = cards[params.index];
        if (item) {
            return item.expanded ? 550 : 70;
        }

        return 70;
    };

    return (
        <div style={{ margin: "0 0", height: "100%" }}>
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        ref={listRef}
                        width={width}
                        height={height}
                        rowCount={cards.length}
                        rowHeight={_calcRowHeight}
                        rowRenderer={_rowRenderer}
                    />
                )}
            </AutoSizer>
        </div>
    );
}

function stringTypeToNumber(type) {
    switch (type) {
        case "Objective":
            return 0;
        case "Ploy":
            return 1;
        case "Spell":
            return 1;
        case "Upgrade":
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
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const state = useDeckBuilderState();

    useEffect(() => {
        console.log(
            `%c FilterableCardLibrary will run useEffect because hook return new STATE`,
            "color: #3B82F6"
        );

        const factionCards = Object.values(wucards).filter(
            (card) =>
                card.factionId === state.faction?.id &&
                (!!card.duplicates
                    ? card.id === Math.max(...card.duplicates)
                    : true)
        );

        console.log(factionCards);
        const nextCards = [
            ...factionCards,
            ...Object.values(wucards).filter(
                (card) =>
                    !!state.sets.find((set) => set.id == card.setId) &&
                    card.factionId === 1 &&
                    (!!card.duplicates
                        ? card.id === Math.max(...card.duplicates)
                        : true)
            ),
        ].map((c) => {
            // previously cards were in format '00000' where first two digits were wave
            // (e.g. Shadespire, Beastgrave or Power Unbound) and then card number
            // =========
            // new format has cards as numbers, which requires padding 0s for now for backward compatibility.

            // let cid = `${c.id}`.padStart(5, "0");
            const universalRank =
                props.cardsRanking && props.cardsRanking["u"][c.id]
                    ? props.cardsRanking["u"][c.id]
                    : 0;
            const rank =
                props.cardsRanking &&
                props.cardsRanking[state.faction.abbr] &&
                props.cardsRanking[state.faction.abbr][c.id]
                    ? props.cardsRanking[state.faction.abbr][c.id] * 10000
                    : universalRank;

            const card = { oldId: `${c.id}`.padStart(5, "0"), ranking: rank, ...c };
            return card;
        });

        console.log(nextCards);
        setCards(nextCards);
    }, [state]);

    const { searchText, visibleCardTypes, editMode, deckPlayFormat } = props;
    const currentDeck = editMode
        ? props.editModeCurrentDeck
        : props.createModeCurrentDeck;
    // const selectedFaction = props.editMode
    //     ? props.editModeSelectedFaction
    //     : props.createModeSelectedFaction;
    //const selectedFactionPrefix = factionIdPrefix[selectedFaction];

    // const _reloadCards = () => {
    //     // const selectedFaction = props.editMode
    //     //     ? props.editModeSelectedFaction
    //     //     : props.createModeSelectedFaction;
    //     // const selectedFactionDefaultSet = props.editMode
    //     //     ? props.editModeFactionDefaultSet
    //     //     : props.createModeFactionDefaultSet;
    //     // const selectedSets = props.editMode
    //     //     ? props.editModeSelectedSets
    //     //     : props.createModeSelectedSets;

    //     const faction = wufactions[state.faction];
    //     const factionCards = Object.values(wucards).filter(
    //         (card) =>
    //             card.factionId === faction.id &&
    //             (!!card.duplicates
    //                 ? card.id === Math.max(...card.duplicates)
    //                 : true)
    //     );

    //     return [
    //         ...factionCards,
    //         ...Object.values(wucards).filter(
    //             (card) =>
    //                 !!state.sets.find((set) => set.id == card.setId) &&
    //                 card.factionId === 1 &&
    //                 (!!card.duplicates
    //                     ? card.id === Math.max(...card.duplicates)
    //                     : true)
    //         ),
    //     ];
    // };

    // const cards = _reloadCards().map((c) => {
    //     // previously cards were in format '00000' where first two digits were wave
    //     // (e.g. Shadespire, Beastgrave or Power Unbound) and then card number
    //     // =========
    //     // new format has cards as numbers, which requires padding 0s for now for backward compatibility.

    //     let cid = `${c.id}`.padStart(5, "0");
    //     const universalRank =
    //         props.cardsRanking && props.cardsRanking["u"][cid]
    //             ? props.cardsRanking["u"][cid]
    //             : 0;
    //     const rank =
    //         props.cardsRanking &&
    //         props.cardsRanking[selectedFactionPrefix] &&
    //         props.cardsRanking[selectedFactionPrefix][cid]
    //             ? props.cardsRanking[selectedFactionPrefix][cid] * 10000
    //             : universalRank;

    //     const card = { id: cid, ranking: rank, ...c };
    //     return card;
    // });

    useEffect(() => {
        let filteredCards = cards
            .filter(({ type }) => {
                return visibleCardTypes.includes(cardTypes.indexOf(type));
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
                `${id}`.padStart(5, "0").includes(searchText)
            );
        }

        // filteredCards = filteredCards.filter((c) => {
        //     if (c.type === 3) {
        //         return factionIndexes.indexOf(selectedFaction) > 8;
        //     }

        //     return true;
        // });

        const sorted = filteredCards.sort((c1, c2) => _sort(c1, c2));
        const drawableCards = sorted.map((c) => ({ card: c, expanded: false }));
        setFilteredCards(drawableCards);
    }, [cards, searchText, visibleCardTypes]);

    return (
        <div style={{ height: "100vh" }}>
            <VirtualizedCardsList
                // key={drawableCards.length * 31}
                isEligibleForOp={props.eligibleForOP}
                cards={filteredCards}
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
        // searchText: state.cardLibraryFilters.searchText,
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
