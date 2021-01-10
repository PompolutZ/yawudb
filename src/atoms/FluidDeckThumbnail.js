import React from "react";
import DeckIcon from "./DeckIcon";
import DeckThumbnailHeader from "./DeckThumbnailHeader";
import {
    idPrefixToFaction,
    cardsDb,
    bannedCards,
    restrictedCards,
} from "../data";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { VIEW_DECK } from "../constants/routes";
import { FirebaseContext } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { checkDeckValidFormats } from "../utils/functions";
import PlayFormatsValidity from "./PlayFormatsValidity";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        // borderBottom: `1px solid ${theme.palette.primary.main}`,
        margin: "0 0 .5rem 0",
        padding: ".3rem",
        pointer: "cursor",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "30rem",
        },
    },
});

function FluidDeckThumbnail({
    classes,
    history,
    deckId,
    deck,
    isDraft,
    canUpdateOrDelete,
    style,
}) {
    const firebase = React.useContext(FirebaseContext);
    const [data, setData] = React.useState(deck);
    const [loading, setLoading] = React.useState(!deck);

    const cards =
        (data && data.cards && data.cards.map((cardId) => cardsDb[cardId])) ||
        [];
    const scoringOverview = cards
        .filter((c) => c.type === 0)
        .reduce(
            (acc, o) => {
                acc.summary[o.scoreType] += 1;
                acc.glory += Number(o.glory);
                return acc;
            },
            {
                glory: 0,
                summary: [0, 0, 0, 0],
            }
        );

    React.useEffect(() => {
        if (!data) {
            setLoading(true);
        }

        firebase.deck(deckId).on("value", (snapshot) => {
            const data = snapshot.val();
            setData(data);
            setLoading(false);
            const cachedDecks = JSON.parse(
                localStorage.getItem("yawudb_decks")
            );
            localStorage.setItem(
                "yawudb_decks",
                JSON.stringify({ ...cachedDecks, [deckId]: data })
            );
        });

        return () => firebase.deck(deckId).off();
    }, [firebase, deckId]);

    React.useEffect(() => {
        setData(deck);
    }, [deck]);

    const banned =
        data &&
        data.cards &&
        data.cards.filter((c) => Boolean(bannedCards[c])).length;

    const restricted =
        data &&
        data.cards &&
        data.cards.filter((c) => Boolean(restrictedCards[c])).length;

    const handleClick = () =>
        history.push(`${VIEW_DECK}/${deckId}`, {
            deck: deck,
            canUpdateOrDelete: canUpdateOrDelete,
        });

    return (
        <div
            className={classes.root}
            onClick={handleClick}
            style={{ ...style }}
        >
            {loading && (
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                    }}
                >
                    <DeckIcon
                        width="3rem"
                        height="3rem"
                        faction={idPrefixToFaction[deckId.split("-")[0]]}
                        style={{ cursor: "pointer" }}
                    />
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                        }}
                    >
                        <CircularProgress style={{ margin: "auto" }} />
                    </div>
                </div>
            )}
            {!loading && Boolean(data) && (
                <React.Fragment>
                    <div
                        style={{
                            margin: "auto 0",
                            position: "relative",
                            display: "flex",
                            flexFlow: "column nowrap",
                            alignItems: "center",
                        }}
                    >
                        <DeckIcon
                            width="3rem"
                            height="3rem"
                            faction={idPrefixToFaction[deckId.split("-")[0]]}
                            style={{ cursor: "pointer" }}
                        />
                        <PlayFormatsValidity
                            validFormats={checkDeckValidFormats(
                                data ? data.cards : []
                            )}
                        />
                    </div>
                    <DeckThumbnailHeader
                        title={data.name}
                        author={data.authorDisplayName}
                        date={data.created}
                        sets={data.sets}
                        scoringOverview={scoringOverview}
                        banned={banned}
                        restricted={restricted}
                        isDraft={isDraft}
                    />
                </React.Fragment>
            )}
            {/*  */}
        </div>
    );
}

export default withRouter(withStyles(styles)(FluidDeckThumbnail));
