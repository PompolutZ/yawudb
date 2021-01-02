import React, { useMemo } from "react";
import ScoringOverview from "../../../../atoms/ScoringOverview";
import { CardsList } from "./CardsList";
import {
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";

function ObjectivesList({ selectedObjectives, format, isValid }) {
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
        <div className={`${isValid ? "bg-green-100" : "bg-red-200"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Objectives"
                amount={selectedObjectives.length}
            >
                <ScoringOverview
                    summary={objectiveSummary}
                    glory={totalGlory}
                />
            </CardListSectionHeader>

            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedObjectives}
            />
        </div>
    );
}

export default ObjectivesList;
