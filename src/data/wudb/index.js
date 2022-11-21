import { sets, cards, factions } from "./db.js";
import { sortByIdAsc } from "../../utils/sort";

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
    13: 308,
    14: 308,
    15: 32,
    16: 32,
    17: 32,
    18: 32,
};

export const latestSeasonStartNumber = 15000;

export const sortedFactions = Object.values(factions).sort(sortByIdAsc);

export const factionMembers = {
    "garreks-reavers": ["Garrek", "Saek", "Karsus", "Targor", "Arnulf"],
    "steelhearts-champions": ["Steelheart", "Obryn", "Angharad"],
    "sepulchral-guard": [
        "Warden",
        "Champion",
        "Prince",
        "Harvester",
        "Petitioner",
    ],
    "ironskulls-boyz": ["Gurzag", "Bonekutta", "Hakka", "Basha"],
    "the-chosen-axes": ["Grimnir", "Tefk", "Vol", "Maegrim"],
    "spiteclaws-swarm": [
        "Skritch",
        "Krrk",
        "Lurking",
        "Festering",
        "Hungering",
    ],
    "magores-fiends": ["Magore", "Riptooth", "Zharkus", "Ghartok"],
    "the-farstriders": ["Sanson", "Almeric", "Elias"],

    // NIGHTVAULT

    "stormsires-cursebreakers": ["Stormsire", "Ammis", "Rastus"],
    "thorns-of-the-briar-queen": [
        "Briar Queen",
        "Varclav",
        "The Ever-hanged",
        "Chainrasp",
        "Chainrasp",
        "Chainrasp",
        "Chainrasp",
    ],
    "the-eyes-of-the-nine": [
        "Vortemis",
        `K'charik`,
        `Narvia`,
        "Turosh",
        "Blue Horror",
    ],
    "zarbags-gitz": [
        "Zarbag",
        "Sourtongue",
        "Drizgit",
        "Bonekrakka",
        "Gobbaluk",
        "Prog",
        "Stikkit",
        "Redkap",
        "Dibbz",
    ],
    "godsworn-hunt": [
        "Theddra",
        "Grundann",
        "Jagathra",
        "Shond",
        "Ollo",
        "Grawl",
    ],
    "mollogs-mob": ["Mollog", "Bat Squig", "Stalagsquig", "Spiteshroom"],
    "thundriks-profiteers": [
        "Bjorgen",
        "Dead-Eye Lund",
        "Enrik",
        "Khazgan",
        "Garodd",
    ],
    "yltharis-guardians": ["Ylthari", "Ahnslaine", "Gallanghann", "Skhathael"],

    // DREADFANE

    "ironsouls-condemners": ["Ironsoul", "Blightbane", "Tavian"],
    "lady-harrows-mournflight": [
        "Lady Harrow",
        "The Anguished One",
        "The Maiden",
        "Widow Caitha",
    ],

    // BEASTGRAVE

    "grashraks-despoilers": [
        "Grashrak",
        "Draknar",
        "Murgroth",
        "Korsh",
        "Gnarl",
        "Ushkor",
    ],
    "skaeths-wild-hunt": [
        "Skaeths",
        "Lighaen",
        "Karthaen",
        "Kurnoth4",
        "Kurnoth5",
    ],
    "the-grymwatch": ["Duke Crakmarrow", "", "", "", "", ""],
    "rippas-snarlfangs": ["Rippa", "Stabbit", "Mean-Eye"],
    "hrothgorns-mantrappers": [
        "Hrothgorn",
        "Thrafnir",
        "Bushwakka",
        "Quiv",
        "Luggit and Thwak",
    ],
    "the-wurmspat": ["Fecula", "Ghulgogh", "Sepsimus"],
    "morgwaeths-blade-coven": [
        "Morgwaeth",
        "Kyrae",
        "Khamyss",
        "Kyrssa",
        "Lethyr",
    ],

    "morgoks-krushas": ["Morgok", "’Ardskull", "Thugg"],

    // DIRECHASM
    "myaris-purifiers": ["Myari", "Bahannar", "Ailenn", "Senaela"],
    "dread-pageant": ["Vasillac", "Glissete", "Hadzu", "Slakeslash"],
    "khagras-ravagers": ["Khagra", "Cragan", "Razek", "Zarshia"],
    "the-starblood-stalkers": [
        "Kixi-Taka",
        "Klaq-Trok",
        "Otapatl",
        "Tok",
        "Xepic",
        "Huachi",
    ],
    "the-crimson-court": ["", "", "", ""],
    "storm-of-celestus": ["", "", "", ""],
    "drepurs-wraithcreepers": ["", "", "", ""],
    "hedkrakkas-madmob": ["Hedkrakka", "Wollop", "Toofdagga", "Dakko"],
    "kainans-reapers": ["", "", "", "", "", ""],
    "elathains-soulreapers": ["", "", "", "", ""],

    "xandires-truthseekers": ["", "", "", ""],
    "da-kunnin-krew": ["", "", "", "", ""],
    "blackpowders-buccaneers": ["Gorlok", "Kagey", "Mange", "Peggs", "Shreek"],
    "the-exiled-dead": [
        "Deintalos",
        "Marcov",
        "Regulus",
        "Coyl",
        "Bault",
        "Vlash",
        "Ione",
    ],
    "skittershanks-clawpack": [
        "Skittershanks",
        "Snyp",
        "Kreep",
        "Krowcht",
        "Skulck",
    ],
    "the-shadeborn": ["Slythael", "Drusylla", "Sylarc", "Valyssa"],
    "hexbanes-hunters": [
        "Haskel",
        "Aemos",
        "Quite Pock",
        "Brydget",
        "Grotbiter",
        "Ratspike",
    ],
    "gorechosen-of-dromm": ["Dromm", "Gorehulk", "Herax"],
    "gnarlspirit-pack": ["1", "2", "3", "4"],
    "sons-of-velmorn": ["1", "2", "3", "4", "5"],
};

