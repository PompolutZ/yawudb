import { sets, cards, factions } from "./db.js";

export const totalCardsPerWave = {
    1: 437,
    2: 60,
    3: 557,
    4: 60,
    5: 124,
    6: 438,
    7: 32,
    8: 40,
    9: 500,
    10: 64,
    11: 60,
    12: 60,
};

export const latestSeasonStartNumber = 9000;

function getCardNumberFromId(cardId) {
    if (typeof cardId == "string") {
        return +cardId.slice(-3);
    }

    return cardId % 1000;
}

function getCardWaveFromId(cardId) {
    if (typeof cardId == "string") {
        return cardId.slice(0, 2);
    }

    return `${Math.floor(cardId / 1000)}`.padStart(2, "0");
}

function getFactionByName(factionName) {
    return Object.values(factions).find((f) => f.name == factionName);
}

function getFactionByAbbr(factionAbbr) {
    return Object.values(factions).find((f) => f.abbr == factionAbbr);
}

function getFactionById(factionId) {
    return Object.values(factions).find(f => f.id === factionId);
}

const idToSetKey = {};
function getSetNameById(setId) {
    if (idToSetKey[setId]) {
        return sets[idToSetKey[setId]].name;
    }

    const [key, value] = Object.entries(sets).find(
        ([, value]) => value.id == setId
    );
    idToSetKey[setId] = key;
    return value.name;
}

function getSetById(setId) {
    if (idToSetKey[setId]) {
        return sets[idToSetKey[setId]];
    }

    const [key, value] = Object.entries(sets).find(
        ([, value]) => value.id == setId
    );
    idToSetKey[setId] = key;
    return value;
}

const cardTypes = ["Objective", "Ploy", "Upgrade", "Spell"];

// This is very stupid but best idea at 22:17 for backward compatibility
function getCardById(cardId) {
    return cards[`${Number(cardId)}`];
}

function checkCardIsObjective({ type }) {
    return typeof type == "string" ? cardTypes.indexOf(type) == 0 : type === 0;
}

function checkCardIsPloy({ type }) {
    return typeof type == "string"
        ? cardTypes.indexOf(type) == 1 || cardTypes.indexOf(type) == 3
        : type === 1 || type === 3;
}

function checkCardIsUpgrade({ type }) {
    return typeof type == "string" ? cardTypes.indexOf(type) == 2 : type === 2;
}

const SURGE_SCORE_TYPE = "Surge";
const END_SCORE_TYPE = "End";
const THIRD_END_SCORE_TYPE = "Third";
const objectiveScoreTypes = [
    SURGE_SCORE_TYPE,
    END_SCORE_TYPE,
    THIRD_END_SCORE_TYPE,
];

function compareObjectivesByScoreType(scoreTypeOne, scoreTypeTwo) {
    return (
        objectiveScoreTypes.indexOf(scoreTypeOne) -
        objectiveScoreTypes.indexOf(scoreTypeTwo)
    );
}

export const CHAMPIONSHIP_FORMAT = "championship";
export const OPEN_FORMAT = "open";
export const RELIC_FORMAT = "relic";
export const VANGUARD_FORMAT = "vanguard";

function getAllSetsValidForFormat(format) {
    switch (format) {
        case VANGUARD_FORMAT: 
            return Object.values(sets).filter(set => set.id > 29)
        case CHAMPIONSHIP_FORMAT:
            return Object.values(sets).filter((set) => set.id > 20);
        default:
            return Object.values(sets);
    }
}

function validateCardForPlayFormat(card, format) {
    let c = undefined;
    if (typeof card === "string") {
        c = cards[Number(card)];
    } else if (typeof card === "number") {
        c = cards[card];
    } else {
        c = card;
    }

    const [championship, relic] = c.status.split("_");
    switch (format) {
        case CHAMPIONSHIP_FORMAT:
            return [
                // V-- means card is valid, is Forsaken, is Restricted
                championship[0] === "V",
                championship[1] !== "-",
                championship[2] !== "-",
            ];
        case RELIC_FORMAT:
            return [
                // V-- means card is valid, is Forsaken. Relic has no restricted cards
                relic[0] === "V",
                relic[1] !== "-",
                undefined,
            ];
        case OPEN_FORMAT:
            return [
                // V-- means card is valid, Open format has no cards restrictions
                relic[0] === "V",
                undefined,
                undefined,
            ];
        case VANGUARD_FORMAT: 
            return [
                Number(c.id) > latestSeasonStartNumber,
                false,
                false
            ]    
    }
}

