import keys from 'lodash/keys';
import __isEqual from 'lodash/isEqual';

const ADD_OR_UPDATE_DECK = 'ADD_OR_UPDATE_DECK';
const REMOVE_MY_DECKS = 'REMOVE_MY_DECKS';
const REMOVE_MY_DECK = 'REMOVE_MY_DECK' 

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

export const removeMyDeck = id => {
    return {
        type: REMOVE_MY_DECK,
        payload: id
    }
}

const initialState = {};

const mydecks = (state = initialState, action) => {
    switch(action.type) {
         
        case ADD_OR_UPDATE_DECK: 
            // console.log('REDUCER', action.payload, state[action.payload.id]);
            if(!state[action.payload.id]) {
                return { ...state, [action.payload.id]: {...action.payload.data, timestamp: action.payload.timestamp} };    
            }

            const merged = {
                id: action.payload.id,
                author: action.payload.data.author,
                cards: action.payload.data.cards.join(','),
                name: action.payload.data.name,
                sets: action.payload.data.sets.sort().join(','),
            };

            const cached = {
                id: action.payload.id,
                author: state[action.payload.id].author,
                cards: state[action.payload.id].cards.join(','),
                name: state[action.payload.id].name,
                sets: state[action.payload.id].sets.sort().join(','),
            }

            if(state.hasOwnProperty(action.payload.id) && __isEqual(cached, merged)) {
                return state;
            }

            return { ...state, [action.payload.id]: {...action.payload.data, timestamp: action.payload.timestamp} };

        case REMOVE_MY_DECKS:
            const updated = action.payload.reduce((acc, id) => ({...acc, ...{[id]: state[id]}}), {});
            return updated;

        case REMOVE_MY_DECK: 
            return keys(state).filter(id => id !== action.payload).reduce((acc, el) => {
                acc[el] = state[el];
                return acc;
            }, {});

        default: 
            return state;
    }
}

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.mydecks };
}


export default mydecks;