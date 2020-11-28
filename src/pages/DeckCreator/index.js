import React, { useContext, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";
import { CHAMPIONSHIP_FORMAT, getAllSetsValidForFormat, getFactionByName } from "../../data/wudb";

const INITIAL_STATE = {
    faction: getFactionByName("morgoks-krushas"),
    sets: getAllSetsValidForFormat(CHAMPIONSHIP_FORMAT),
    hideDuplicates: true,
    format: CHAMPIONSHIP_FORMAT,
    selectedObjectives: [],
    selectedGambits: [],
    selectedUpgrades: [],
    visibleCardTypes: [],
};

const DeckBuilderContext = React.createContext();
const DeckBuilderDispatchContext = React.createContext();

const deckBuilderReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

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
    const [state, dispatch] = useReducer(deckBuilderReducer, INITIAL_STATE);
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
