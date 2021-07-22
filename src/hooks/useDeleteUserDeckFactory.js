import useAuthUser from "./useAuthUser";
import useDexie from "./useDexie";
import { useDeleteUserDeck } from "./wunderworldsAPIHooks";

export function useDeleteUserDeckFactory() {
    const user = useAuthUser();
    const db = useDexie('wudb');
    const [, deleteUserDeck] = useDeleteUserDeck();

    if (user !== null) {
        return function deleteDeckRemotely(deckId) {
            return deleteUserDeck({
                url: `/api/v1/user-decks/${deckId}`,
            });
        }
    } else {
        return function deleteDeckLocally(deckId) {
            return db.anonDecks.where('deckId').equals(deckId).delete();
        }
    }
}