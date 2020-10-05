import React, { useState, useContext, useEffect } from "react";
import { idPrefixToFaction, factions } from "../../data";
import { withStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../../firebase";
import VirtualizedDecksList from "./VirtualizedDecksList";
import FactionFilter from "./FactionFilter";
import { Helmet } from "react-helmet";
import Typography from '@material-ui/core/Typography';

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

function Decks({ classes, history, match }) {
    // const firebase = useContext(FirebaseContext)
    // const [deckIds, setDeckIds] = useState(
    //     JSON.parse(localStorage.getItem('yawudb_deck_ids')) || []
    // )
    // const [filteredDeckIds, setFilteredDeckIds] = useState(
    //     filterDeckIds(deckIds, match.params.faction)
    // )

    // const title = match.params.faction === 'all'
    //     ? 'Warhammer Underworlds Decks Database'
    //     : `${factions[idPrefixToFaction[match.params.faction]]} | Decks | Warhammer Underworlds`

    // const ogImage = match.params.faction === 'all'
    //     ? `https://yawudb.com/yawudb.png`
    //     : `https://yawudb.com/assets/icons/${idPrefixToFaction[match.params.faction]}-deck.png`

    // const description = match.params.faction === 'all'
    //     ? `Browse ${filteredDeckIds.length} decks and get inspired to build your next Grand Clash winning deck!`
    //     : `Browse ${filteredDeckIds.length} decks and get inspired to build your next Grand Clash winning ${factions[idPrefixToFaction[match.params.faction]]} deck!`

    // //const list = JSON.parse(deckIds);

    // const handleSelect = prefix => () => {
    //     history.replace(
    //         `/decks/${prefix === match.params.faction ? 'all' : prefix}`
    //     )
    // }

    // useEffect(() => {
    //     firebase.decksMetaDb().doc('all').get().then(doc => {
    //         if(doc.exists) {
    //             const ids = doc.data().ids.reverse();
    //             setDeckIds(ids);
    //             localStorage.setItem(
    //                 'yawudb_deck_ids',
    //                 JSON.stringify(ids)
    //             )
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     setFilteredDeckIds(filterDeckIds(deckIds, match.params.faction))
    // }, [match.params.faction, deckIds])

    return (
        <React.Fragment>
            {/* <Helmet>
                <title>
                    {title}
                </title>
                <link rel="canonical" href="https://yawudb.com/deck/create" />
                <meta property="og:image" content={ogImage} />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="https://yawudb.com/deck/create" />
                <meta property="og:description" content={description} />
                <meta
                        name="description"
                        content={description}
                    />
            </Helmet>

            <div className={classes.root}>
                <div className={classes.filterContainer}>
                    <FactionFilter
                        selectedFaction={match.params.faction}
                        onSelect={handleSelect}
                    />
                </div>
                <div
                    id="yawudb_decks_container"
                    className={classes.decksContainer}
                >
                    <VirtualizedDecksList source={filteredDeckIds} />
                </div>
            </div> */}
            <div className={classes.root}>
                <div>
                    <Typography variant="h4">
                        Oh Nooo! Seems like this page has being swallowed by a
                        Lethal Hex.
                    </Typography>
                    <Typography>
                        Let's hope we will see it again one day...
                    </Typography>
                    <img
                        src="/assets/icons/lethal.png"
                        style={{
                            display: "block",
                            margin: "auto",
                            filter: "drop-shadow(0 0 10px red)",
                        }}
                    />
                </div>
                {/* <Typography className={classes.info}>
                <span className={classes.strongEmphasis}>Note:</span> 
                Decks you see below has quick access only from this browser, because your presence is Anonymous. 
                So, you would need to search for them among all decks if you open this app in another browser. 
                If you login, then all decks below will be automatically associated with your account and you could access them 
                here from any browser.
            </Typography>
            
            <Divider />

            {
                deckIds.length === 0 && (
                    <Typography className={classes.info}>Seems, you haven't made any decks yet.</Typography>
                )
            }
            {
                deckIds.length > 0 && (
                    deckIds.map((id, index) => <FluidDeckThumbnail key={index} deckId={id} deck={decks[id]} canUpdateOrDelete />)
                )
            } */}
            </div>
        </React.Fragment>
    );
}

const styles = (theme) => ({
    root: {
        height: "100%",
        width: "100%",
        display: "grid",
        placeContent: 'center',
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
