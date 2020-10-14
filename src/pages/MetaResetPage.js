import React, { useState, useEffect } from "react";
import { FirebaseContext } from "../firebase";
import { deckPlayFormats, idPrefixToFaction, rotatedOutSetsIndexes } from "../data";

export default function MetaReset(props) {
    const [allDecks, setAllDecks] = useState([]);
    const firebase = React.useContext(FirebaseContext);

    useEffect(() => {
        firebase.realdb.ref('/decks').orderByChild('private').equalTo(false).once('value')
        .then(s => {
            const publicDecks = Object.entries(s.val()).map(([id, {
                author,
                authorDisplayName,
                created,
                name,
                sets,
                cards,
            }]) => {
                let createdAt = new Date(0);
                if (created && created.seconds) {
                    createdAt.setSeconds(created.seconds);
                } else {
                    createdAt = new Date(created);
                }
                // author: "Anonymous"
                // authorDisplayName: "Anonymous"
                // cards: (32) ["06280", "06282", "06393", "06295", "06362", "06010", "06021", "07022", "06363", "06396", "04032", "06001", "06375", "04055", "06398", "07014", "06366", "06400", "06257", "06005", "06314", "06028", "07018", "03400", "03368", "06427", "06317", "06428", "06329", "03503", "06308", "06429"]
                // created: "Wed Sep 09 2020 19:13:31 GMT+0200 (hora de verano de Europa central)"
                // desc: ""
                // faction: "gd"
                // id: "gd-0a63298d821b"
                // modified: 1599671611000
                // name: "Grashrak’s Despoilers Deck"
                // private: false
                // scoringSummary: (4) [0, 0, 0, 0]
                // sets: (11) [10, 11, 18, 20, 21, 22, 23, 24, 25, 26, 27]
                // source: ""

                return {
                    id,
                    author,
                    authorDisplayName,
                    name,
                    cards: JSON.stringify(cards),
                    sets,
                    faction: id.split('-')[0],
                    modified: createdAt.getTime(),
                }
            });
            setAllDecks(publicDecks);
        });
    }, [firebase])
    // useEffect(() => {
    //     firebase
    //         .decks()
    //         .once("value")
    //         .then((s) => {
    //             const data = s.val();
    //             setAllDecks(data);
    //             // console.log(Object.entries(data))
    //             const init = Object.entries(data)
    //                 .filter(([id, value]) => !value.private)
    //                 .map(([id, value]) => {
    //                     let created = new Date(0);
    //                     if (value.created && value.created.seconds) {
    //                         created.setSeconds(value.created.seconds);
    //                     } else {
    //                         created = new Date(value.created);
    //                     }

    //                     return { id: id, date: created };
    //                 })
    //                 .sort((a, b) => b.date - a.date);
    //             // const afterSort = init
    //             // console.log("All decks:", init);
    //             const allIds = init.map((x) => x.id).slice(1);
    //             console.log(allIds.length);

    //             firebase
    //                 .decksMetaDb()
    //                 .doc("all")
    //                 .set({
    //                     // count: allIds.length,
    //                     ids: allIds,
    //                 })
    //                 .then(() => console.log("UPDATED META ALL"));

    //             const prefixes = Object.keys(idPrefixToFaction);
    //             for (let prefix of prefixes) {
    //                 const ids = allIds.filter((id) => id.startsWith(prefix));
    //                 // console.log(prefix, ids);
    //                 firebase
    //                     .decksMetaDb()
    //                     .doc(`${prefix}`)
    //                     .set({
    //                         // count: ids.length,
    //                         ids: ids,
    //                     })
    //                     .then(() => console.log(`UPDATED META FOR ${prefix}`));
    //             }
    //         });
    // }, []);

    useEffect(() => {
        console.log(
            "ALL DECKS",
            allDecks ? allDecks.length : 0
        );
        console.log(allDecks.filter(deck => (new Date().getTime() - deck.modified) / 1000 / 60 / 60 / 24 < 150))
    }, [allDecks]);

    const handleMakeAuthorDecksPrivate = () => {
        const privateDecks = Object.entries(allDecks).filter(
            ([id, value]) => value.author !== "Anonymous"
        );
        console.log(privateDecks);
        for (let [id, deck] of privateDecks) {
            firebase.deck(id).update({
                private: true,
            });
        }
    };

    const handleUpdatePublicDecks = () => {
        const cleaned = allDecks.reduce((dup, deck, i, source) => {
            if (dup.original.find(d => d.faction === deck.faction && d.cards === deck.cards)) {
                return {
                    ...dup,
                    duplicates: [...dup.duplicates, deck]
                };
            } else {
                return {
                    ...dup,
                    original: [...dup.original, deck]
                }
            }
        }, {
            duplicates: [],
            original: []
        })

        const back150 = cleaned.original.filter(deck => (new Date().getTime() - deck.modified) / 1000 / 60 / 60 / 24 < 150);
        const olderThan150 = cleaned.original.filter(deck => (new Date().getTime() - deck.modified) / 1000 / 60 / 60 / 24 >= 150);
        const payload = back150.reduce((p, deck) => ({...p, [deck.id]: deck}), {});
        console.log(payload);
        const sharedDecks = cleaned.original.reduce((log, deck) => ({
            ...log,
            [deck.modified]: ({ id: deck.id, action: 'SHARED' })
        }), {});

        firebase.realdb.ref('/public_decks/').set(sharedDecks);

        // firebase.realdb.ref('/public_decks/all/').set(payload);

        // const archive = olderThan150.reduce((p, deck) => ({...p, [deck.id]: deck}), {});
        // console.log(archive);
        // firebase.realdb.ref('/public_decks/archive/').set(null);
    }

    return (
        <div>
            <button onClick={handleMakeAuthorDecksPrivate}>Make Private</button>
            <button className=" m-1 p-1 bg-accent rounded text-white" onClick={handleUpdatePublicDecks}>Update Public Decks</button>
            {
                allDecks.sort((l, r) => r.modified - l.modified).map(deck => (
                    <section key={deck.id} className="bg-blue-100 m-1 p-1 text-grey-800"> 
                        <div className="text-grey-500 font-semibold text-sm">{deck.id}</div>                       
                        <div className="text-grey-700 text-xl">{deck.name}</div>                       
                        <div className="text-blue-500">{new Date(deck.modified).toLocaleDateString()}</div>                       
                    </section>
                ))
            }
        </div>
    );
}
