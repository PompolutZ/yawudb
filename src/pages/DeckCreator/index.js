import React, { useContext } from "react";
import { useEffectReducer } from 'use-effect-reducer';
import { Switch, Route, useLocation } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { deckBuilderReducer, INITIAL_STATE } from "./reducer";
import { FirebaseContext } from "../../firebase";
import { getFactionByName } from "../../data/wudb";
import { firebaseSaveDeckAsync, addKeyToLocalStorage, removeKeyFromLocalStorage, initialiseStateFromLocalStorage } from "./effects";

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

const initialiseState = deck => exec => {
    if(deck) {
        return {
            ...INITIAL_STATE,
            faction: getFactionByName(deck.faction),
            selectedObjectives: deck.objectives,
            selectedGambits: deck.gambits,
            selectedUpgrades: deck.upgrades,
        }
    }

    exec({ type: 'initialiseStateFromLocalStorage', key: 'wunderworlds_deck_in_progress' })

    return INITIAL_STATE;
}

function DeckBuilderContextProvider({ children }) {
    const firebase = useContext(FirebaseContext);
    const location = useLocation();
    const [state, dispatch] = useEffectReducer(
        deckBuilderReducer, 
        initialiseState(location.state && location.state.deck), 
        {
            saveDeck: firebaseSaveDeckAsync(firebase),
            addKeyToLocalStorage,
            removeKeyFromLocalStorage,
            initialiseStateFromLocalStorage,
    });
    return (
        <DeckBuilderContext.Provider value={state}>
            <DeckBuilderDispatchContext.Provider value={dispatch}>
                {children}
            </DeckBuilderDispatchContext.Provider>
        </DeckBuilderContext.Provider>
    );
}

function DeckCreator() {
    return (
        <>
            <DeckBuilderContextProvider>
                <Switch>
                    <Route
                        exact
                        path="/deck/create"
                        component={DeckCreatorNew}
                    />
                    <Route
                        exact
                        path="/deck/edit/:id"
                        component={DeckCreatorEdit}
                    />
                    <Route
                        exact
                        path="/deck/transfer/:data"
                        component={DeckCreatorTransfer}
                    />
                </Switch>
            </DeckBuilderContextProvider>
        </>
    );
}

export default DeckCreator;
