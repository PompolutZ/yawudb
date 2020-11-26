import React from "react";
import DeckBuilder from "../../components/DeckBuilder";
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

            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexFlow: "column nowrap",
                    height: "100%",
                    background: "#f8f8f8",
                }}
            >
                <DeckBuilder
                    key={faction}
                    selectedFaction={faction}
                    setFaction={setFaction}
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
    );
}

export default DeckCreatorBase;