export const grouppedFactions = () => {
    return [
        {
            title: "Universal (Any warband)",
            factions: [
                factions["Universal"],
                factions["Order"],
                factions["Chaos"],
                factions["Death"],
                factions["Destruction"],
            ],
        },
        {
            title: "Gnarlwood",
            factions: sortedFactions.filter(
                (f) => f.id >= factions["Gnarlspirit Pack"].id
            ),
        },
        {
            title: "Nethermaze",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Skittershank's Clawpack"].id &&
                    f.id <= factions["Gorechosen of Dromm"].id
            ),
        },
        {
            title: "Harrowdeep",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Xandire's Truthseekers"].id &&
                    f.id <= factions["The Exiled Dead"].id
            ),
        },
        {
            title: "Direchasm",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Myari's Purifiers"].id &&
                    f.id <= factions["Elathain's Soulraid"].id
            ),
        },
        {
            title: "Beastgrave",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Grashrak's Despoilers"].id &&
                    f.id <= factions["Morgok's Krushas"].id
            ),
        },
        {
            title: "Nightvault",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Stormsire's Cursebreakers"].id &&
                    f.id <= factions["Ylthari's Guardians"].id
            ),
        },
        {
            title: "Shadespire",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Garrek's Reavers"].id &&
                    f.id <= factions["The Farstriders"].id
            ),
        },
        {
            title: "Starting set",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Storm of Celestus"].id &&
                    f.id <= factions["Drepur's Wraithcreepers"].id
            ),
        },
        {
            title: "Dreadfane",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= factions["Ironsoul's Condemners"].id &&
                    f.id <= factions["Lady Harrow's Mournflight"].id
            ),
        },
    ];
};

const warbandsWithPlot = [
    factions["Khagra's Ravagers"].id,
    factions["Hedkrakka's Madmob"].id,
];

const rivalDecksWithPlot = [
    sets["Daring Delvers Rivals Deck"].id,
    sets["Tooth and Claw Rivals Deck"].id,
];

