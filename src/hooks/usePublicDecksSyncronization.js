import { useContext, useEffect } from "react";
import { getFactionByAbbr } from "../data/wudb";
import { FirebaseContext } from "../firebase";
import useDexie from "./useDexie";
import useStateWithLocalStorage from "./useStateWithLocalStorage";

export default function usePublicDecksSyncronization() {
    const [lastLogTimestamp, setLastLogTimestamp] = useStateWithLocalStorage("wunderworlds_lastpublog", undefined);
    const db = useDexie("wudb");
    const firebase = useContext(FirebaseContext);
    
    useEffect(() => {
        const ref = lastLogTimestamp ? firebase.realdb.ref("/public_decks_log").orderByKey().startAt(lastLogTimestamp) : firebase.realdb.ref("/public_decks_log").orderByKey();
        const log = ref.once("value").then(snapshot => {
            if(!snapshot.val()) return;

            const flattened = Object.entries(snapshot.val())
                .map(([timestamp, value]) => ({ ...value, timestamp: Number(timestamp) }))
                .sort((x, y) => x.timestamp - y.timestamp);
            console.log(flattened);   
            
            flattened.forEach(async log => {
                switch(log.action) {
                    case "SHARED": {
                        let deckSnapshot = await firebase.realdb.ref(`/decks/${log.id}`).once("value");
                        let deck = deckSnapshot.val();
                        // ==== THIS IS HOW NEWLY FORMATTED DECK LOOKS LIKE

                        // author: "TVhQSZ7NkeRUOoha3O47udYAM9z2"
                        // authorDisplayName: "PompolutZ"
                        // createdutc: 1609671745853
                        // deck: "9035,9039,9036,6263,6301,9041,9042,6281,7001,9287,9326,6262,9051,6328,9053,9046,9405,6362,6363,6370,7014,9363,9060,9062,9063,9478,6404,8023,9058,6398,8039,9055"
                        // faction: "dread-pageant"
                        // name: "Test new deck builder"
                        // sets: "30,26,27,23,28,25,24,22,29,21"
                        // updatedutc: 1609671745853
                        // ================
                        let updatedDeck = { ...deck, id: log.id };
                        if (typeof deck.sets !== "string") {
                            updatedDeck.sets = deck.sets.join(",");
                        }

                        if (!deck.deck && deck.cards) {
                            updatedDeck.deck = deck.cards.map(card => Number(card)).join(",")
                            delete updatedDeck.cards;
                        }

                        if (!deck.faction) {
                            updatedDeck.faction = getFactionByAbbr(
                                log.id.split("-")[0]
                            ).name;
                        }

                        if (!deck.createdutc) {
                            if(typeof deck.created === "string") {
                                updatedDeck.createdutc = new Date(deck.created).getTime();
                                updatedDeck.updatedutc = new Date(deck.created).getTime();
                            } else {
                                let timestamp = new Date(0);
                                timestamp.setSeconds(deck.created.seconds);

                                updatedDeck.createdutc = timestamp.getTime();
                                updatedDeck.updatedutc = timestamp.getTime();
                            }

                            delete updatedDeck.created;
                        }

                        delete updatedDeck.desc;
                        delete updatedDeck.scoringSummary;
                        // ==== THIS IS HOW OLD FORMATTED DECK LOOKS LIKE
                        // author: "Anonymous"
                        // authorDisplayName: "Anonymous"
                        // cards: (32) ["06281", "06271", "04050", "06350", "03282", "06274", "07022", "06363", "06374", "03493", "06353", "06375", "03274", "04055", "03342", "03265", "06301", "06279", "08028", "03365", "06412", "03266", "08029", "03388", "06358", "07018", "03499", "03302", "01389", "03557", "06309", "03319"]
                        // created: "Thu Oct 01 2020 20:22:22 GMT+0100 (British Summer Time)"
                        // desc: ""
                        // id: "yg-5fe6064b64ee"
                        // name: "Ylthari’s Guardians Deck"
                        // private: false
                        // scoringSummary: (4) [0, 0, 0, 0]
                        // sets: (15) [0, 9, 10, 14, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28]
                        // source: ""       
                        // ================                 
                        let result = await db.publicDecks.put(updatedDeck);
                        console.log(result);
                    }
                }
            })

            const [{ timestamp }] = flattened.slice(-1);
            setLastLogTimestamp(`${timestamp}`);
        })
    }, [db, firebase])

}