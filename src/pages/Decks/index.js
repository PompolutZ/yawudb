import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import VirtualizedDecksList from "./VirtualizedDecksList";
import useDexie from "../../hooks/useDexie";
import useStateWithLocalStorage from "../../hooks/useStateWithLocalStorage";
import { useParams } from "react-router-dom";
import { getFactionByAbbr } from "../../data/wudb";

export default function Deck(){
    const { faction: fabbr } = useParams();
    const [decks, setDecks] = useState([]);
    const [lastLogTimestamp] = useStateWithLocalStorage("wunderworlds_lastpublog", undefined);

    const db = useDexie("wudb");
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        console.log(fabbr);
        if(fabbr !== 'all') {
            const { name } = getFactionByAbbr(fabbr);
            db.publicDecks.where("faction").equalsIgnoreCase(name).toArray()
            .then(r => {
                const factionDecks = r.map(deck => {
                    return {
                        ...deck,
                        cards: deck.deck
                                .split(",")
                                .map((x) => x.padStart(5, "0")),
                        sets: deck.sets.split(","),
                    }
                }).sort((x, y) => y.updatedutc - x.updatedutc);
                setDecks(factionDecks);
            });
        } else {
            db.publicDecks.orderBy("updatedutc").reverse().toArray().then(ds => {
                const fixedDecks = ds.map(deck => {
                    return {
                        ...deck,
                        cards: deck.deck
                                .split(",")
                                .map((x) => x.padStart(5, "0")),
                        sets: deck.sets.split(","),
                    }
                })
    
                setDecks(fixedDecks);
            })
        }
    }, [firebase, db.publicDecks, lastLogTimestamp, fabbr])

    return (
        <div className="flex-1">
            {decks.length === 0 && (
                <div className="w-full h-full grid place-content-center">
                    <h1 className="text-gray-900 text-2xl">There no public decks for {getFactionByAbbr(fabbr)?.displayName}</h1>
                </div>
            )}
            <VirtualizedDecksList source={decks} />
        </div>
    )
}