const warbandHasPlot = (warbandId) => warbandsWithPlot.includes(warbandId);
const setHasPlot = (setId) => rivalDecksWithPlot.includes(setId);

const plots = {
    Desecration: {
        keyword: "Desecration",
        connection: "Warband",
        asset: "Desecration",
        id: factions["Khagra's Ravagers"].id,
        name: factions["Khagra's Ravagers"].name,
    },
    Primacy: {
        keyword: "Primacy",
        connection: "Warband",
        asset: "Primacy",
        id: factions["Hedkrakka's Madmob"].id,
        name: factions["Hedkrakka's Madmob"].name,
    },
    Explorer: {
        keyword: "Explorer",
        connection: "Set",
        asset: "17000",
        id: sets["Daring Delvers Rivals Deck"].id,
        name: sets["Daring Delvers Rivals Deck"].name,
    },
    Savage: {
        keyword: "Savage",
        connection: "Set",
        asset: "18000",
        id: sets["Tooth and Claw Rivals Deck"].id,
        name: sets["Tooth and Claw Rivals Deck"].name,
    },
};

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
    console.log(factionId);
    return Object.values(factions).find((f) => f.id === factionId);
}

const nonWarbandIds = [
    factions.Universal.id,
    factions.Order.id,
    factions.Chaos.id,
    factions.Death.id,
    factions.Destruction.id,
];

function checkNonWarbandSpecificCard(card) {
    return nonWarbandIds.includes(card.factionId);
}

function checkWarbandSpecificCard(card) {
    return !checkNonWarbandSpecificCard(card);
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
export const NEMESIS_FORMAT = "nemesis";
export const RIVALS_FORMAT = "rivals";

export const ACTIVE_FORMATS = [
    RIVALS_FORMAT,
    NEMESIS_FORMAT,
    CHAMPIONSHIP_FORMAT,
    RELIC_FORMAT,
];

const nemesis_valid_sets = [
    sets["Illusory Might Universal Deck"].id,
    sets["Deadly Depths Rivals Deck"].id,
    sets["Tooth and Claw Rivals Deck"].id,
    sets["Daring Delvers Rivals Deck"].id,
];

function getAllSetsValidForFormat(format) {
    switch (format) {
        case CHAMPIONSHIP_FORMAT:
            return Object.values(sets).filter(
                (set) => set.id > 37 && set.id !== 40 && set.id !== 39
            );
        case NEMESIS_FORMAT:
            return Object.values(sets).filter((set) =>
                nemesis_valid_sets.includes(set.id)
            );
        default:
            return Object.values(sets);
    }
}

function validateCardForPlayFormat(card, format = CHAMPIONSHIP_FORMAT) {
    if (!format) return [];
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
        case NEMESIS_FORMAT:
            return [
                // V-- means card is valid, Open format has no cards restrictions
                relic[0] === "V",
                undefined,
                undefined,
            ];
    }
}

