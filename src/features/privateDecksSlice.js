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

export default privateDecksSlice.reducer;