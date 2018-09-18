function userOwnSets(state = [], action) {
    switch(action.type) {
        case 'UPDATE_SETS':
            return action.sets
        default: 
            return state;            
    }
}

export default userOwnSets;