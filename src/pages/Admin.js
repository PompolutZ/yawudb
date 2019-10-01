import React from 'react';
import { FirebaseContext } from '../firebase';
import isEqual from 'lodash/isEqual';
import { decl } from 'postcss';

function Admin(props) {
    const firebase = React.useContext(FirebaseContext);

    React.useEffect(() => {
        const start = new Date();

        
        firebase.decksMeta().once('value').then(doc => {
            console.log(doc.val().all.ids.slice(-1));
            console.log(doc.val().gd.ids.slice(-1));
            console.log(doc.val().swh.ids.slice(-1));
            console.log(new Date() - start);
        })

        firebase.decksMetaDb().doc('all').get().then(doc => {
            console.log(doc.data().ids.slice(-1));
            console.log(new Date() - start);
        });

        firebase.decksMetaDb().doc('gd').get().then(doc => {
            console.log(doc.data().ids.slice(-1));
            console.log(new Date() - start);
        });

        firebase.decksMetaDb().doc('swh').get().then(doc => {
            console.log(doc.data().ids.slice(-1));
            console.log(new Date() - start);
        });

        firebase.decks().on('value', snapshot => {
            console.log('Time: ', new Date() - start);
            const rawDecks = snapshot.val();
            console.log('RAW', rawDecks);
            const decks = Object.entries(snapshot.val()).map(([key, data]) => {
                let created = new Date(0)
                if (data.created && data.created.seconds) {
                    created.setSeconds(data.created.seconds)
                } else {
                    created = new Date(data.created)
                }

                return {...data, id: key, lastModified: created }
            });
            
            const decksByDateDesc = decks.filter(deck => deck.id !== "undefined").sort((a, b) => b.lastModified - a.lastModified); // filter(d => d.id === 'undefined').
            const decksByDateAsc = decks.filter(deck => deck.id !== "undefined").sort((a, b) => a.lastModified - b.lastModified); // filter(d => d.id === 'undefined').
            // const dublicates = decksByDateDesc.map((deck, i, arr) => {
            //     const ds = arr.filter(inner => inner.author === deck.author && isEqual(inner.cards, deck.cards) && inner.author === "Anonymous");
            //     if(ds.length > 1) {
            //         console.log(deck.id, ds);
            //     }

            //     return deck;
            // });

            // firebase.user("2NQqX1K7h3hFedgX0y4gweyaA5g1").get().then(doc => {
            //     const data = doc.data();
            //     console.log('USER:', data);
            //     for(let deckId of data.mydecks) {
            //         if(!rawDecks[deckId]) {
            //             console.log(deckId);
            //         }
            //     }
            // })
            // const affectedUsers = decksByDateDesc.map(d => d.author);

            // for(let user of affectedUsers) {
            //     firebase.user(user).get().then(doc => {
            //         const userData = doc.data();
            //         const userDecks = {};
            //         for(let deckId of userData.mydecks) {
            //             userDecks[deckId] = rawDecks[deckId];
            //         }

            //         console.log(userDecks);
            //     });
            // }
            // const allDecks = decksByDateDesc.reduce((acc, deck) => {
            //     const prefix = deck.id.split('-')[0];
            //     if(!acc[prefix]) {
            //         acc[prefix] = [deck.id]
            //     } else {
            //         acc = {...acc, [prefix]: [...acc[prefix], deck.id]}
            //     }
                
            //     return acc;
            // }, {});
            // console.log(decksByDateDesc);
            // const update = Object.entries(allDecks).reduce((acc, [key, value]) => {
            //     return {...acc, [key]: {
            //         count: value.length,
            //         ids: value
            //         }
            //     }
            // }, {
            //     all: {
            //         count: decksByDateDesc.length,
            //         ids: decksByDateDesc.map(d => d.id)
            //     }
            // });


            // const idsAsc = decksByDateAsc.reduce((r, d) => {
            //     const prefix = d.id.split('-')[0];
            //     if(!r[prefix]) {
            //         r[prefix] = [d.id];
            //     } else {
            //         r = {...r, [prefix]: [...r[prefix], d.id]}
            //     }

            //     return r;
            // }, {
            //     all: decksByDateAsc.map(d => d.id)
            // });
            // console.log(idsAsc);
            // for(let key of Object.keys(idsAsc)) {
            //     firebase.decksMetaDb().doc(key).set({ids: idsAsc[key]});
            // }
            
            // const all = {
            //     count: allDecks.length,
            //     ids: allDecks,
            // }

            // console.log(JSON.stringify(all, null, 4));
            // var updates = {};
            // updates['/all'] = all;
            //firebase.decksMeta().update(update);
            

        });

        return () => firebase.decks().off();
    }, [])
    return (
        <div>

        </div>
    )
}

export default Admin;