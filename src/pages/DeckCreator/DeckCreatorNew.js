import React from 'react'
import {
    SET_FACTION,
    CHANGE_NAME,
    CHANGE_SOURCE,
    CLEAR_DECK,
    RESET_DECK,
    CHANGE_DESCRIPTION,
} from '../../reducers/deckUnderBuild'
import { CHANGE_SEARCH_TEXT } from '../../reducers/cardLibraryFilters'
import { connect } from 'react-redux'
import DeckCreatorBase from './DeckCreatorBase'

const DeckCreatorNew = props => <DeckCreatorBase {...props} editMode={false} transferMode={false} />

const mapStateToProps = state => {
    return {
        faction: state.deckUnderBuild.faction,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source,
        currentDeckDescription: state.deckUnderBuild.desc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: (faction, defaultSet) =>
            dispatch({
                type: SET_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
        changeName: value => dispatch({ type: CHANGE_NAME, name: value }),
        changeSource: value => dispatch({ type: CHANGE_SOURCE, source: value }),
        changeDescription: value =>
            dispatch({ type: CHANGE_DESCRIPTION, desc: value }),
        clearDeck: () => dispatch({ type: CLEAR_DECK }),
        resetDeck: () => dispatch({ type: RESET_DECK }),

        resetSearchText: () =>
            dispatch({ type: CHANGE_SEARCH_TEXT, payload: '' }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreatorNew)
