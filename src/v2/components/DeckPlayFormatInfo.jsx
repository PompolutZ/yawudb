import React from "react";
import {
    CHAMPIONSHIP_FORMAT,
    NEMESIS_FORMAT,
    RELIC_FORMAT,
    RIVALS_FORMAT,
} from "../../data/wudb";

const formatDescriptions = {
    [CHAMPIONSHIP_FORMAT]: `In Championship format most cards from latest two seasons are valid, except few forsaken cards. Some cards are also restricted and you are limited to using at most 3 of those cards.`,
    [RELIC_FORMAT]: `In Relic format cards from all seasons are valid, excluding few forsaken cards.`,
    [NEMESIS_FORMAT]: `In Nemesis format your deck can contain faction cards and cards from another single universal rivals deck`,
    [RIVALS_FORMAT]: `In Rivals format you can play either your faction deck or single universal rivals deck`,
};

const DeckPlayFormatInfo = ({ format, ...rest }) => {
    const formatDescription = formatDescriptions[format];

    return formatDescription ? <p {...rest}>{formatDescription}</p> : null;
};

export { DeckPlayFormatInfo };
