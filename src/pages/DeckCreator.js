import React, { Component } from 'react';
import FactionToggle from '../components/FactionToggle';
import DeckBuilder from '../components/DeckBuilder';
import { 
    SET_FACTION, 
    SET_SETS, 
    CHANGE_NAME, 
    CHANGE_SOURCE, 
    ADD_CARD, 
    REMOVE_CARD, 
    CLEAR_DECK,
    RESET_DECK } from '../reducers/deckUnderBuild';
import { connect } from 'react-redux';

class DeckCreator extends Component {

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '0 .5rem 0 .5rem'}}>
                    <FactionToggle selectedFaction={this.props.selectedFaction} setFaction={this.props.setFaction} />
                </div>
                <DeckBuilder 
                    key={this.props.selectedFaction} {...this.props} />
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        selectedFaction: state.deckUnderBuild.faction,
        selectedSets: state.deckUnderBuild.sets,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: faction => dispatch({type: SET_FACTION, faction: faction}),
        setSets: sets => dispatch({ type: SET_SETS, sets: sets }),
        changeName: value => dispatch({ type: CHANGE_NAME, name: value }),
        changeSource: value => dispatch({ type: CHANGE_SOURCE, source: value }),
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),
        clearDeck: () => dispatch({ type: CLEAR_DECK }),
        resetDeck: () => dispatch({ type: RESET_DECK }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCreator);