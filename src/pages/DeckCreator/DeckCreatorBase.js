import React from "react";
import DeckBuilder from "./DeckBuilder";
import { Helmet } from "react-helmet";

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

            <div className="flex-1"
            >
                <DeckBuilder
                    currentDeckName={props.deckName}
                    existingDeckId={props.existingDeckId}
                    createdTimestamp={props.createdTimestamp}
                    selectedFaction={faction}
                    setFaction={setFaction}
                    editMode={editMode}
                    transferMode={transferMode}
                    currentDeck={props.currentDeck}
                    currentDeckSource={props.currentDeckSource}
                    currentDeckDescription={props.currentDeckDescription}
                    changeName={props.changeName}
                    changeSource={props.changeSource}
                    changeDescription={props.changeDescription}
                    clearDeck={props.clearDeck}
                    resetDeck={props.resetDeck}
                    resetSearchText={props.resetSearchText}
                />
            </div>
        </React.Fragment>
    );
}

export default DeckCreatorBase;
