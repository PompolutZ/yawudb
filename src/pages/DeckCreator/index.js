import React, { useContext } from "react";
import { useEffectReducer } from 'use-effect-reducer';
import { Switch, Route, useLocation } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { deckBuilderReducer, INITIAL_STATE } from "./reducer";
import { getFactionByName } from "../../data/wudb";
import { addKeyToLocalStorage, removeKeyFromLocalStorage, initialiseStateFromLocalStorage, apiSaveDeckAsync, apiUpdateDeckAsync } from "./effects";
import { usePostUserDeck, useUpdateUserDeck } from "../../hooks/wunderworldsAPIHooks";
import useAuthUser from "../../hooks/useAuthUser";
import useDexie from "../../hooks/useDexie";

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

function useSaveDeckFactory() {
    const user = useAuthUser();
    const db = useDexie('wudb');
    const [, saveUserDeck] = usePostUserDeck();

    if (user !== null) {
        return saveUserDeck;
    } else {
        return function saveLocally(payload) {
            const now = new Date().getTime();
            return db.anonDecks.add({
                ...payload.data,
                createdutc: now,
                updatedutc: now,
            });
        }
    }
}

function useUpdateDeckFactory() {
    const user = useAuthUser();
    const db = useDexie('wudb');
    const [, update] = useUpdateUserDeck(); 

    if (user !== null) {
        return update;
    } else {
        return function saveLocally(payload) {
            const now = new Date().getTime();
            
            return db.anonDecks.where('deckId').equals(payload.data.deckId).modify({
                ...payload.data,
                updatedutc: now,
            });
        }
    }
}

function DeckBuilderContextProvider({ children }) {
    const location = useLocation();
    const saveDeck = useSaveDeckFactory();
    const updateDeck = useUpdateDeckFactory();
    const [state, dispatch] = useEffectReducer(
        deckBuilderReducer, 
        initialiseState(location.state && location.state.deck), 
        {
            saveDeck: apiSaveDeckAsync(saveDeck),
            updateDeck: apiUpdateDeckAsync(updateDeck),
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