function validateDeckForPlayFormat({ objectives, gambits, upgrades }, format) {
    const deck = [
        ...objectives,
        ...gambits,
        ...upgrades,
    ];
    const MAX_RESTRICTED_CARDS = 3;
    const issues = [];
    let isValid = true;

    if (format === OPEN_FORMAT) return [isValid, issues];

    if (format == VANGUARD_FORMAT) {
        const onlyLatestSeason = deck.filter(c => c.factionId < 2).reduce((lastSeasonOnly, c) => lastSeasonOnly && (Number(c.id) > latestSeasonStartNumber), true);

        isValid = onlyLatestSeason;
        if(!onlyLatestSeason) {
            issues.push(`Vanguard decks could include cards from last season only.`);
        }
    }

    if(format == CHAMPIONSHIP_FORMAT) {
        const onlyLastTwoSeasons = deck.filter(c => c.factionId < 2).reduce((lastTwoSeasons, c) => lastTwoSeasons && c.id > 6000, true)
        isValid = onlyLastTwoSeasons;
        
        if(!onlyLastTwoSeasons) {
            issues.push(`Championship decks cannot include rotated out cards.`);
        }
    }

    if (objectives.length != 12) {
        isValid = false;
        issues.push("Deck must have 12 objective cards");
    }

    if (
        objectives.filter((card) => card.scoreType == SURGE_SCORE_TYPE).length >
        6
    ) {
        isValid = false;
        issues.push("Deck cannot have more than 6 Surge cards");
    }

    if (gambits.length + upgrades.length < 20) {
        isValid = false;
        issues.push(
            "Deck must have at least 20 power cards (gambits and upgrades)"
        );
    }

    if (gambits.length > upgrades.length) {
        isValid = false;
        issues.push("Deck cannot have more gambits than upgrade cards.");
    }

    var totalInvalidCards = deck
        .map((card) => validateCardForPlayFormat(card, format))
        .reduce(
            (total, [, isForsaken, isRestricted]) => {
                return {
                    // we can just sum by using coersion here, but mathematically that doesn't make sense
                    forsaken: isForsaken ? total.forsaken + 1 : total.forsaken,
                    restricted: isRestricted
                        ? total.restricted + 1
                        : total.restricted,
                };
            },
            { forsaken: 0, restricted: 0 }
        );

    if (totalInvalidCards.forsaken > 0) {
        isValid = false;
        issues.push(
            `Deck built for ${format} cannot include forsaken cards, but has ${totalInvalidCards.forsaken}`
        );
    }

    if (totalInvalidCards.restricted > MAX_RESTRICTED_CARDS) {
        isValid = false;
        issues.push(
            `Deck built for ${format} can include at most ${MAX_RESTRICTED_CARDS} restricted cards, but has ${totalInvalidCards.restricted}`
        );
    }

    return [isValid, issues];
}

function validateObjectivesListForPlayFormat(objectives, format) {
    const issues = [];
    let isValid = true;

    // const [
    //     ,
    //     isForsaken,
    //     isRestricted,
    // ] = validateCardForPlayFormat(c.id, format);

    if (format !== OPEN_FORMAT) {
        if (objectives.length != 12) {
            isValid = false;
            issues.push("Deck must have 12 objective cards");
        }

        if (
            objectives.filter((card) => card.scoreType == SURGE_SCORE_TYPE)
                .length > 6
        ) {
            isValid = false;
            issues.push("Deck cannot have more than 6 Surge cards");
        }
    }

    return [isValid, issues];
}

function validatePowerDeckForFormat(gambits, upgrades, format) {
    const issues = [];
    let isValid = true;

    if (format !== OPEN_FORMAT) {
        if (gambits.length + upgrades.length < 20) {
            isValid = false;
            issues.push(
                "Deck must have at least 20 power cards (gambits and upgrades)"
            );
        }

        if (gambits.length > upgrades.length) {
            isValid = false;
            issues.push("Deck cannot have more gambits than upgrade cards.");
        }
    }

    return [isValid, issues];
}

export {
    getFactionByName,
    getFactionByAbbr,
    getFactionById,
    getCardNumberFromId,
    getCardWaveFromId,
    getSetNameById,
    getSetById,
    cardTypes,
    getCardById,
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    validateCardForPlayFormat,
    validateDeckForPlayFormat,
    validateObjectivesListForPlayFormat,
    validatePowerDeckForFormat,
    compareObjectivesByScoreType,
    getAllSetsValidForFormat,
    sets as wusets,
    factions as wufactions,
    cards as wucards,
};
