import React, { useMemo } from "react";
import ScoringOverview from "../../../../atoms/ScoringOverview";
import { CardsList } from "./CardsList";
import {
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import uuid4 from "uuid/v4";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";

function ObjectivesList({ selectedObjectives, format, isValid, issues }) {
    const totalGlory = useMemo(
        () =>
            selectedObjectives.reduce(
                (total, { glory }) => (total += glory),
                0
            ),
        [selectedObjectives]
    );

    const objectiveSummary = useMemo(
        () =>
            selectedObjectives.reduce(
                (acc, c) => {
                    acc[c.scoreType] += 1;
                    return acc;
                },
                { Surge: 0, End: 0, Third: 0 }
            ),
        [selectedObjectives]
    );

    return (
        <div className={`${isValid ? "bg-green-100" : "bg-red-100"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Objectives"
                amount={selectedObjectives.length}
            >
                <ScoringOverview
                    summary={objectiveSummary}
                    glory={totalGlory}
                />
            </CardListSectionHeader>
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
                cards={selectedObjectives}
            />
        </div>
    );
}

export default ObjectivesList;
