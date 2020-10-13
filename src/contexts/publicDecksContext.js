import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';

export const PublicDecksContext = React.createContext(null);

const LAST_KNOWN_TIMESTAMP = 'wu_lastPublicDeck';

const PublicDecksProvider = ({ children }) => {
    const [lastUsedPublicDeckId, setLastUsedPublicDeckId] = useState(localStorage.getItem(LAST_KNOWN_TIMESTAMP) || undefined);
    const [decks, setDecks] = useState([]);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        console.log('Public Deck Context');
        if(!lastUsedPublicDeckId) {
            firebase.realdb.ref('/public_decks').on('value', snapshot => {
                console.log('PublicDeckContext', snapshot.val())
                const actions = snapshot.val();
                const lastTimestamp = Number(Object.keys(actions).slice(-1));
                console.log(lastTimestamp, new Date(lastTimestamp));
                // maybe try not to use localstorage at all
                localStorage.setItem(LAST_KNOWN_TIMESTAMP, lastTimestamp);
                setLastUsedPublicDeckId(lastTimestamp);
            })
        } else {
            firebase.realdb.ref('/public_decks').orderByKey().startAt(lastUsedPublicDeckId).on('value', snapshot => {
                console.log('PublicDecks from', lastUsedPublicDeckId, snapshot.val());
            })
        }

        return () => {
            firebase.realdb.ref('/public_decks').off();
        }
    }, [])

    return (
        <PublicDecksContext.Provider value={decks}>
            { children }
        </PublicDecksContext.Provider>
    )
}

export default PublicDecksProvider;

