import React, { Component } from 'react'
import FactionToggle from '../../components/FactionToggle'
import DeckBuilder from '../../components/DeckBuilder'
import {
    SET_FACTION,
    CHANGE_NAME,
    CHANGE_SOURCE,
    ADD_CARD,
    REMOVE_CARD,
    CLEAR_DECK,
    RESET_DECK,
    CHANGE_DESCRIPTION,
} from '../../reducers/deckUnderBuild'
import {
    EDIT_RESET_DECK,
    EDIT_FACTION,
    EDIT_DECK_NAME,
    EDIT_DECK_DESCRIPTION,
    EDIT_ADD_CARD,
    EDIT_REMOVE_CARD,
    EDIT_CLEAR_ALL_CARDS_IN_DECK,
    EDIT_DECK_SOURCE,
} from '../../reducers/deckUnderEdit'
import { CHANGE_SEARCH_TEXT } from '../../reducers/cardLibraryFilters'
import { connect } from 'react-redux'
import FactionToggleDesktopBase from '../../atoms/FactionToggleDesktop'
import { Helmet } from 'react-helmet'
import {
    cardsIdToFactionIndex,
    factionIndexesWithDefaultSet,
} from '../../data/atoms/factions'
import { Switch, Route, Link } from 'react-router-dom'
import DeckCreatorBase from './DeckCreatorBase'

const DeckCreatorEdit = props => <DeckCreatorBase {...props} editMode transferMode={false} />

const mapStateToProps = state => {
    return {
        faction: state.deckUnderEdit.faction,
        selectedFactionDefaultSet: state.deckUnderEdit.factionDefaultSet,
        currentDeck: state.deckUnderEdit.deck,
        currentDeckName: state.deckUnderEdit.name,
        currentDeckSource: state.deckUnderEdit.source,
        currentDeckDescription: state.deckUnderEdit.desc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: (faction, defaultSet) =>
            dispatch({
                type: EDIT_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
        changeName: value => dispatch({ type: EDIT_DECK_NAME, name: value }),
        changeSource: value =>
            dispatch({ type: EDIT_DECK_SOURCE, source: value }),
        changeDescription: value =>
            dispatch({ type: EDIT_DECK_DESCRIPTION, desc: value }),
        clearDeck: () => dispatch({ type: EDIT_CLEAR_ALL_CARDS_IN_DECK }),
        resetDeck: () => dispatch({ type: EDIT_RESET_DECK }),

        resetSearchText: () =>
            dispatch({ type: CHANGE_SEARCH_TEXT, payload: '' }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreatorEdit)
