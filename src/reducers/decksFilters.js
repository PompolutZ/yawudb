import { factionIdPrefix } from '../data/index';
import keys from 'lodash/keys';

export const SET_FACTIONS_FILTER = 'SET_FACTIONS_FILTER';

const initialState = {
    showDecksForFactions: keys(factionIdPrefix)
}

const decksFilters = (state = initialState, action) => {
    switch(action.type) {
        case SET_FACTIONS_FILTER: 
            return { ...state, showDecksForFactions: action.payload };

        default: 
            return state;
    }
}

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.decksFilters };
}

export default decksFilters;