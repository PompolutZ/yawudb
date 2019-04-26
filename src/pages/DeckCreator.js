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
import { 
    EDIT_RESET_DECK, 
    EDIT_FACTION, 
    EDIT_DECK_NAME, 
    EDIT_DECK_DESCRIPTION, 
    EDIT_ADD_CARD, 
    EDIT_REMOVE_CARD, 
    EDIT_CLEAR_ALL_CARDS_IN_DECK, 
    EDIT_DECK_SOURCE } from '../reducers/deckUnderEdit';
import { CHANGE_SEARCH_TEXT } from '../reducers/cardLibraryFilters';
import { connect } from 'react-redux';

class DeckCreator extends Component {
    state = {
        isEdit: this.props.match.path.startsWith('/deck/edit')
    }

    static getDerivedStateFromProps(props, state) {
        const isEdit = props.match.path.startsWith('/deck/edit');
        if(isEdit !== state.isEdit) {
            return {
                isEdit: isEdit,
            }
        }

        return null;
    }

    render() {
        const selectedFaction = this.state.isEdit ? this.props.editSelectedFaction : this.props.selectedFaction;
        const setFaction = this.state.isEdit ? this.props.editFaction : this.props.setFaction;
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div>
                    <FactionToggle key={selectedFaction} editMode={this.state.isEdit} selectedFaction={selectedFaction} setFaction={setFaction} />
                </div>
                <DeckBuilder
                    key={selectedFaction}
                    selectedFaction={selectedFaction} 
                    editMode={this.state.isEdit}
                    currentDeck={this.state.isEdit ? this.props.editCurrentDeck : this.props.currentDeck}
                    currentDeckName={this.state.isEdit ? this.props.editCurrentDeckName : this.props.currentDeckName}
                    currentDeckSource={this.state.isEdit ? this.props.editCurrentDeckSource : this.props.currentDeckSource}
                    currentDeckDescription={this.state.isEdit ? this.props.editCurrentDeckDescription : this.props.currentDeckDescription} 
                    setFaction={this.state.isEdit ? this.props.editFaction : this.props.setFaction}
                    changeName={this.state.isEdit ? this.props.editName : this.props.changeName}
                    changeSource={this.state.isEdit ? this.props.editSource : this.props.changeSource}
                    changeDescription={this.state.isEdit ? this.props.editDescription : this.props.changeDescription}
                    clearDeck={this.state.isEdit ? this.props.editClearDeck : this.props.clearDeck}
                    resetDeck={this.state.isEdit ? this.props.resetEditDeck : this.props.resetDeck}
                    resetSearchText={this.props.resetSearchText} />
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

        editSelectedFaction: state.deckUnderEdit.faction,
        editSelectedFactionDefaultSet: state.deckUnderEdit.factionDefaultSet,
        editCurrentDeck: state.deckUnderEdit.deck,
        editCurrentDeckName: state.deckUnderEdit.name,
        editCurrentDeckSource: state.deckUnderEdit.source,
        editCurrentDeckDescription: state.deckUnderEdit.desc,
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
        
        editFaction: (faction, defaultSet) => dispatch({ type: EDIT_FACTION, faction: faction, defaultSet: defaultSet }),
        editName: value => dispatch({ type: EDIT_DECK_NAME, name: value }),
        editSource: value => dispatch({ type: EDIT_DECK_SOURCE, source: value }),
        editDescription: value => dispatch({ type: EDIT_DECK_DESCRIPTION, desc: value }),
        editAddCard: card => dispatch({ type: EDIT_ADD_CARD, card: card }),
        editRemoveCard: card => dispatch({ type: EDIT_REMOVE_CARD, card: card }),
        editClearDeck: () => dispatch({ type: EDIT_CLEAR_ALL_CARDS_IN_DECK }),
        resetEditDeck: () => dispatch({ type: EDIT_RESET_DECK }),

        resetSearchText: () => dispatch({ type: CHANGE_SEARCH_TEXT, payload: '' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCreator);