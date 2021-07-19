import useAuthUser from "./useAuthUser";
import useDexie from "./useDexie";
import { useUpdateUserDeck } from "./wunderworldsAPIHooks";

export function useUpdateDeckFactory() {
    const user = useAuthUser();
    const db = useDexie('wudb');
    const [, update] = useUpdateUserDeck(); 

    if (user !== null) {
        return update;
    } else {
        return function saveLocally(payload) {
            const now = new Date().getTime();
            
            return db.anonDecks.where('deckId').equals(payload.data.deckId).modify({
                ...payload.data,
                updatedutc: now,
            });
        }
    }
}