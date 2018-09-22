import { Set } from 'immutable';
import { factions } from '../data/index';

export const SET_FACTION = 'SET_FACTION';
export const SET_SETS = 'SET_SETS';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const CLEAR_DECK = 'CLEAR_ALL_CARDS_IN_DECK';
export const RESET_DECK = 'RESET_DECK';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_SOURCE = 'CHANGE_SOURCE'; 

const initialState = {
    name: `${factions['garreks-reavers']} Deck`,
    source: '',
    faction: 'garreks-reavers',
    sets: [],
    deck: new Set()
}

const deckUnderBuild = (state = initialState, action) => {
    switch(action.type) {
        case SET_FACTION:
            return { ...state, name: `${factions[action.faction]} Deck`, faction: action.faction, deck: new Set() };
        
        case SET_SETS: 
            return { ...state, sets: action.sets }

        case CHANGE_NAME:
            return { ...state, name: action.name } 

        case CHANGE_SOURCE:
            return { ...state, source: action.source } 
        
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