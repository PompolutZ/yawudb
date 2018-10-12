import shadespireCardsDb from './dbs/shadespireCardsDb';
import leadersCardsDb from './dbs/leadersCardsDb';
import nightvaultCardsDb from './dbs/nightvaultCardsDb';

export { 
    factions,
    factionCards,
    PREFIX_LENGTH,
    factionIdPrefix,
    filterFactionByIdRange,
    idPrefixToFaction,
    factionSets,
    factionIndexes
} from './atoms/factions';

export {
    setInfos,
    setsReleaseDates,
    setsIndex
} from './atoms/sets';

export { duplicates } from './atoms/duplicatesDb';

export { getCardsByFactionAndSets } from './utils/index';

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
    ...shadespireCardsDb,
    ...leadersCardsDb,
    ...nightvaultCardsDb                                                                 
}