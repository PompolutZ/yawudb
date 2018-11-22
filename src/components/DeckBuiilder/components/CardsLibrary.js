import React, { Component } from 'react';
import { getCardsByFactionAndSets, cardsDb, factionIndexes } from '../../../data';
import { ADD_CARD, REMOVE_CARD } from '../../../reducers/deckUnderBuild';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import WUCard from '../../../atoms/WUCard';

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

        // hide spells for Shadespire factions
        filteredCards = filteredCards.filter(c => {
            if (c.type === 3) {
                return factionIndexes.indexOf(this.props.selectedFaction) > 8;
            }
                
            return true;
        });

        const sorted = filteredCards.toJS().sort((c1, c2) => this._sort(c1, c2));
        const content = sorted 
            .map((c, i) => {
                return <WUCard key={i} {...c} 
                    isAlter={i % 2 === 0} 
                    toggleCardInDeck={this._toggleCardInDeck.bind(this, c.id)} 
                    inDeck={currentDeck.some(id => id  === c.id)}  />
            });

        return (
            <div>
                { content }
            </div>
        );
    }

    _sort = (card1, card2) => {
        const t1 = (card1.type === 1 || card1.type === 3) ? 1 : card1.type;
        const t2 = (card2.type === 1 || card2.type === 3) ? 1 : card2.type;

        return t1 - t2 || card2.faction - card1.faction || card1.id - card2.id;
    }

    _sortByType = (type1, type2) => {
        if(type1 === 0 && (type2 === 1 || type2 === 3)) {
            return -1;
        }
        
        if((type1 === 1 || type1 === 3) && type2 === 2) {
            return -1;
        }
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