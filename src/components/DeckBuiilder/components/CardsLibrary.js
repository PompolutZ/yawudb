import React, { Component } from 'react';
import { getCardsByFactionAndSets, cardsDb, factionIndexes, bannedCards, restrictedCards } from '../../../data';
import { List, AutoSizer } from 'react-virtualized';
import { ADD_CARD, REMOVE_CARD } from '../../../reducers/deckUnderBuild';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import WUCard from '../../../atoms/WUCard';

// export const toggleCardInDeck = (id, currentDeck, addCard, removeCard) => {
//     if(currentDeck.includes(id)) {
//         removeCard(id);
//     } else {
//         addCard(id)
//     }
// }

class VirtualizedCardsList extends Component {
    constructor(props) {
        super(props);
        this.listWidth = this._calcListWidth();
        this.listHeight = this._calcListHeight();
        this.state = {
            cards: this.props.cards
        }
    }
    
    _rowRenderer = params => {
            const renderedItem = this._renderItem(params.index)
            return (
                <div key={params.key} style={params.style} >
                    { renderedItem }
                </div>
            );
    }

    _renderItem = index => {
        const { card, expanded } = this.state.cards[index]; 
        return <WUCard key={card.id} {...card}
            editMode={this.props.editMode}
            isRestricted={this.props.isEligibleForOp && Boolean(restrictedCards[card.id])} 
            isAlter={index % 2 === 0} 
            toggleCardInDeck={this.handleToggleCardInDeck}
            expanded={expanded}
            onExpandChange={this._handleExpanded.bind(this, index)}
            withAnimation={false} />
    }

    handleToggleCardInDeck = id => {
        this.props.toggleCardInDeck(id);
    }

    _setRef = ref => {
        this.List = ref;
    }

    _handleExpanded = index => {
        this.setState(state => ({ cards: [
            ...state.cards.slice(0, index), 
            {card: state.cards[index].card, expanded: !state.cards[index].expanded},
            ...state.cards.slice(index + 1)]}));
        this.List.recomputeRowHeights();
        this.List.forceUpdate();
    }

    _calcRowHeight = params => {
        const item = this.state.cards[params.index];
        if(item) {
            return item.expanded ? 550 : 75;
        }    

        return 75;
    }

    _calcListWidth = () => {
        const screenWidth = window.screen.width;
        if(screenWidth < 800) {
            return screenWidth - 16;
        }
            
        return screenWidth / 2 - 16;
    }

    _calcListHeight = () => {
        return window.screen.height * .8;
    }

    render() {
        return (
            <div style={{ margin: '0 .5rem'}}>
                <AutoSizer disableHeight>
                    {
                        () => (
                            <List
                            ref={this._setRef}
                            width={this.listWidth}
                            height={this.listHeight}
                            rowCount={this.props.cards.length}
                            rowHeight={this._calcRowHeight}
                            rowRenderer={this._rowRenderer} />
                        )
                    }
                </AutoSizer>
            </div>
        );
    }
}

class FilterableCardLibrary extends Component {

    render() {
        const { searchText, visibleCardTypes, editMode } = this.props;
        const currentDeck = editMode ? this.props.editModeCurrentDeck : this.props.createModeCurrentDeck;
        const cards = this._reloadCards().map(cid => ({id: cid, ranking: this.props.cardsRanking[parseInt(cid.slice(0,2), 10)][parseInt(cid.slice(-3), 10)], ...cardsDb[cid]}));
        
        const bannedIds = Object.keys(bannedCards);
        let filteredCards = cards.filter(({ type }) => visibleCardTypes.includes(type)).filter(({ id }) => this.props.eligibleForOP && !bannedIds.includes(id)); 
        if(isNaN(searchText)) {
            filteredCards = filteredCards 
                .filter(c => {
                    if(!searchText) return true;

                    return c.name.toUpperCase().includes(searchText) || c.rule.toUpperCase().includes(searchText);
                });
        } else {
            filteredCards = filteredCards.filter(({ id }) => id.slice(-3).includes(searchText));
        }

        const selectedFaction = this.props.editMode ? this.props.editModeSelectedFaction : this.props.createModeSelectedFaction;

        filteredCards = filteredCards.filter(c => {
            if (c.type === 3) {
                return factionIndexes.indexOf(selectedFaction) > 8;
            }
                
            return true;
        });
        const sorted = filteredCards.toJS().sort((c1, c2) => this._sort(c1, c2));
        const drawableCards = sorted.map(c => ({ card: c, expanded: false }))
        return (
            <div>
                <VirtualizedCardsList 
                    key={drawableCards.length * 31} 
                    isEligibleForOp={this.props.eligibleForOP} 
                    cards={drawableCards} 
                    currentDeck={currentDeck} 
                    toggleCardInDeck={this._toggleCardInDeck}
                    editMode={this.props.editMode} 
                    restrictedCardsCount={this.props.restrictedCardsCount}
                    editRestrictedCardsCount={this.props.editRestrictedCardsCount} />
            </div>
        );
    }

    _sort = (card1, card2) => {
        const t1 = (card1.type === 1 || card1.type === 3) ? 1 : card1.type;
        const t2 = (card2.type === 1 || card2.type === 3) ? 1 : card2.type;

        return t1 - t2 || card2.ranking - card1.ranking;
    }

    _reloadCards = () => {
        const selectedFaction = this.props.editMode ? this.props.editModeSelectedFaction : this.props.createModeSelectedFaction;
        const selectedFactionDefaultSet = this.props.editMode ? this.props.editModeFactionDefaultSet : this.props.createModeFactionDefaultSet;
        const selectedSets = this.props.editMode ? this.props.editModeSelectedSets : this.props.createModeSelectedSets;
        const factionCards = getCardsByFactionAndSets(selectedFaction, selectedSets, selectedFactionDefaultSet);
        if(selectedSets.length > 0) {
            const universalCards = getCardsByFactionAndSets('universal', selectedSets);
            return new Set(factionCards).union(new Set(universalCards));     
        } else {
            return new Set(factionCards);
        }
    }
}

const mapStateToProps = state => {
    return {
        searchText: state.cardLibraryFilters.searchText,
        visibleCardTypes: state.cardLibraryFilters.visibleCardTypes,
        eligibleForOP: state.cardLibraryFilters.eligibleForOP,
        cardsRanking: state.cardLibraryFilters.cardsRanking,

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
        
        // currentDeck: state.deckUnderBuild.deck,
        // selectedFaction: state.deckUnderBuild.faction,
        // selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableCardLibrary);