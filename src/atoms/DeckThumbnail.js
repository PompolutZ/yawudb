import React, { useState, useEffect } from "react";
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
import { checkDeckValidFormats } from "../utils/functions";
import PlayFormatsValidity from "./PlayFormatsValidity";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        margin: "0 0 .5rem 0",
        padding: ".3rem",
        pointer: "cursor",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "30rem",
        },
    },
});

const initialScoringOverview = {
    glory: 0,
    summary: [0, 0, 0, 0],
};

function DeckThumbnail({
    classes,
    history,
    deckId,
    deck,
    isDraft,
    canUpdateOrDelete,
    style,
}) {
    const [cards, setCards] = useState([]);
    const [banned, setBannedCount] = useState(0);
    const [restricted, setRestrictedCount] = useState(0);
    const [scoringOverview, setScoringOverview] = useState(initialScoringOverview);
    const [data, setData] = React.useState(deck);

    useEffect(() => {
        setCards(deck && deck.cards && deck.cards.map(cardId => cardsDb[cardId]));
        setBannedCount(
        deck &&
        deck.cards &&
        deck.cards.filter((c) => Boolean(bannedCards[c])).length);

    setRestrictedCount(deck &&
        deck.cards &&
        deck.cards.filter((c) => Boolean(restrictedCards[c])).length);

    }, [deck]);

    useEffect(() => {
        setScoringOverview(cards
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
            ));
    }, [cards]);

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
        </div>
    );
}

export default withRouter(withStyles(styles)(DeckThumbnail));
