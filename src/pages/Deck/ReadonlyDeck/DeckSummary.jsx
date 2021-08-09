import React from "react";
import { idPrefixToFaction } from "../../../data/index";
import DeckIcon from "../../../atoms/DeckIcon";
import SetsList from "../../../atoms/SetsList";

function DeckSummary({
    factionPrefix,
    name,
    author,
    date,
    draft,
    sets,
    children,
}) {
    return (
        <div className="flex items-center flex-1">
            <DeckIcon
                className="w-16 h-16 mr-4"
                faction={idPrefixToFaction[factionPrefix]}
            />

            <div className="space-y-2 text-gray-900">
                <div>
                    <h1 className="text-xl">{name}</h1>
                    <h2 className="font-bold text-sm">
                        <span>{author}</span>
                        <span className="text-gray-500 text-xs">{date}</span>
                        <span style={{ color: "darkorange" }}>{draft}</span>
                    </h2>
                </div>
                <div className="mt-1 mb-1">{<SetsList sets={sets} />}</div>
                <div>
                    { children }
                </div>
            </div>
        </div>
    );
}

export default DeckSummary;