function validateDeckForPlayFormat({ objectives, gambits, upgrades }, format) {
    const deck = [...objectives, ...gambits, ...upgrades];
    const MAX_RESTRICTED_CARDS = 3;
    const MIN_OBJECTIVE_COUNT = 12;
    const MAX_SURGE_OBJECTIVE_COUNT = 6;
    const MIN_POWER_CARD_COUNT = 20;
    const issues = [];
    let isValid = true;

    if (format === OPEN_FORMAT) return [isValid, issues];

    if (format == VANGUARD_FORMAT) {
        const onlyLatestSeason = deck
            .filter((c) => c.factionId < 2)
            .reduce(
                (lastSeasonOnly, c) =>
                    lastSeasonOnly && Number(c.id) > latestSeasonStartNumber,
                true
            );

        isValid = onlyLatestSeason;
        if (!onlyLatestSeason) {
            issues.push(
                `Vanguard decks can only include cards from last season`
            );
        }
    }

    if (format == CHAMPIONSHIP_FORMAT) {
        const onlyLastTwoSeasons = deck
            .filter((c) => c.factionId < 2)
            .reduce(
                (lastTwoSeasons, c) => lastTwoSeasons && c.id > 11000,
                true
            );
        isValid = onlyLastTwoSeasons;

        if (!onlyLastTwoSeasons) {
            issues.push(`Championship decks cannot include rotated out cards`);
        }

        var totalInvalidCards = deck
            .map((card) => validateCardForPlayFormat(card, format))
            .reduce(
                (total, [, isForsaken, isRestricted]) => {
                    return {
                        // we can just sum by using coersion here, but mathematically that doesn't make sense
                        forsaken: isForsaken
                            ? total.forsaken + 1
                            : total.forsaken,
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
    }

    if (format == RIVALS_FORMAT) {
        const [{ factionId, setId }] = deck;
        const shouldBeFactionOnlyDeck = factionId > 1;
        const allCardsAreFactionCards = deck.reduce(
            (onlyFactionCards, c) => onlyFactionCards && c.setId === setId,
            true
        );
        const allCardsAreSameRivalsDeck = deck.reduce(
            (sameRilvalsDeck, c) => sameRilvalsDeck && c.setId === setId,
            nemesis_valid_sets.includes(setId)
        );

        isValid = shouldBeFactionOnlyDeck
            ? allCardsAreFactionCards
            : allCardsAreSameRivalsDeck;
        if (!isValid) {
            issues.push(
                "Rivals deck only includes cards with that warband symbol or only includes cards from the same universal Rivals Deck"
            );
        }
    }

    if (format === NEMESIS_FORMAT) {
        const universalOnly = deck.filter((c) => c.factionId === 1);
        if (universalOnly.length) {
            const universalRivalsDeckId = universalOnly[0].setId;
            isValid = universalOnly.reduce(
                (sameRivalsDeck, c) =>
                    sameRivalsDeck && c.setId === universalRivalsDeckId,
                nemesis_valid_sets.includes(universalRivalsDeckId)
            );
    
            if (!isValid) {
                issues.push(
                    `Nemesis deck could include only cards with warband symbols or taken from the same single universal Rivals deck`
                );
            }
        }
    }

    if (objectives.length < MIN_OBJECTIVE_COUNT) {
        isValid = false;
        issues.push("Your deck must include at least 12 objective cards");
    }

    if (
        objectives.filter((card) => card.scoreType == SURGE_SCORE_TYPE).length >
        MAX_SURGE_OBJECTIVE_COUNT
    ) {
        isValid = false;
        issues.push("Your deck can't include more than 6 Surge cards");
    }

    if (gambits.length + upgrades.length < MIN_POWER_CARD_COUNT) {
        isValid = false;
        issues.push(
            "Your deck must include at least 20 power cards (gambits and upgrades)"
        );
    }

    if (gambits.length > upgrades.length) {
        isValid = false;
        issues.push("Your deck can't include more gambits than upgrade cards");
    }

    const setsWithPlotCards = Object.keys(
        deck.reduce((acc, c) => {
            const wave = Math.floor(c.id / 1000);
            if (wave === 17 || wave === 18) {
                acc[wave] = acc[wave] ? acc[wave] + 1 : 1;
            }

            return acc;
        }, {})
    ).length;

    if (setsWithPlotCards > 1) {
        isValid = false;
        issues.push(`You can use only one Rivals deck that uses a plot card.`);
    }

    return [isValid, issues];
}

function validateObjectivesListForPlayFormat(objectives, format) {
    const issues = [];
    let isValid = true;

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

const checkDeckHasPlots = (faction, sets) => {
    return warbandHasPlot(getFactionByName(faction).id) || sets.some(setId => setHasPlot(setId));
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
    checkNonWarbandSpecificCard,
    checkWarbandSpecificCard,
    warbandsWithPlot,
    rivalDecksWithPlot,
    warbandHasPlot,
    setHasPlot,
    plots,
    checkDeckHasPlots,
};
