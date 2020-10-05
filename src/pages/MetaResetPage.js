import React, { useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import { idPrefixToFaction } from '../data';

export default function MetaReset(props) {
    const [allDecks, setAllDecks] = useState(null);
    const firebase = React.useContext(FirebaseContext)

    useEffect(() => {
        firebase
            .decks()
            .once('value')
            .then(s => {
                const data = s.val()
                setAllDecks(data);
                // console.log(Object.entries(data))
                const init = Object.entries(data)
                    .filter(([id, value]) => !value.private)
                    .map(([id, value]) => {
                        let created = new Date(0)
                        if (value.created && value.created.seconds) {
                            created.setSeconds(value.created.seconds)
                        } else {
                            created = new Date(value.created)
                        }

                        return { id: id, date: created }
                    })
                    .sort((a, b) => b.date - a.date)
                // const afterSort = init
                // console.log("All decks:", init);
                const allIds = init.map(x => x.id).slice(1)

                firebase.decksMetaDb()
                    .doc('all')
                    .set({
                        // count: allIds.length,
                        ids: allIds,
                    })

                const prefixes = Object.keys(idPrefixToFaction)
                for (let prefix of prefixes) {
                    const ids = allIds.filter(id => id.startsWith(prefix))
                    firebase.decksMetaDb()
                        .doc(`${prefix}`)
                        .set({
                            // count: ids.length,
                            ids: ids,
                        })
                        .then(() => console.log(`UPDATED META FOR ${prefix}`))
                }
            })
    }, [])

    useEffect(() => {
        console.log('ALL DECKS', allDecks ? Object.entries(allDecks).length : 0);
    }, [allDecks]);

    const handleMakeAuthorDecksPrivate = () => {
        const privateDecks = Object.entries(allDecks).filter(([id, value]) => value.author !== 'Anonymous');
        for(let [id, deck] of privateDecks) {
            firebase.deck(id).update({
                private: true
            });
        }
    }

    return (<div>
        <button onClick={handleMakeAuthorDecksPrivate}>Make Private</button>
    </div>);
}
