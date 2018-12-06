import { Set } from 'immutable';
import { factions, restrictedCards, cardsDb } from '../data/index';

export const EDIT_FACTION = 'EDIT_FACTION';
export const EDIT_ADD_CARD = 'EDIT_ADD_CARD';
export const EDIT_REMOVE_CARD = 'EDIT_REMOVE_CARD';
export const EDIT_CLEAR_ALL_CARDS_IN_DECK = 'EDIT_CLEAR_ALL_CARDS_IN_DECK';
export const EDIT_RESET_DECK = 'EDIT_RESET_DECK';
export const EDIT_DECK_NAME = 'EDIT_DECK_NAME';
export const EDIT_DECK_SOURCE = 'EDIT_DECK_SOURCE'; 
export const EDIT_DECK_DESCRIPTION = 'EDIT_DECK_DESCRIPTION'; 

const initialState = {
    name: `${factions['garreks-reavers']} Deck`,
    source: '',
    desc: '',
    faction: 'garreks-reavers',
    factionDefaultSet: 0,
    deck: new Set(),
    objectivesCount: 0,
    gambitsCount: 0,
    upgradesCount: 0,
    restrictedCardsCount: 0
}

const deckUnderEdit = (state = initialState, action) => {
    const c = cardsDb[action.card];
    switch(action.type) {
        case EDIT_FACTION:
            const faction = action.faction.startsWith('n_') ? action.faction.slice(2) : action.faction;
            return { ...state, name: `${factions[faction]} Deck`, faction: action.faction, factionDefaultSet: action.defaultSet, deck: new Set() };
        
        case EDIT_DECK_NAME:
            return { ...state, name: action.name } 

        case EDIT_DECK_SOURCE:
            return { ...state, source: action.source } 
        
        case EDIT_DECK_DESCRIPTION:
            return { ...state, desc: action.desc } 
        
        case EDIT_ADD_CARD:
            return { 
                ...state, 
                deck: new Set(state.deck).add(action.card),
                objectivesCount: isObjectiveCard(c.type) ? state.objectivesCount + 1 : state.objectivesCount,
                gambitsCount: isGambitCard(c.type) ? state.gambitsCount + 1 : state.gambitsCount,
                upgradesCount: isUpgradeCard(c.type) ? state.upgradesCount + 1 : state.upgradesCount,
                restrictedCardsCount: isRestrictedCard(action.card) ? state.restrictedCardsCount + 1 : state.restrictedCardsCount, 
            }

        case EDIT_REMOVE_CARD:
            return { 
                ...state, 
                deck: new Set(state.deck).delete(action.card),
                objectivesCount: isObjectiveCard(c.type) ? state.objectivesCount - 1 : state.objectivesCount,
                gambitsCount: isGambitCard(c.type) ? state.gambitsCount - 1 : state.gambitsCount,
                upgradesCount: isUpgradeCard(c.type) ? state.upgradesCount - 1 : state.upgradesCount,
                restrictedCardsCount: isRestrictedCard(action.card) ? state.restrictedCardsCount - 1 : state.restrictedCardsCount, 
            }
            
        case EDIT_CLEAR_ALL_CARDS_IN_DECK:
            return { ...state, deck: new Set(), objectivesCount: 0, gambitsCount: 0, upgradesCount: 0, restrictedCardsCount: 0 }     
        
        case EDIT_RESET_DECK: 
            return { 
                ...state, 
                name: `${factions[state.faction]} Deck`, 
                source: '', 
                deck: new Set(), 
                desc: '', 
                objectivesCount: 0, 
                gambitsCount: 0, 
                upgradesCount: 0, 
                restrictedCardsCount: 0 }    

        default:
            return state;            
    }
}

const isObjectiveCard = type => {
    return type === 0;
}

const isGambitCard = type => {
    return type === 1 || type === 3;
}

const isUpgradeCard = type => {
    return type === 2;
}

const isRestrictedCard = id => {
    return Boolean(restrictedCards[id]);
}

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.deckUnderEdit };
}

export default deckUnderEdit;