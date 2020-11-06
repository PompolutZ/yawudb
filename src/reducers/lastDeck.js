const ADD_OR_UPDATE_LAST_DECK = "ADD_OR_UPDATE_LAST_DECK";
const REMOVE_DECK = "REMOVE_DECK";

export const addOrUpdateLastDeck = (id, timestamp, data) => {
    return {
        type: ADD_OR_UPDATE_LAST_DECK,
        payload: {
            id: id,
            timestamp: timestamp,
            data: data,
        },
    };
};

export const removeMyDeck = (id) => {
    return {
        type: REMOVE_DECK,
        payload: id,
    };
};

const initialState = {};

const lastDeck = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OR_UPDATE_LAST_DECK:
            if (
                state.id === action.payload.id &&
                state.timestamp === action.payload.timestamp
            ) {
                return state;
            }

            return action.payload;

        default:
            return state;
    }
};

export const mergeLoadedStateWithInitial = (loadedState) => {
    return { ...initialState, ...loadedState.lastDeck };
};

export default lastDeck;
