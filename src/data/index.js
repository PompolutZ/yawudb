import { cardsdb } from './cardsdb';
import powersUnboundCards from './dbs/powers_unbound_db';
import { dreadfaneDb } from './dbs/dreadfane_db';
import { beastgraveDB } from './dbs/beastgrave_db';

export { 
    factions,
    // factionCards,
    PREFIX_LENGTH,
    factionIdPrefix,
    // filterFactionByIdRange,
    idPrefixToFaction,
    // factionSets,
    factionIndexes,
    warbandsWithDefaultSet,
    factionMembers,
    factionIndexesWithDefaultSet
} from './atoms/factions';

export {
    setInfos,
    setsReleaseDates,
    setsIndex,
    setsNames,
    rotatedOutSetsIndexes,
} from './atoms/sets';

export { duplicates } from './atoms/duplicatesDb';

export { getCardsByFactionAndSets, getDbIndexByWaveAndCard } from './utils/index';

export const cardType = ["Objective", "Ploy", "Upgrade", "Gambit Spell"]
export const cardTypeIcons = ['objective-icon', 'ploy-icon', 'upgrade-icon', 'gambit spell-icon'];
export const objectiveScoreType = ['score-immediately', 'score-end-phase', 'score-third-end-phase', 'score-first-end-phase'];

export const totalCardsPerWave = {
    1: 437,
    2: 60,
    3: 557,
    4: 60,
    5: 124,
    6: 438,
}

export const deckPlayFormats = [
    'championship',
    'open',
    'relic'
];

export const universalCardsStartNumber = 233;

export const firstUniversalCardPerWave = [0, 1233, 2017, 3291, 4025, 5065]

export const cardsDb = {
    ...cardsdb,
    ...powersUnboundCards,
    ...dreadfaneDb,
    ...beastgraveDB,                                                              
}

export const championshipForsakenCards = {
    '03317': 1, // Extreme Flank
    '04048': 1, // Upper Hand
}

export const championshipRestrictedCards = {
    // OBJECTIVE CARDS
    '03291': 1, // Acolyte of the Katophranes (Nightvault #291)
    '04025': 1, // Burst of Speed (Power Unbound #25)
    '03302': 1, // Calculated Risk (Nightvault #302)
    '03342': 1, // Loner (Nightvault #342)
    '03343': 1, // Longstrider (Nightvault #343)
    '03371': 1, // Sorcerous Scouring (Nightvault #371)
    '04036': 1, // Warning Shot (Power Unbound #36)
    // POWER CARDS
    '03436': 1, // Pit Trap (Nightvault #436)
    '04046': 1, // Sorcerous Flourish (Power Unbound #46)
    '03451': 1, // Sphere of Aqshy (Nightvault #451)
    '03539': 1, // Slumbering Key (Nightvault #539)
    '04057': 1, // Spiritbond (Power Unbound #57)
    '03543': 1, // Sudden Growth (Nightvault #543)
    '03550': 1, // Tome of Offerings (Nightvault #550)
    '03557': 1, // Well of Power (Nightvault #557)
}


export const bannedCards = {
    '03317': 1, // Extreme Flank
    '04048': 1, // Upper Hand
};

export const restrictedCards = {
    // OBJECTIVE CARDS
    '03291': 1, // Acolyte of the Katophranes (Nightvault #291)
    '04025': 1, // Burst of Speed (Power Unbound #25)
    '03302': 1, // Calculated Risk (Nightvault #302)
    '03342': 1, // Loner (Nightvault #342)
    '03343': 1, // Longstrider (Nightvault #343)
    '03371': 1, // Sorcerous Scouring (Nightvault #371)
    '04036': 1, // Warning Shot (Power Unbound #36)
    // POWER CARDS
    '03436': 1, // Pit Trap (Nightvault #436)
    '04046': 1, // Sorcerous Flourish (Power Unbound #46)
    '03451': 1, // Sphere of Aqshy (Nightvault #451)
    '03539': 1, // Slumbering Key (Nightvault #539)
    '04057': 1, // Spiritbond (Power Unbound #57)
    '03543': 1, // Sudden Growth (Nightvault #543)
    '03550': 1, // Tome of Offerings (Nightvault #550)
    '03557': 1, // Well of Power (Nightvault #557)
}

