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

import { connect } from 'react-redux';

import './DeckCreator.css';

class DeckCreator extends Component {
    state = {
        isEdit: this.props.match.path.startsWith('/deck/edit')
    }

    render() {
        
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div className="factionToggle">
                    <FactionToggle editMode={this.state.isEdit} selectedFaction={this.props.selectedFaction} setFaction={this.props.setFaction} />
                </div>
                <DeckBuilder
                    key={this.props.selectedFaction} 
                    editMode={this.state.isEdit}
                    {...this.props} />
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        selectedFaction: state.deckUnderBuild.faction,
        selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source,
        currentDeckDescription: state.deckUnderBuild.desc,
        
        //selectedSets: Object.keys(state.userExpansions),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: (faction, defaultSet) => dispatch({type: SET_FACTION, faction: faction, defaultSet: defaultSet}),
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