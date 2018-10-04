import { factionIdPrefix } from '../data/index';
import * as _ from 'lodash';

export const SET_FACTIONS_FILTER = 'SET_FACTIONS_FILTER';

const initialState = {
    showDecksForFactions: _.keys(factionIdPrefix)
}

const decksFilters = (state = initialState, action) => {
    switch(action.type) {
        case SET_FACTIONS_FILTER: 
            return { ...state, showDecksForFactions: action.payload };

        default: 
            return state;
    }
}

export default decksFilters;