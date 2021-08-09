import React from 'react';
import ObjectiveScoreTypeIcon from "../../../../../../components/ObjectiveScoreTypeIcon";
import { ReactComponent as DualIcon } from "../../../../../../svgs/Dual.svg";
import { ReactComponent as HybridIcon } from "../../../../../../svgs/Hybrid.svg";

export const OBJECTIVE_SCORE_TYPE_FILTERS = [
    {
        label: "Surge",
        icon: (
            <ObjectiveScoreTypeIcon
                type="Surge"
                style={{ width: "1rem", height: "1rem" }}
            />
        ),
        filter: (card) => card.scoreType === "Surge" || card.scoreType === 0,
    },
    {
        label: "End phase",
        icon: (
            <ObjectiveScoreTypeIcon
                type="End"
                style={{ width: "1rem", height: "1rem" }}
            />
        ),
        filter: (card) => card.scoreType === "End" || card.scoreType === 1,
    },
    {
        label: "3rd end phase",
        icon: (
            <ObjectiveScoreTypeIcon
                type="Third"
                style={{ width: "1rem", height: "1rem" }}
            />
        ),
        filter: (card) => card.scoreType === "Third" || card.scoreType === 2,
    },
    {
        label: "Dual",
        icon: <DualIcon className="w-6 h-6 mx-auto fill-current" />,
        filter: (card) => card.rule.includes("Dual"),
    },
    {
        label: "Hybrid",
        icon: (
            <HybridIcon className="w-6 h-6 mx-auto fill-current" />
        ),
        filter: (card) => card.rule.includes("Hybrid"),
    },
];
