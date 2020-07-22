import { createSlice } from "@reduxjs/toolkit";

const privateDecksSlice = createSlice({
    name: 'privateDecks',
    initialState: {},
    reducers: {
        addDecks(state, action) {
            Object.assign(state, action.payload);
        },
        addDeck(state, action) {
            const { id, data } = action.payload;
            state[id] = data;
        },
        deleteDeck(state,action) {
            delete state[action.payload];
        },
        togglePublicVisibility(state, action) {
            const deck = state[action.payload];
            deck.private = !deck.private;
        }
    }
});

export const { addDeck, addDecks, deleteDeck, togglePublicVisibility } = privateDecksSlice.actions;

export const fetchDecksFromDatabase = firebase => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const snapshot = await firebase.realdb.ref('decks').orderByChild('author').equalTo(auth.uid).once('value');
        const decks = snapshot.val();
        if(decks) {
            dispatch({
                type: addDecks.type,
                payload: decks,
            });
        }
    } catch (error) {   
        console.error('Something went wrong', error);
    }
}

export default privateDecksSlice.reducer;