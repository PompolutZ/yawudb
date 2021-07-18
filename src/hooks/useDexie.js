import Dexie from "dexie";
import relationships from "dexie-relationships";
import { useState } from "react";

export default function useDexie(name) {
    const [db] = useState(() => {
        const dexie = new Dexie(name, { addons: [relationships] });
        dexie.version(2).stores({
            // maybe to consider making restriction as a keyword,
            // maybe use more keywords?..
            // revision: "++id,revision",
            // factions: "id,abbr,name,displayName",
            // sets: "id,name,displayName,released",
            // cards:
            //     "id,name,factionId -> factions.id,type,setId -> sets.id,[factionId+setId],rule,glory,scoreType,status,rotated,duplicates",
            // cardsRanks:
            //     "id,factionId -> factions.id, cardId -> cards.id, [factionId+cardId], rank",
            publicDecks: "id,author,authorDisplayName,createdutc,deck,faction,name,sets,updatedutc",
            anonDecks: "++id,deckId,createdutc,deck,faction,name,private,sets,updatedutc",
        });

        return dexie;
    })

    return db;
}

// export function useSets(above) {
//     const [selectedSets, setSelectedSets] = useState([]);
//     const { sets } = useDexie('wudb');

//     useEffect(() => {
//         sets.where("id")
//             .above(above)
//             .toArray()
//             .then((sets) => setSelectedSets(sets));
//     }, []);

//     return [selectedSets, setSelectedSets];
// }

// export function useCards(selectedFaction, selectedFormat, selectedSets) {
//     const { cards, factions, cardsRanks } = useDexie("wudb");
//     const [loadedCards, setLoadedCards] = useState([]);

//     useEffect(() => {
//         factions
//             .where("name")
//             .equals(selectedFaction)
//             .first()
//             .then((faction) => {
//                 return cards
//                     .where("[factionId+setId]")
//                     .anyOf(
//                         selectedSets.flatMap((s) =>
//                             [faction.id, 1].map((fid) => [fid, s.id])
//                         )
//                     )
//                     .with({ set: "setId", faction: "factionId" });
//             })
//             .then((cards) => {
//                 return Promise.all(
//                     cards.map(async (card) => {
//                         let rank = await cardsRanks
//                             .where("[factionId+cardId]")
//                             .equals([card.factionId, card.id])
//                             .first();
//                         return {
//                             ...card,
//                             set: card.set,
//                             faction: card.faction,
//                             rank,
//                         };
//                     })
//                 );
//             })
//             .then((cards) => {
//                 setLoadedCards(cards);
//             })
//             .catch((e) => console.error(e));
//     }, [selectedFaction, selectedFormat, selectedSets.length]);

//     return loadedCards;
// }
