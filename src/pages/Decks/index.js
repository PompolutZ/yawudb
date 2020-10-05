import React, { useState, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { idPrefixToFaction, factions, factionIndexes } from "../../data";
import { withStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../../firebase";
import VirtualizedDecksList from "./VirtualizedDecksList";
import FactionFilter from "./FactionFilter";
import { Helmet } from "react-helmet";

const filterDeckIds = (deckIds, faction) => () =>
    deckIds.filter((id) => {
        if (!id) return false;

        switch (faction) {
            case "all":
                return true;
            default:
                return id.startsWith(faction);
        }
    });

const useFixedBounds = () => {
    const [style, setStyle] = useState({});
    const parentRef = useRef(null);

    useLayoutEffect(() => {
        const bounds = parentRef.current?.getBoundingClientRect();
        setStyle({
            width: bounds?.width,
            height: bounds?.height,
            top: bounds?.y,
            left: bounds?.x,
        });
    }, []);

    return [style, parentRef];
}

function Decks({ classes, history, match }) {
    const firebase = useContext(FirebaseContext);
    const [decks, setDecks] = useState([]);
    const [fixedStyle, fixContainerRef] = useFixedBounds();

    const title =
        match.params.faction === "all"
            ? "Warhammer Underworlds Decks Database"
            : `${
                  factions[idPrefixToFaction[match.params.faction]]
              } | Decks | Warhammer Underworlds`;

    const ogImage =
        match.params.faction === "all"
            ? `https://yawudb.com/yawudb.png`
            : `https://yawudb.com/assets/icons/${
                  idPrefixToFaction[match.params.faction]
              }-deck.png`;

    useEffect(() => {
        firebase.realdb
            .ref("public_decks/all/")
            .orderByChild("modified")
            .limitToLast(50)
            .once("value")
            .then((s) => {
                setDecks(Object.entries(s.val()));
            });
    }, [match.params, firebase]);

    // const description = match.params.faction === 'all'
    //     ? `Browse ${filteredDeckIds.length} decks and get inspired to build your next Grand Clash winning deck!`
    //     : `Browse ${filteredDeckIds.length} decks and get inspired to build your next Grand Clash winning ${factions[idPrefixToFaction[match.params.faction]]} deck!`

    //const list = JSON.parse(deckIds);

    // const handleSelect = prefix => () => {
    //     history.replace(
    //         `/decks/${prefix === match.params.faction ? 'all' : prefix}`
    //     )
    // }
    return (
        <React.Fragment>
            <Helmet>
                <title>{title}</title>
                <link rel="canonical" href="https://yawudb.com/deck/create" />
                <meta property="og:image" content={ogImage} />
                <meta property="og:title" content={title} />
                <meta
                    property="og:url"
                    content="https://yawudb.com/deck/create"
                />
                {/* <meta property="og:description" content={description} /> */}
                {/* <meta
                        name="description"
                        content={description}
                    /> */}
            </Helmet>

            <div className="flex-grow m-4 flex bg-purple-300 h-full">
                <div ref={fixContainerRef} className="bg-orange-300 w-1/3">
                    <div className="fixed bg-red-500" style={fixedStyle}>

                    </div>                    
                </div>
                <div className="relative w-2/3 px-4">
                {decks.sort(([,ldeck], [,rdeck]) => rdeck.modified - ldeck.modified).map(([id, deck]) => (
                        <section className="mb-4 flex" key={id}>
                            <div>
                                <img className="w-12 h-12" src={`/assets/icons/${idPrefixToFaction[deck.faction]}-deck.png`} />
                            </div>
                            <div className="">
                                <div className="text-grey-900">{deck.name}</div>
                                <div className="flex">
                                    <div className="text-grey-500 text-xs mr-1 font-bold">
                                        {deck.authorDisplayName}
                                    </div>
                                    <div className="text-grey-500 text-xs">
                                        {new Date(
                                            deck.modified
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>                    
        </React.Fragment>
    );
}

const styles = (theme) => ({
    root: {
        height: "100%",
        flex: "1 0 100%",
        display: "flex",
        flexFlow: "column nowrap",
        [theme.breakpoints.up("md")]: {
            flexFlow: "row nowrap",
        },
    },

    decksContainer: {
        // height: '80%',
        // width: '100%',
        flex: "1 100%",
        [theme.breakpoints.up("md")]: {
            flex: "1 1",
        },
    },

    filterContainer: {
        //flex: '1 auto',
        [theme.breakpoints.up("md")]: {
            flex: "0 1",
        },
    },
});

export default withStyles(styles)(Decks);
