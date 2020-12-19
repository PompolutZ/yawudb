import React from "react";
import DeckCreatorBase from "./DeckCreatorBase";

const DeckCreatorEdit = (props) => {
    return <DeckCreatorBase {...props} editMode transferMode={false} />;
};

export default DeckCreatorEdit;
