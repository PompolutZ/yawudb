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

const initialState = {};

const mydecks = (state = initialState, action) => {
    switch(action.type) {
         
        case ADD_OR_UPDATE_DECK: 
            console.log(new Date(action.payload.timestamp) - new Date(state[action.payload.id].timestamp));
            if(state.hasOwnProperty(action.payload.id) && (new Date(action.payload.timestamp) - new Date(state[action.payload.id].timestamp)) <= 0) {
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

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.mydecks };
}


export default mydecks;