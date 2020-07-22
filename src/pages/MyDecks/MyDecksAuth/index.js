import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../firebase'
import useAuthUser from '../../../hooks/useAuthUser';

function MyDecksAuth() {
    const auth = useAuthUser();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const fetchDecks = async () => {
            const snapshot = await firebase.realdb
                .ref('decks')
                .orderByChild("author")
                .equalTo(auth.uid)
                .once('value');
            const decks = snapshot.val();
            console.log('Fetched: ', Object.entries(decks).map(([k,v]) => ({ 
                id: k,
                name: v.name,
                author: v.authorDisplayName,

            })));
        }

        fetchDecks();
    }, [])

    return (
        <div>
            Hello        
        </div>
    )
}

export default MyDecksAuth
