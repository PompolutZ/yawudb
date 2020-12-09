import React, { useContext } from "react";
import { useEffectReducer } from 'use-effect-reducer';
import { Switch, Route } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { deckBuilderReducer, INITIAL_STATE, saveDeckAsync } from "./reducer";

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

function DeckBuilderContextProvider({ children }) {
    const [state, dispatch] = useEffectReducer(deckBuilderReducer, INITIAL_STATE, {
        saveDeckAsync: saveDeckAsync((state, effect) => console.log('FROM EFFECT', state, effect))
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
