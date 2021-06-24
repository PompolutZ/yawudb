import React, { useContext, useEffect } from "react";
import { useEffectReducer } from 'use-effect-reducer';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { deckBuilderReducer, INITIAL_STATE } from "./reducer";
import { FirebaseContext } from "../../firebase";
import { getFactionByName } from "../../data/wudb";
import { firebaseSaveDeckAsync, addKeyToLocalStorage, removeKeyFromLocalStorage, initialiseStateFromLocalStorage, apiSaveDeckAsync } from "./effects";
import { usePostUserDeck } from "../../hooks/wunderworldsAPIHooks";

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
    const location = useLocation();
    const [{ data, error, loading}, saveUserDeck] = usePostUserDeck();
    const [state, dispatch] = useEffectReducer(
        deckBuilderReducer, 
        initialiseState(location.state && location.state.deck), 
        {
            saveDeck: apiSaveDeckAsync(saveUserDeck),
            addKeyToLocalStorage,
            removeKeyFromLocalStorage,
            initialiseStateFromLocalStorage,
    });

    useEffect(() => {
        console.log(data, error, loading);
    }, [data, error, loading])

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
        // THIS INNER ROUTING PART NEEDS TO BE REDESIGNED
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
    );
}

export default DeckCreator;
