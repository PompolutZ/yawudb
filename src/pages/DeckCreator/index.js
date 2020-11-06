import React from "react";
import { Switch, Route } from "react-router-dom";
import DeckCreatorNew from "./DeckCreatorNew";
import DeckCreatorEdit from "./DeckCreatorEdit";
import DeckCreatorTransfer from "./DeckCreatorTransfer";

function DeckCreator() {
    return (
        <>
            <Switch>
                <Route exact path="/deck/create" component={DeckCreatorNew} />
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
        </>
    );
}

export default DeckCreator;
