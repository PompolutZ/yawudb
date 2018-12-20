import { cardType, objectiveScoreType, setsIndex } from '../data/index';
import keys from 'lodash/keys';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const SET_CREATE_MODE_SETS = 'SET_CREATE_MODE_SETS';
export const SET_EDIT_MODE_SETS = 'SET_EDIT_MODE_SETS';
export const SET_VISIBLE_CARD_TYPES = 'SET_VISIBLE_CARD_TYPES';
export const SET_VISIBLE_OBJECTIVE_SCORE_TYPES = 'SET_VISIBLE_OBJECTIVE_SCORE_TYPES';
export const SET_ELIGIBLE_FOR_ORGANIZED_PLAY = "SET_ELIGIBLE_FOR_ORGANIZED_PLAY";

export const initialState = {
    searchText: '',
    visibleCardTypes: keys(cardType).map(k => parseInt(k, 10)),
    visibleObjectiveScoreTypes: keys(objectiveScoreType).map(k => parseInt(k, 10)),
    createModeSets: Object.keys(setsIndex),
    editModeSets: [],
    eligibleForOP: true
}

const cardLibraryFilters = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_SEARCH_TEXT:
            return { ...state, searchText: action.payload }

        case SET_CREATE_MODE_SETS: 
            return { ...state, createModeSets: action.payload };

        case SET_EDIT_MODE_SETS: 
            return { ...state, editModeSets: action.payload };

        case SET_VISIBLE_CARD_TYPES: 
            return { ...state, visibleCardTypes: action.payload }
            
        case SET_VISIBLE_OBJECTIVE_SCORE_TYPES:
            return { ...state, visibleObjectiveScoreTypes: action.payload }    

        case SET_ELIGIBLE_FOR_ORGANIZED_PLAY:
            return { ...state, eligibleForOP: action.payload }    

        default:
            return state;
    }
} 

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.cardLibraryFilters };
}

export default cardLibraryFilters;