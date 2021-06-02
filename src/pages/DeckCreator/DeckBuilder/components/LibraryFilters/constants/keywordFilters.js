import React from 'react';
import { ReactComponent as PrimacyIcon } from "../../../../../../svgs/Primacy.svg";
import { ReactComponent as HunterIcon } from "../../../../../../svgs/Hunter.svg";
import { ReactComponent as QuarryIcon } from "../../../../../../svgs/Quarry.svg";

export const KEYWORD_FILTERS = [
    {
        label: "Primacy",
        icon: <PrimacyIcon className="w-6 h-6 mx-auto fill-current" />,
        filter: card => card.rule.includes('Primacy'),
    },
    {
        label: "Hunter",
        icon: <HunterIcon className="w-6 h-6 mx-auto fill-current" />,
        filter: card => card.rule.includes('Hunter'),
    },
    {
        label: "Quarry",
        icon: <QuarryIcon className="w-6 h-6 mx-auto fill-current" />,
        filter: card => card.rule.includes('Quarry'),
    },
];
