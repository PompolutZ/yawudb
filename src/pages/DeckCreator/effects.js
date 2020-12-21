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
        
        console.log(effect);
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