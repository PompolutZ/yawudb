import React from "react";
import { useLocation, useParams } from "react-router-dom";
import DeckCreatorBase from "./DeckCreatorBase";

const DeckCreatorEdit = (props) => {
    const { id } = useParams();
    const {
        state: { deck: { createdutc, name } },
    } = useLocation();

    return (
        <DeckCreatorBase
            {...props}
            existingDeckId={id}
            deckName={name}
            createdTimestamp={createdutc}
        />
    );
};

export default DeckCreatorEdit;
