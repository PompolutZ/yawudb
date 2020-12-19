import React, { useContext } from "react";
import { useEffectReducer } from 'use-effect-reducer';
import { Switch, Route, useLocation } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { deckBuilderReducer, INITIAL_STATE, saveDeckAsync } from "./reducer";
import { FirebaseContext } from "../../firebase";
import { getFactionByName } from "../../data/wudb";

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

const initialiseState = deck => _ => {
    if(deck) {
        return {
            ...INITIAL_STATE,
            faction: getFactionByName(deck.faction),
            selectedObjectives: deck.objectives,
            selectedGambits: deck.gambits,
            selectedUpgrades: deck.upgrades,
        }
    }

    return INITIAL_STATE;
}

function DeckBuilderContextProvider({ children }) {
    const firebase = useContext(FirebaseContext);
    const location = useLocation();
    const [state, dispatch] = useEffectReducer(
        deckBuilderReducer, 
        initialiseState(location.state.deck), 
        {
            saveDeckAsync: saveDeckAsync(async (state, effect) => {
                try {
                    const {
                        deckName,
                        author,
                        authorDisplayName,
                        deckId,
                        createdutc,
                        updatedutc,
                    } = effect.deckMeta;

                    const deck = [
                        ...state.selectedObjectives,
                        ...state.selectedGambits,
                        ...state.selectedUpgrades,
                    ];
                    
                    console.log(effect);
                    await firebase.realdb.ref(`/decks/${deckId}`).set({
                        author,
                        authorDisplayName,
                        createdutc,
                        updatedutc,
                        name: deckName,
                        faction: state.faction.name,
                        deck: deck.map(c => c.id).join(","),
                        sets: Array.from(new Set(deck.map(c => c.setId))).join(",")
                    });
                } catch (e) {
                    console.error(e);
                }
            })
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
