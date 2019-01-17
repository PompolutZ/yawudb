import { cardsdb } from './cardsdb';

export { 
    factions,
    factionCards,
    PREFIX_LENGTH,
    factionIdPrefix,
    filterFactionByIdRange,
    idPrefixToFaction,
    factionSets,
    factionIndexes,
    warbandsWithDefaultSet
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
    3: 557
}

export const universalCardsStartNumber = 233;

export const cardsDb = {
    ...cardsdb                                                                 
}

export const bannedCards = {
    '01329': 1,
    '01347': 1,
    '01368': 1
};

export const restrictedCards = {
    '01234': 1,
    '01235': 1,
    '01243': 1,
    '01252': 1,
    '01257': 1,
    '03317': 1,
    '03319': 1,
    '03342': 1,
    '01280': 1,
    '01284': 1,
    '01321': 1,
    '01332': 1,
    '01343': 1,
    '03436': 1,
    '01348': 1,
    '01369': 1,
    '01372': 1,
    '01373': 1,
    '01376': 1,
    '01393': 1,
    '01395': 1,
    '01410': 1,
    '01412': 1,
    '03539': 1,
    '01420': 1,
    '01424': 1,
}

