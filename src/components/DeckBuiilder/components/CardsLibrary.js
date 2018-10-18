import React, { Component } from 'react';
import { getCardsByFactionAndSets, cardsDb } from '../../../data';
import { getWUCardByIdFromDB } from '../../WUCard';
import { ADD_CARD, REMOVE_CARD } from '../../../reducers/deckUnderBuild';
import { connect } from 'react-redux';
import { Set } from 'immutable';

export const toggleCardInDeck = (id, currentDeck, addCard, removeCard) => {
    if(currentDeck.includes(id)) {
        removeCard(id);
    } else {
        addCard(id)
    }
}

class CardsLibrary extends Component {

    render() {
        const { searchText, visibleCardTypes, currentDeck } = this.props;
        const cards = this._reloadCards().map(cid => ({id: cid, ...cardsDb[cid]}));
        let filteredCards = cards.filter(({ type }) => visibleCardTypes.includes(type)); 
        if(isNaN(searchText)) {
            filteredCards = filteredCards 
                .filter(c => {
                    if(!searchText) return true;

                    return c.name.toUpperCase().includes(searchText) || c.rule.toUpperCase().includes(searchText);
                });
        } else {
            filteredCards = filteredCards.filter(({ id }) => id.slice(-3).includes(searchText));
        }

        const content = filteredCards.toJS().sort((c1, c2) => c1.type - c2.type || c2.faction - c1.faction || c1.id - c2.id)
            .map((c, i) => {
                const cardPN = parseInt(c.id.slice(-3), 10);
                return getWUCardByIdFromDB(c.id, cardPN, c, i % 2 === 0, this._toggleCardInDeck.bind(this, c.id), currentDeck.some(id => id  === c.id))
            });

        return (
            <div>
                { content }
            </div>
        );
    }

    _toggleCardInDeck = id => {
        toggleCardInDeck(id, this.props.currentDeck, this.props.addCard, this.props.removeCard);
    }

    _reloadCards = () => {
        const factionCards = getCardsByFactionAndSets(this.props.selectedFaction, this.props.selectedSets, this.props.selectedFactionDefaultSet);
        if(this.props.selectedSets.length > 0) {
            const universalCards = getCardsByFactionAndSets('universal', this.props.selectedSets);
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
        selectedSets: state.cardLibraryFilters.sets,
        
        currentDeck: state.deckUnderBuild.deck,
        selectedFaction: state.deckUnderBuild.faction,
        selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsLibrary);