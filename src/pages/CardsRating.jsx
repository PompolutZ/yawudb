import React from "react";
import { FirebaseContext } from "../firebase";
import { getFactionByAbbr, wucards } from "../data/wudb";
import axios from "axios";

function CardsRating(props) {
    const firebase = React.useContext(FirebaseContext);
    const [data, setData] = React.useState(null);
    const [, setPrintData] = React.useState({});
    const [updated, setUpdated] = React.useState(false);

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
                        if (id === "undefined" || (!value.cards && !value.deck))
                            return acc;

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
                            updated.lastModified = new Date(value.updatedutc);
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
                                ...value.map((x) =>
                                    x.sets ? x.sets.length : 0
                                )
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

                const withFullFunctionNames = Object.entries(
                    cardRankingsPerFaction
                ).map(([abbr, values]) => {
                    const faction = getFactionByAbbr(abbr);
                    return {
                        faction: faction.name,
                        weights: values,
                    };
                });

                console.log("DONE", [
                    {
                        faction: "universal",
                        weights: normalizedGenericRanks,
                    },
                    ...withFullFunctionNames,
                ]);

                setData([
                    {
                        faction: "universal",
                        weights: normalizedGenericRanks,
                    },
                    ...withFullFunctionNames,
                ]);
            });
    }, []);

    const handleUpdateClick = () => {
        firebase
            .getTokenId()
            .then((token) => {
                return Promise.all(
                    data.map(({ faction, weights }) => {
                        axios.put(
                            `http://localhost:4242/api/v1/cards-ratings/${faction}`,
                            { faction, weights },
                            {
                                headers: {
                                    authtoken: token,
                                },
                            }
                        );
                    })
                );
            })
            .then((r) => console.log(r));
    };

    return (
        <div>
            Card Rating
            {!data && <div>Uploading...</div>}
            <button
                onClick={handleUpdateClick}
                disabled={!data}
                style={{ color: updated ? "green" : "black" }}
            >
                Update Ranking
            </button>
        </div>
    );
}

export default CardsRating;
