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
    amount: { objectives, gambits, upgrades },
}) {
    return (
        <div className="flex items-center flex-1">
            <DeckIcon
                className="w-16 h-16"
                faction={idPrefixToFaction[factionPrefix]}
            />

            <div className="space-y-2">
                <div>
                    <h1 className="text-xl">{name}</h1>
                    <h2 className="font-bold text-sm">
                        <span>{author}</span>
                        <span>{date}</span>
                        <span style={{ color: "darkorange" }}>{draft}</span>
                    </h2>
                </div>
                <div className="mt-1 mb-1">{<SetsList sets={sets} />}</div>
                <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                        <img
                            alt="objective-icon"
                            src={`/assets/icons/objective-icon.png`}
                            style={{ width: "1rem", height: "1rem" }}
                        />
                        {objectives}
                    </div>
                    <div className="flex items-center">
                        <img
                            alt="ploy-icon"
                            src={`/assets/icons/ploy-icon.png`}
                            style={{ width: "1rem", height: "1rem" }}
                        />
                        <img
                            alt="spell-icon"
                            src={`/assets/icons/spell-icon.png`}
                            style={{ width: "1rem", height: "1rem" }}
                        />
                        {gambits}
                    </div>
                    <div className="flex items-center">
                        <img
                            alt="upgrade-icon"
                            src={`/assets/icons/upgrade-icon.png`}
                            style={{ width: "1rem", height: "1rem" }}
                        />
                        {upgrades}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeckSummary;
