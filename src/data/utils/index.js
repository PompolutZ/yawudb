import { factionSets, factionIndexes } from '../atoms/factions';
import { setInfos } from '../atoms/sets';

const getDbIndexByWaveAndCard = (wave, card) => {
    return (`00` + wave).slice(-2) + (`000` + card).slice(-3);
}

export const getCardsByFactionAndSets = (faction, selectedSets) => {
    console.log('getCardsByFactionAndSets', faction, selectedSets);
    const defaultFactionCards = faction !== 'universal' ? [factionSets[faction][0]] : [] 
    let cardIds = [];
    const setsWithFactionSet = [...selectedSets, ...defaultFactionCards];
    console.log('setsWithFactionSet', setsWithFactionSet);
    const fIndex = factionIndexes.indexOf(faction);
    for (let s of setsWithFactionSet) {
        const set = setInfos[s];
        if(set.hasOwnProperty(fIndex)) {
            cardIds = [...cardIds, ...set[fIndex].map(c => getDbIndexByWaveAndCard(set.wave, c))]
        }
    }

    return cardIds;
}
