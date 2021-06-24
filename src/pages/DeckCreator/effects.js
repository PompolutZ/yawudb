import { FINISH_SAVING_DECK } from "./reducer";

export const firebaseSaveDeckAsync = (firebase) => async (
    state,
    effect,
    dispatch
) => {
    try {
        const {
            deckName,
            author,
            authorDisplayName,
            deckId,
            createdutc,
            updatedutc,
        } = effect.deckMeta;

        const deck = [
            ...state.selectedObjectives,
            ...state.selectedGambits,
            ...state.selectedUpgrades,
        ];

        await firebase.realdb.ref(`/decks/${deckId}`).set({
            author,
            authorDisplayName,
            createdutc,
            updatedutc,
            private: true,
            name: deckName,
            faction: state.faction.name,
            deck: deck.map((c) => c.id).join(","),
            sets: Array.from(new Set(deck.map((c) => c.setId))).join(","),
        });

        dispatch({ type: FINISH_SAVING_DECK });
    } catch (e) {
        console.error(e);
    }
};

export const apiSaveDeckAsync = (save) => async (state, effect, dispatch) => {
    try {
        const {
            deckName,
            deckId,
        } = effect.deckMeta;

        const deck = [
            ...state.selectedObjectives,
            ...state.selectedGambits,
            ...state.selectedUpgrades,
        ];

        await save({ data: {
            deckId,
            private: true,
            name: deckName,
            faction: state.faction.name,
            deck: deck.map((c) => c.id),
            sets: Array.from(new Set(deck.map((c) => c.setId))),
        }})

        dispatch({ type: FINISH_SAVING_DECK });
    } catch (e) {
        console.error("Error saving deck", e);
    }
};

export const apiUpdateDeckAsync = update => async (state, effect, dispatch) => {
    try {
        const {
            deckName,
            deckId,
        } = effect.deckMeta;

        const deck = [
            ...state.selectedObjectives,
            ...state.selectedGambits,
            ...state.selectedUpgrades,
        ];

        await update({ url: `/api/v1/user-decks/${deckId}`, data: {
            private: true,
            name: deckName,
            faction: state.faction.name,
            deck: deck.map((c) => c.id),
            sets: Array.from(new Set(deck.map((c) => c.setId))),
        }})

        dispatch({ type: FINISH_SAVING_DECK });
    } catch (e) {
        console.error("Error saving deck", e);
    }
}

export function addKeyToLocalStorage(state, { key, value }) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeKeyFromLocalStorage(state, { key }) {
    localStorage.removeItem(key);
}

export function initialiseStateFromLocalStorage(state, { key }, dispatch) {
    const value = localStorage.getItem(key);

    if (!value) return;

    const serializedState = JSON.parse(value);

    dispatch({
        type: "SET_DESERIALIZED_STATE",
        payload: serializedState,
    });
}
