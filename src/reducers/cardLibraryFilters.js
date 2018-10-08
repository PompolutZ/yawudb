import { cardType, objectiveScoreType } from '../data/index';
import * as _ from 'lodash';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const SET_SETS = 'SET_SETS';
export const SET_VISIBLE_CARD_TYPES = 'SET_VISIBLE_CARD_TYPES';
export const SET_VISIBLE_OBJECTIVE_SCORE_TYPES = 'SET_VISIBLE_OBJECTIVE_SCORE_TYPES';

const initialState = {
    searchText: '',
    visibleCardTypes: [_.keys(cardType)].map(k => parseInt(k, 10)),
    visibleObjectiveScoreTypes: [_.keys(objectiveScoreType)].map(k => parseInt(k, 10)),
    sets: []
}

const cardLibraryFilters = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_SEARCH_TEXT:
            return { ...state, searchText: action.payload }

        case SET_SETS: 
            return { ...state, sets: action.payload };

        case SET_VISIBLE_CARD_TYPES: 
            return { ...state, visibleCardTypes: action.payload }
            
        case SET_VISIBLE_OBJECTIVE_SCORE_TYPES:
            return { ...state, visibleObjectiveScoreTypes: action.payload }    

        default:
            return state;
    }
} 

export default cardLibraryFilters;