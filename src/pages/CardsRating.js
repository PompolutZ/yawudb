import React, { useState } from "react";
import { FirebaseContext } from "../firebase";
import Button from "@material-ui/core/Button";
import Progress from "@material-ui/core/CircularProgress";
import { firstUniversalCardPerWave } from "../data";
import {
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    getCardById,
    RELIC_FORMAT,
    validateDeckForPlayFormat,
    wucards,
} from "../data/wudb";

function CardsRating(props) {
    const firebase = React.useContext(FirebaseContext);
    const [data, setData] = React.useState(null);
    const [, setPrintData] = React.useState({});
    const [updated, setUpdated] = React.useState(false);
    const [pubLog, setPubLog] = useState(undefined);
    const [decksToDelete, setDecksToDelete] = useState([]);

    React.useEffect(() => {
        if (!props.match.params.faction) return;

        firebase.realdb
            .ref(`/cards_ranks/${props.match.params.faction}`)
            .once("value")
            .then((s) => setPrintData(s.val()));
    }, [props.match.params]);

    React.useEffect(() => {
        firebase
            .decks()
            .once("value")
            .then((snap) => {
                const data = Object.entries(snap.val());
                const fixedDate = data.map(([id, value]) => {
                    let lastModified = new Date(0);
                    if (value.created && value.created.seconds) {
                        lastModified.setSeconds(value.created.seconds);
                    } else {
                        lastModified = new Date(value.created);
                    }

                    return [id, { ...value, lastModified: lastModified }];
                });

                //const filteredByDate = fixedDate.filter(([id, value]) => value.lastModified > new Date(2019, 6, 23));
                const groupedByFactions = fixedDate.reduce(
                    (acc, [id, value]) => {
                        if (id === "undefined" || (!value.cards && !value.deck)) return acc;

                        const updated = { ...value };
                        if (value.deck) {
                            updated.cards = value.deck
                                .split(",")
                                .map((s) => s.padStart(5, "0"));
                        }

                        if (typeof value.sets === "string") {
                            updated.sets = value.sets.split(",");
                        }

                        if (value.updatedutc) {
                            updated.lastModified = new Date(value.updatedutc)
                        }

                        const factionPrefix = id.split("-")[0];
                        const decks = acc[factionPrefix]
                            ? [...acc[factionPrefix], updated]
                            : [updated];

                        return { ...acc, [factionPrefix]: decks };
                    },
                    {}
                );

                const factionsWithMaxSetsCount = Object.entries(
                    groupedByFactions
                ).reduce((acc, [prefix, value]) => {
                    return {
                        ...acc,
                        [prefix]: {
                            data: value,
                            maxSets: Math.max(
                                ...value.map((x) => x.sets ? x.sets.length : 0)
                            ),
                        },
                    };
                }, {});

                const baseDate = new Date(2017, 9, 21);

                const cardRankingsPerFaction = Object.entries(
                    factionsWithMaxSetsCount
                ).reduce((factionsAcc, [faction, { data, maxSets }]) => {
                    const factionSummary = data.reduce((decksAcc, deck) => {
                        const ratings = deck.cards.reduce((acc, card) => {
                            return {
                                ...acc,
                                [card]:
                                    ((deck.lastModified - baseDate) /
                                        (new Date() - baseDate)) *
                                    (deck.sets.length / maxSets),
                            };
                        }, {});

                        for (let [id, rating] of Object.entries(ratings)) {
                            if (decksAcc[id]) {
                                decksAcc[id] = decksAcc[id] + rating;
                            } else {
                                decksAcc[id] = rating;
                            }
                        }

                        return decksAcc;
                    }, {});

                    const maxRating = Math.max(
                        ...Object.values(factionSummary)
                    );

                    const normalizedRatings = Object.entries(
                        factionSummary
                    ).reduce((acc, [card, rating]) => {
                        return {
                            ...acc,
                            [card]: Math.round(
                                Math.round((rating / maxRating) * 100) / 10
                            ),
                        };
                    }, {});

                    return {
                        ...factionsAcc,
                        [faction]: {
                            ...normalizedRatings,
                            maxRating: maxRating,
                        },
                    };
                }, {});

                const allMaxSetsCount = fixedDate.reduce((acc, [id, value]) => {
                    if (id === "undefined" || !value.cards) return acc;

                    return Math.max(acc, value.sets.length);
                }, 0);

                const genericRatings = fixedDate.reduce((acc, [id, deck]) => {
                    if (id === "undefined" || !deck.cards) return acc;

                    const ratings = deck.cards
                        .map((cardId) => wucards[Number(cardId)])
                        .filter((card) => {
                            // here we find wave first then filter out non-universal cards
                            return card.factionId > 1;
                        })
                        .reduce((acc, card) => {
                            return {
                                ...acc,
                                [card.id]:
                                    ((deck.lastModified - baseDate) /
                                        (new Date() - baseDate)) *
                                    (deck.sets.length / allMaxSetsCount),
                            };
                        }, {});

                    for (let [id, rating] of Object.entries(ratings)) {
                        if (acc[id]) {
                            acc[id] = acc[id] + rating;
                        } else {
                            acc[id] = rating;
                        }
                    }

                    return acc;
                }, {});

                const maxGenericRank = Math.max(
                    ...Object.values(genericRatings)
                );

                const normalizedGenericRanks = Object.entries(
                    genericRatings
                ).reduce((acc, [card, rating]) => {
                    return {
                        ...acc,
                        [card]: Math.round(
                            Math.round((rating / maxGenericRank) * 100) / 10
                        ),
                    };
                }, {});

                console.log("DONE", cardRankingsPerFaction, {
                    u: normalizedGenericRanks,
                });
                setData({
                    ...cardRankingsPerFaction,
                    u: normalizedGenericRanks,
                    universal: normalizedGenericRanks,
                });
            });
    }, []);

    React.useEffect(() => {
        firebase.realdb
            .ref("/decks")
            .once("value")
            .then((s) => {
                let allPublicDecks = Object.entries(s.val())
                    .filter(([, info]) => !info.private)
                    .map(([id, deck]) => {
                        let updatedDeck = { ...deck, id };
                        if (!deck.deck && deck.cards) {
                            updatedDeck.deck = deck.cards
                                .map((card) => Number(card))
                                .join(",");
                        }

                        if (!deck.createdutc) {
                            if (typeof deck.created === "string") {
                                updatedDeck.createdutc = new Date(
                                    deck.created
                                ).getTime();
                                updatedDeck.updatedutc = new Date(
                                    deck.created
                                ).getTime();
                            } else {
                                let timestamp = new Date(0);
                                timestamp.setSeconds(deck.created.seconds);

                                updatedDeck.createdutc = timestamp.getTime();
                                updatedDeck.updatedutc = timestamp.getTime();
                            }
                        }

                        let cards = updatedDeck.deck
                            .split(",")
                            .map(getCardById);
                        let [isRelicValid, issues] = validateDeckForPlayFormat(
                            {
                                objectives: cards.filter(checkCardIsObjective),
                                gambits: cards.filter(checkCardIsPloy),
                                upgrades: cards.filter(checkCardIsUpgrade),
                            },
                            RELIC_FORMAT
                        );

                        updatedDeck.isRelicValid = isRelicValid;
                        updatedDeck.issues = issues;

                        return updatedDeck;
                    });
                let relicValidOnly = allPublicDecks.filter(
                    (deck) => deck.isRelicValid
                );
                let unique = relicValidOnly.reduce(
                    (unique, deck) => ({
                        ...unique,
                        [deck.deck]: deck,
                    }),
                    {}
                );

                const uniqueKeys = Object.values(unique).map((x) => x.id);

                const decksToDelete = allPublicDecks.filter(
                    (deck) =>
                        !uniqueKeys.includes(deck.id) &&
                        deck.author === "Anonymous"
                );

                setDecksToDelete(decksToDelete.map(({ id }) => id));

                const descending = Object.values(unique).sort(
                    (x, y) => y.updatedutc - x.updatedutc
                );
                const initPubLog = descending.reduce((log, deck) => {
                    return {
                        ...log,
                        [deck.updatedutc]: { id: deck.id, action: "SHARED" },
                    };
                }, {});

                setPubLog(initPubLog);
            });
    }, [firebase]);

    const handleUpdateClick = () => {
        firebase.realdb
            .ref("/cards_ranks")
            .set(data)
            .then(() => setUpdated(true))
            .catch((e) => console.error(e));
    };

    const handleUpdatePubLog = () => {
        firebase.realdb
            .ref("/public_decks_log")
            .set(pubLog)
            .then(() => console.log("Updated Pub Log"))
            .catch((e) => console.error(e));
    };

    const handleDeleteDeadDecks = () => {
        for (let id of decksToDelete) {
            firebase.realdb.ref(`/decks/${id}`).remove();
        }
    };

    return (
        <div>
            Card Rating
            {!data && <Progress />}
            <Button
                onClick={handleUpdateClick}
                disabled={!data}
                style={{ color: updated ? "green" : "black" }}
            >
                Update Ranking
            </Button>
            <div>
                {/* {decksError && <pre>{JSON.stringify(decksError)}</pre>} */}
            </div>
            <Button onClick={handleUpdatePubLog}>Update PubLog</Button>
            <Button onClick={handleDeleteDeadDecks}>
                Delete {decksToDelete.length} no-valid decks
            </Button>
        </div>
    );
}

export default CardsRating;
