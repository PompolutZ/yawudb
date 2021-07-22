import useAuthUser from "./useAuthUser";
import useDexie from "./useDexie";
import { usePostUserDeck } from "./wunderworldsAPIHooks";

export function useSaveDeckFactory() {
    const user = useAuthUser();
    const db = useDexie('wudb');
    const [, saveUserDeck] = usePostUserDeck();

    if (user !== null) {
        return saveUserDeck;
    } else {
        return function saveLocally(payload) {
            const now = new Date().getTime();
            return db.anonDecks.add({
                ...payload.data,
                createdutc: now,
                updatedutc: now,
            });
        }
    }
}