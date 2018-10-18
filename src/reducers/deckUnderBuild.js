import { Set } from 'immutable';
import { factions } from '../data/index';

export const SET_FACTION = 'SET_FACTION';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const CLEAR_DECK = 'CLEAR_ALL_CARDS_IN_DECK';
export const RESET_DECK = 'RESET_DECK';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_SOURCE = 'CHANGE_SOURCE'; 
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION'; 

const initialState = {
    name: `${factions['garreks-reavers']} Deck`,
    source: '',
    desc: '',
    faction: 'garreks-reavers',
    factionDefaultSet: 0,
    deck: new Set()
}

const deckUnderBuild = (state = initialState, action) => {
    switch(action.type) {
        case SET_FACTION:
            const faction = action.faction.startsWith('n_') ? action.faction.slice(2) : action.faction;
            return { ...state, name: `${factions[faction]} Deck`, faction: action.faction, factionDefaultSet: action.defaultSet, deck: new Set() };
        
        case CHANGE_NAME:
            return { ...state, name: action.name } 

        case CHANGE_SOURCE:
            return { ...state, source: action.source } 
        
        case CHANGE_DESCRIPTION:
            return { ...state, desc: action.desc } 
        
        case ADD_CARD:
            return { ...state, deck: new Set(state.deck).add(action.card) }

        case REMOVE_CARD:
            return { ...state, deck: new Set(state.deck).delete(action.card) }
            
        case CLEAR_DECK:
            return { ...state, deck: new Set() }     
        
        case RESET_DECK: 
            return { ...state, name: `${factions[state.faction]} Deck`, source: '', deck: new Set() }    

        default:
            return state;            
    }
}

export default deckUnderBuild;