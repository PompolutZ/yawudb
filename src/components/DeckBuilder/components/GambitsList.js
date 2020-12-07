import React, { useEffect, useState } from "react";
import { useDeckBuilderState } from "../../../pages/DeckCreator";
import { CardsList } from "./CardsList";
import SectionHeader from "./SectionHeader";
import uuid4 from "uuid";
import {
    CHAMPIONSHIP_FORMAT,
    validatePowerDeckForFormat,
} from "../../../data/wudb";

function GambitsList() {
    const { selectedGambits, selectedUpgrades, format } = useDeckBuilderState();
    const [isValid, setIsValid] = useState(false);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const [isValid, issues] = validatePowerDeckForFormat(
            selectedGambits,
            selectedUpgrades,
            format
        );

        setIsValid(isValid);
        setIssues(issues);
    }, [format, selectedGambits, selectedUpgrades]);

    return (
        <div
            className={`${isValid ? "bg-green-100" : "bg-red-100"}`}
        >
            <SectionHeader>
                <div>
                    <div>{selectedGambits.length} Gambits</div>
                </div>
                {!isValid && (
                    <ul>
                        {issues.map((issue) => (
                            <li className="text-accent3-700 text-sm"
                                key={uuid4()}
                            >
                                {issue}
                            </li>
                        ))}
                    </ul>
                )}
            </SectionHeader>
            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedGambits}
            />
        </div>
    );
}

export default GambitsList;
