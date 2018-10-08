import React, { Component } from 'react';
import FactionToggle from '../components/FactionToggle';
import DeckBuilder from '../components/DeckBuilder';
import { 
    SET_FACTION, 
    CHANGE_NAME, 
    CHANGE_SOURCE, 
    ADD_CARD, 
    REMOVE_CARD, 
    CLEAR_DECK,
    RESET_DECK, 
    CHANGE_DESCRIPTION} from '../reducers/deckUnderBuild';

import { SET_SETS } from '../reducers/cardLibraryFilters';    
import { connect } from 'react-redux';

class DeckCreator extends Component {

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{paddingBottom: '1rem', margin: '0 .5rem 0 .5rem'}}>
                    <FactionToggle selectedFaction={this.props.selectedFaction} setFaction={this.props.setFaction} />
                </div>
                <DeckBuilder key={this.props.selectedFaction} {...this.props} />
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        selectedFaction: state.deckUnderBuild.faction,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source,
        currentDeckDescription: state.deckUnderBuild.desc,
        
        selectedSets: state.cardLibraryFilters.sets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: faction => dispatch({type: SET_FACTION, faction: faction}),
        changeName: value => dispatch({ type: CHANGE_NAME, name: value }),
        changeSource: value => dispatch({ type: CHANGE_SOURCE, source: value }),
        changeDescription: value => dispatch({ type: CHANGE_DESCRIPTION, desc: value }),
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),
        clearDeck: () => dispatch({ type: CLEAR_DECK }),
        resetDeck: () => dispatch({ type: RESET_DECK }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCreator);