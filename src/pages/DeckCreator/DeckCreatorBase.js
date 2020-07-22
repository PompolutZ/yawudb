import React from 'react'
import FactionToggle from '../../components/FactionToggle'
import DeckBuilder from '../../components/DeckBuilder'
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
import { Helmet } from 'react-helmet';

function DeckCreatorBase(props) {
    const { faction, editMode, transferMode } = props;
    const setFaction = props.setFaction;

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    Warhammer Underworlds: Nightvault (Shadespire) Deck Builder
                </title>
                <link rel="canonical" href="https://yawudb.com/deck/create" />
            </Helmet>

            <div style={{ flexGrow: 1, display: 'flex', flexFlow: 'column nowrap', height: '100%'}}>
                <div>
                    <FactionToggle
                        key={faction}
                        editMode={editMode}
                        selectedFaction={faction}
                        setFaction={setFaction}
                    />
                </div>

                <DeckBuilder
                    key={faction}
                    selectedFaction={faction}
                    editMode={editMode}
                    transferMode={transferMode}
                    currentDeck={props.currentDeck}
                    currentDeckName={props.currentDeckName}
                    currentDeckSource={props.currentDeckSource}
                    currentDeckDescription={props.currentDeckDescription}
                    setFaction={setFaction}
                    changeName={props.changeName}
                    changeSource={props.changeSource}
                    changeDescription={props.changeDescription}
                    clearDeck={props.clearDeck}
                    resetDeck={props.resetDeck}
                    resetSearchText={props.resetSearchText}
                />
            </div>
        </React.Fragment>
    )
}

export default DeckCreatorBase;
