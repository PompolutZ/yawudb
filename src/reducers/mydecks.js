const ADD_OR_UPDATE_DECK = 'ADD_OR_UPDATE_DECK';
const REMOVE_MY_DECKS = 'REMOVE_MY_DECKS'; 

export const addOrUpdateMyDeck = (id, timestamp, data) => {
    return {
        type: ADD_OR_UPDATE_DECK,
        payload: {
            id: id,
            timestamp: timestamp,
            data: data
        }
    }
};

export const removeMyDecks = ids => {
    return {
        type: REMOVE_MY_DECKS,
        payload: ids
    }
}

const mydecks = (state = {}, action) => {
    switch(action.type) {
         
        case ADD_OR_UPDATE_DECK: 
            if(state.hasOwnProperty(action.payload.id) && action.payload.timestamp.seconds === state[action.payload.id].timestamp.seconds) {
                return state;
            }

            return { ...state, [action.payload.id]: {...action.payload.data, timestamp: action.payload.timestamp} };

        case REMOVE_MY_DECKS:
            const updated = action.payload.reduce((acc, id) => ({...acc, ...{[id]: state[id]}}), {});
            return updated;

        default: 
            return state;
    }
}

export default mydecks;