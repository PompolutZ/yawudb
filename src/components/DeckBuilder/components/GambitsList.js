import React, { useEffect, useState } from "react";
import { useDeckBuilderState } from "../../../pages/DeckCreator";
import { CardsList } from "./CardsList";
import uuid4 from "uuid";
import {
    CHAMPIONSHIP_FORMAT,
    validatePowerDeckForFormat,
} from "../../../data/wudb";
import CardListSectionHeader from "../../../v2/components/CardListSectionHeader";

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
        <div className={`${isValid ? "bg-green-100" : "bg-red-100"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Gambits"
                amount={selectedGambits.length}
            ></CardListSectionHeader>
            {!isValid && (
                <ul>
                    {issues.map((issue) => (
                        <li className="text-accent3-700 text-sm" key={uuid4()}>
                            {issue}
                        </li>
                    ))}
                </ul>
            )}

            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedGambits}
            />
        </div>
    );
}

export default GambitsList;
