import React, { useContext } from "react";
import { useEffectReducer } from "use-effect-reducer";
import { deckBuilderReducer, INITIAL_STATE } from "./reducer";
import {
    addKeyToLocalStorage,
    removeKeyFromLocalStorage,
    initialiseStateFromLocalStorage,
    apiSaveDeckAsync,
    apiUpdateDeckAsync,
} from "./effects";
import { useSaveDeckFactory } from "../../hooks/useSaveDeckFactory";
import { useUpdateDeckFactory } from "../../hooks/useUpdateDeckFactory";
import DeckBuilder from "./DeckBuilder";
import { Helmet } from "react-helmet";
import { useStateCreator } from "./useStateCreator";

const DeckBuilderContext = React.createContext();
const DeckBuilderDispatchContext = React.createContext();

export function useDeckBuilderState() {
    const context = useContext(DeckBuilderContext);
    if (context === undefined) {
        throw Error(
            "useDeckBuilderState should be used within DeckBuilderContextProvider"
        );
    }

    return context;
}

export function useDeckBuilderDispatcher() {
    const context = useContext(DeckBuilderDispatchContext);
    if (context === undefined) {
        throw Error(
            "useDeckBuilderDispatcher should be used within DeckBuilderDispatchContextProvider"
        );
    }

    return context;
}

const initialiseState = (deck) => (exec) => {
    if (deck) {
        return deck;
    }

    exec({
        type: "initialiseStateFromLocalStorage",
        key: "wunderworlds_deck_in_progress",
    });

    return INITIAL_STATE;
};

function DeckBuilderContextProvider({ children, deck }) {
    const saveDeck = useSaveDeckFactory();
    const updateDeck = useUpdateDeckFactory();
    const [state, dispatch] = useEffectReducer(
        deckBuilderReducer,
        initialiseState(deck),
        {
            saveDeck: apiSaveDeckAsync(saveDeck),
            updateDeck: apiUpdateDeckAsync(updateDeck),
            addKeyToLocalStorage,
            removeKeyFromLocalStorage,
            initialiseStateFromLocalStorage,
        }
    );

    return (
        <DeckBuilderContext.Provider value={state}>
            <DeckBuilderDispatchContext.Provider value={dispatch}>
                {children}
            </DeckBuilderDispatchContext.Provider>
        </DeckBuilderContext.Provider>
    );
}

function DeckCreator() {
    const { action, state, previous } = useStateCreator();

    return (
        <DeckBuilderContextProvider deck={state}>
            <React.Fragment>
                <Helmet>
                    <title>
                        Warhammer Underworlds Gnarlwood Deck Builder
                    </title>
                    <link
                        rel="canonical"
                        href="https://wunderworlds.club/deck/create"
                    />
                </Helmet>

                <DeckBuilder
                    existingDeckId={previous?.id}
                    currentDeckName={previous?.name}
                    isPrivate={previous?.private}
                    action={action}
                />
            </React.Fragment>
        </DeckBuilderContextProvider>
    );
}

export default DeckCreator;
