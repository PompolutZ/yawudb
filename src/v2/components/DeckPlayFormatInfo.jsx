import React from "react";
import {
    CHAMPIONSHIP_FORMAT,
    RELIC_FORMAT,
    VANGUARD_FORMAT,
} from "../../data/wudb";

const formatDescriptions = {
    [VANGUARD_FORMAT]: `Only cards from the latest season can be used.`,
    [CHAMPIONSHIP_FORMAT]: `Library will be filtered to fulfill competitive play requirements: forsaken and rotated out cards will be excluded.`,
    [RELIC_FORMAT]: `Library will be filtered to exlude forsaken cards.`,
};

const DeckPlayFormatInfo = ({ format, ...rest }) => {
    const formatDescription = formatDescriptions[format];

    return formatDescription ? <p {...rest}>{formatDescription}</p> : null;
};

export { DeckPlayFormatInfo };
