import React from "react";
import { FirebaseContext } from "../firebase";
import isEqual from "lodash/isEqual";
import Button from "@material-ui/core/Button";

function Admin(props) {
    const firebase = React.useContext(FirebaseContext);

    const handleUpdateDecksMetaFirestore = () => {
        // const start = new Date();
        // firebase.decks().on('value', snapshot => {
        //     const rawDecks = snapshot.val();
        //     const decks = Object.entries(snapshot.val()).map(([key, data]) => {
        //         let created = new Date(0)
        //         if (data.created && data.created.seconds) {
        //             created.setSeconds(data.created.seconds)
        //         } else {
        //             created = new Date(data.created)
        //         }
        //         return {...data, id: key, lastModified: created }
        //     });
        //     const decksByDateAsc = decks.filter(deck => deck.id !== "undefined").sort((a, b) => a.lastModified - b.lastModified); // filter(d => d.id === 'undefined').
        //     const idsAsc = decksByDateAsc.reduce((r, d) => {
        //         const prefix = d.id.split('-')[0];
        //         if(!r[prefix]) {
        //             r[prefix] = [d.id];
        //         } else {
        //             r = {...r, [prefix]: [...r[prefix], d.id]}
        //         }
        //         return r;
        //     }, {
        //         all: decksByDateAsc.map(d => d.id)
        //     });
        //     for(let key of Object.keys(idsAsc)) {
        //         firebase.decksMetaDb().doc(key).set({ids: idsAsc[key]});
        //     }
        // });
        // firebase.decks().off();
    };

    React.useEffect(() => {
        // const start = new Date();
        // firebase.decks().on('value', snapshot => {
        //     const rawDecks = snapshot.val();
        //     const decks = Object.entries(snapshot.val()).map(([key, data]) => {
        //         let created = new Date(0)
        //         if (data.created && data.created.seconds) {
        //             created.setSeconds(data.created.seconds)
        //         } else {
        //             created = new Date(data.created)
        //         }
        //         return {...data, id: key, lastModified: created }
        //     });
        //     const decksByDateDesc = decks.filter(deck => deck.id !== "undefined").sort((a, b) => b.lastModified - a.lastModified); // filter(d => d.id === 'undefined').
        // });
        // return () => firebase.decks().off();
    }, []);
    return (
        <div>
            <Button onClick={handleUpdateDecksMetaFirestore}>
                Update Firestore Decks Meta
            </Button>
        </div>
    );
}

export default Admin;
