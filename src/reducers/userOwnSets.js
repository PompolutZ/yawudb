const initialState = [];

function userOwnSets(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_SETS':
            return action.sets
        default: 
            return state;            
    }
}

export const mergeLoadedStateWithInitial = loadedState => {
    return [...initialState, ...loadedState.userOwnSets];
}

export default userOwnSets;