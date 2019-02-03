export const SET_DECKS_META = 'SET_DECKS_META';

const initialState = {};

const decksMeta = (state = initialState, action) => {
    switch(action.type) {
        case SET_DECKS_META: 
            return {...state, [action.payload.key]: action.payload.value };
        
        default: 
            return state;
    }
}

export const mergeLoadedStateWithInitial = loadedState => {
    return { ...initialState, ...loadedState.decksMeta };
}

export default decksMeta;