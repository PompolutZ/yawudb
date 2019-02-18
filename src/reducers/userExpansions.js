export const UPDATE_EXPANSIONS = 'UPDATE_EXPANSIONS';

const initialState = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
}

const userExpansions = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_EXPANSIONS: 
            if (!action.payload) {
                return initialState;
            }
            
            return action.payload;

        default:
            return state; 
    }
}

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.userExpansions };
}

export default userExpansions;