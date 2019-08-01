import { cardsdb } from './cardsdb';
import powersUnboundCards from './dbs/powers_unbound_db';
import { dreadfaneDb } from './dbs/dreadfane_db';

export { 
    factions,
    factionCards,
    PREFIX_LENGTH,
    factionIdPrefix,
    filterFactionByIdRange,
    idPrefixToFaction,
    factionSets,
    factionIndexes,
    warbandsWithDefaultSet,
    factionMembers
} from './atoms/factions';

export {
    setInfos,
    setsReleaseDates,
    setsIndex,
    setsNames
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
}

export const universalCardsStartNumber = 233;

export const cardsDb = {
    ...cardsdb,
    ...powersUnboundCards,
    ...dreadfaneDb                                                              
}

export const bannedCards = {
    '01329': 1, // Great Concussion
    '01347': 1, // Quick Thinker
    '01368': 1, // Time Trap
    '03317': 1, // Extreme Flank
};

export const restrictedCards = {
    '01234': 1,
    '01235': 1,
    '01243': 1,
    '01252': 1,
    '01257': 1,
    '03319': 1,
    '03342': 1,
    '03343': 1, // Longstrider
    '01280': 1,
    '01284': 1,
    '01291': 1, //Superior Tactician
    '03291': 1,
    '04025': 1,
    '03302': 1,
    '03371': 1,
    '04036': 1,

    '01321': 1,
    '01332': 1,
    '01343': 1,
    '03436': 1,
    '01348': 1,
    '01369': 1,
    '01372': 1,
    '04046': 1,
    '03451': 1,
    '04048': 1,

    '01373': 1,
    '01376': 1,
    '01384': 1, // Deathly Fortitude
    '01393': 1,
    '01395': 1,
    '01410': 1,
    '01412': 1,
    '03539': 1,
    '01420': 1,
    '03543': 1, // Sudden Growth
    '01424': 1,
    '03550': 1, // Tome of Offerings
    '03476': 1,
    '04057': 1,
    '03557': 1,
}

