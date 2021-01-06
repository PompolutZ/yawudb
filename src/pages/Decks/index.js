import React, { useState, useContext, useEffect } from "react";
import { idPrefixToFaction, factions } from "../../data";
import { withStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../../firebase";
import VirtualizedDecksList from "./VirtualizedDecksList";
import FactionFilter from "./FactionFilter";
import { Helmet } from "react-helmet";
import useIndexDB from "../../hooks/useIndexDb";
import DecksMetaSummary from "../../molecules/DecksMetaSummary";
import useDexie from "../../hooks/useDexie";
import useStateWithLocalStorage from "../../hooks/useStateWithLocalStorage";

export default function Deck(){
    const [decks, setDecks] = useState([]);
    const [lastLogTimestamp] = useStateWithLocalStorage("wunderworlds_lastpublog", undefined);

    const db = useDexie("wudb");
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
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
    }, [firebase, db.publicDecks, lastLogTimestamp])

    return (
        <div className="flex-1">
            <VirtualizedDecksList source={decks} />
        </div>
    )
}

// const filterDeckIds = (deckIds, faction) => () =>
//     deckIds.filter((id) => {
//         if (!id) return false;

//         switch (faction) {
//             case "all":
//                 return true;
//             default:
//                 return id.startsWith(faction);
//         }
//     });

// function Decks({ classes, history, match }) {
//     const db = useIndexDB("public_decks", 1);
//     const firebase = useContext(FirebaseContext);
//     const [deckIds, setDeckIds] = useState(
//         JSON.parse(localStorage.getItem("yawudb_deck_ids")) || []
//     );
//     const [filteredDeckIds, setFilteredDeckIds] = useState(
//         filterDeckIds(deckIds, match.params.faction)
//     );

//     const title =
//         match.params.faction === "all"
//             ? "Warhammer Underworlds Decks Database"
//             : `${
//                   factions[idPrefixToFaction[match.params.faction]]
//               } | Decks | Warhammer Underworlds`;

//     const ogImage =
//         match.params.faction === "all"
//             ? `https://yawudb.com/yawudb.png`
//             : `https://yawudb.com/assets/icons/${
//                   idPrefixToFaction[match.params.faction]
//               }-deck.png`;

//     const description =
//         match.params.faction === "all"
//             ? `Browse ${filteredDeckIds.length} decks and get inspired to build your next Grand Clash winning deck!`
//             : `Browse ${
//                   filteredDeckIds.length
//               } decks and get inspired to build your next Grand Clash winning ${
//                   factions[idPrefixToFaction[match.params.faction]]
//               } deck!`;

//     //const list = JSON.parse(deckIds);

//     const handleSelect = (prefix) => () => {
//         history.replace(
//             `/decks/${prefix === match.params.faction ? "all" : prefix}`
//         );
//     };

//     useEffect(() => {
//         firebase
//             .decksMetaDb()
//             .doc("all")
//             .get()
//             .then((doc) => {
//                 if (doc.exists) {
//                     const ids = doc.data().ids.reverse();
//                     setDeckIds(ids);
//                     localStorage.setItem(
//                         "yawudb_deck_ids",
//                         JSON.stringify(ids)
//                     );
//                 }
//             });
//     }, []);

//     useEffect(() => {
//         if (!db) return;

//         db.get("all", 1).then((value) => console.log("Fetched!", value));
//     }, [db]);

//     useEffect(() => {
//         setFilteredDeckIds(filterDeckIds(deckIds, match.params.faction));
//     }, [match.params.faction, deckIds]);

//     return (
//         <React.Fragment>
//             <Helmet>
//                 <title>{title}</title>
//                 <link rel="canonical" href="https://yawudb.com/deck/create" />
//                 <meta property="og:image" content={ogImage} />
//                 <meta property="og:title" content={title} />
//                 <meta
//                     property="og:url"
//                     content="https://yawudb.com/deck/create"
//                 />
//                 <meta property="og:description" content={description} />
//                 <meta name="description" content={description} />
//             </Helmet>

//             <div className={classes.root}>
//                 <div className={classes.filterContainer}>
//                     <FactionFilter
//                         selectedFaction={match.params.faction}
//                         onSelect={handleSelect}
//                     />
//                 </div>
//                 <div
//                     id="yawudb_decks_container"
//                     className={classes.decksContainer}
//                 >
//                     <VirtualizedDecksList source={filteredDeckIds} />
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// const styles = (theme) => ({
//     root: {
//         height: "100%",
//         width: "100%",
//         display: "flex",
//         flexFlow: "column nowrap",
//         backgroundColor: "white",
//         [theme.breakpoints.up("md")]: {
//             flexFlow: "row nowrap",
//         },
//     },

//     decksContainer: {
//         // height: '80%',
//         // width: '100%',
//         flex: "1 100%",
//         [theme.breakpoints.up("md")]: {
//             flex: "1 1",
//         },
//     },

//     filterContainer: {
//         //flex: '1 auto',
//         [theme.breakpoints.up("md")]: {
//             flex: "0 1",
//         },
//     },
// });

// export default withStyles(styles)(Decks);
