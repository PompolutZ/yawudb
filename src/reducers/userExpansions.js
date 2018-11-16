export const UPDATE_EXPANSIONS = 'UPDATE_EXPANSIONS';

const userExpansions = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_EXPANSIONS: 
            return action.payload;

        default:
            return state; 
    }
}

export default userExpansions;