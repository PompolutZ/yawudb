import { FINISH_SAVING_DECK } from './reducer';

export const firebaseSaveDeckAsync = firebase => async (state, effect, dispatch) => {
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
            name: deckName,
            faction: state.faction.name,
            deck: deck.map(c => c.id).join(","),
            sets: Array.from(new Set(deck.map(c => c.setId))).join(",")
        });

        dispatch({ type: FINISH_SAVING_DECK });
    } catch (e) {
        console.error(e);
    }
}

export function addKeyToLocalStorage(state, {key, value}) {
    localStorage.setItem(key, JSON.stringify(value));
} 

export function removeKeyFromLocalStorage(state, { key }) {
    localStorage.removeItem(key);
}

export function initialiseStateFromLocalStorage(state, { key }, dispatch) {
    const value = localStorage.getItem(key);

    if(!value) return;

    const serializedState = JSON.parse(value);

    dispatch({
        type: "SET_DESERIALIZED_STATE",
        payload: serializedState,
    });
}