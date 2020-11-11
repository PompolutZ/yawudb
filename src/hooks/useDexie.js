import Dexie from "dexie";
import relationships from "dexie-relationships";
import React, { useState, useEffect } from 'react';

export default function useDexie(name) {
    const db = new Dexie(name, { addons: [relationships] });
    db.version(10).stores({
        // maybe to consider making restriction as a keyword,
        // maybe use more keywords?..
        revision: "++id,revision",
        factions: "id,abbr,name,displayName",
        sets: "id,name,displayName,released",
        cards:
            "id,name,factionId -> factions.id,type,setId -> sets.id,[factionId+setId],rule,glory,scoreType,status,rotated,duplicates",
        cardsRanks:
            "id,factionId -> factions.id, cardId -> cards.id, [factionId+cardId], rank",
    });

    return {
        revision: db.revision,
        cards: db.cards,
        factions: db.factions,
        sets: db.sets,
        cardsRanks: db.cardsRanks,
    };
}

export function useSets(above) {
    const [selectedSets, setSelectedSets] = useState([]);
    const { sets } = useDexie('wudb');

    useEffect(() => {
        sets.where("id")
            .above(above)
            .toArray()
            .then((sets) => setSelectedSets(sets));
    }, []);

    return [selectedSets, setSelectedSets];
}

export function useCards(selectedFaction, selectedFormat, selectedSets) {
    const { cards, factions, cardsRanks } = useDexie("wudb");
    const [loadedCards, setLoadedCards] = useState([]);

    useEffect(() => {
        factions
            .where("name")
            .equals(selectedFaction)
            .first()
            .then((faction) => {
                return cards
                    .where("[factionId+setId]")
                    .anyOf(
                        selectedSets.flatMap((s) =>
                            [faction.id, 1].map((fid) => [fid, s.id])
                        )
                    )
                    .with({ set: "setId", faction: "factionId" });
            })
            .then((cards) => {
                return Promise.all(
                    cards.map(async (card) => {
                        let rank = await cardsRanks
                            .where("[factionId+cardId]")
                            .equals([card.factionId, card.id])
                            .first();
                        return {
                            ...card,
                            set: card.set,
                            faction: card.faction,
                            rank,
                        };
                    })
                );
            })
            .then((cards) => {
                setLoadedCards(cards);
            })
            .catch((e) => console.error(e));
    }, [selectedFaction, selectedFormat, selectedSets.length]);

    return loadedCards;
}
