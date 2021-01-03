import React, { useContext, useEffect, useMemo, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import MyDecksAuth from "./MyDecksAuth";
import MyDecksAnon from "./MyDecksAnon";
import { FirebaseContext } from "../../firebase";
import { Link } from "react-router-dom";
import FactionDeckPicture from "../../v2/components/FactionDeckPicture";
import { VIEW_DECK } from "../../constants/routes";
import {
    checkCardIsObjective,
    getCardById,
    getFactionByAbbr,
} from "../../data/wudb";
import { ReactComponent as TrashIcon } from "../../svgs/trash.svg";
import ScoringOverview from "../../atoms/ScoringOverview";
import SetsList from "../../atoms/SetsList";
import DeleteConfirmationDialog from "../../atoms/DeleteConfirmationDialog";

function DeckLink({ onDelete, ...props }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cards = props.cards.map((x) => getCardById(x));
        console.log(cards);
        setCards(cards);
    }, [props.cards]);

    const totalGlory = useMemo(
        () =>
            cards
                .filter(checkCardIsObjective)
                .reduce((total, { glory }) => (total += glory), 0),
        [cards]
    );

    const objectiveSummary = useMemo(
        () =>
            cards.filter(checkCardIsObjective).reduce(
                (acc, c) => {
                    acc[c.scoreType] += 1;
                    return acc;
                },
                { Surge: 0, End: 0, Third: 0 }
            ),
        [cards]
    );

    return (
        <div className="flex items-center border-t border-gray-500 lg:w-1/3 lg:mx-auto my-2 py-2">
            <FactionDeckPicture faction={props.faction} size="w-12 h-12" />
            <div className="flex-1 pl-2">
                <Link
                    className="text-xl"
                    to={{
                        pathname: `${VIEW_DECK}/${props.id}`,
                        state: {
                            deck: {
                                ...props,
                            },
                            canUpdateOrDelete: true,
                        },
                    }}
                >
                    {props.name}
                </Link>
                <div>
                    <h3 className="text-sm font-bold text-gray-700">{new Date(props.updatedutc).toLocaleDateString()}</h3>
                    <SetsList sets={props.sets} />
                    <ScoringOverview
                        summary={objectiveSummary}
                        glory={totalGlory}
                    />
                </div>
            </div>
            <div className="pl-2">
                <button className="btn btn-red" onClick={onDelete(props.id)}>
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
}

function MyDecksPage() {
    const [loading, setLoading] = useState(false);
    const [decks, setDecks] = useState([]);
    const authUser = useAuthUser();
    const firebase = useContext(FirebaseContext);
    const [confirmDeleteDeckId, setConfirmDeleteDeckId] = useState(undefined);

    useEffect(() => {
        if (!authUser) return;

        setLoading(true);

        firebase.realdb
            .ref("/decks")
            .orderByChild("author")
            .equalTo(authUser.uid)
            .once("value")
            .then((snapshot) => {
                setLoading(false);
                let decks = Object.entries(
                    snapshot.val()
                ).map(([id, data]) => ({ ...data, id }));
                let updatedDecks = decks.map((deck) => {
                    const updatedDeck = { ...deck };
                    if (typeof updatedDeck.sets === "string") {
                        updatedDeck.sets = updatedDeck.sets.split(",");
                    } else {
                        // previously set indexes started from 0
                        updatedDeck.sets = deck.sets.map((s) => s + 1);
                    }

                    if (!deck.faction) {
                        updatedDeck.faction = getFactionByAbbr(
                            deck.id.split("-")[0]
                        ).name;
                    }

                    if (typeof deck.deck === "string") {
                        updatedDeck.cards = deck.deck
                            .split(",")
                            .map((x) => x.padStart(5, "0"));
                    }

                    if(!deck.updatedutc) {
                        if(typeof deck.created === 'string') {
                            deck.updatedutc = new Date(deck.created).getTime();
                        } else {
                            let date = new Date(0);
                            date.setSeconds(date.created.seconds);
                            deck.updatedutc = date.getTime();
                        }
                    }

                    return updatedDeck;
                });
                setDecks(updatedDecks);
                console.log(snapshot.val());
            });
    }, [firebase, authUser]);

    const handleCloseDeleteDialog = () => {
        setConfirmDeleteDeckId(null);
    };

    const handleDeleteDeckId = (deckId) => () => {
        setConfirmDeleteDeckId(deckId);
    };

    const handleDeleteDeck = async () => {
        await firebase.realdb.ref(`/decks/${confirmDeleteDeckId}`).remove();
        setDecks((prev) =>
            prev.filter((deck) => deck.id !== confirmDeleteDeckId)
        );
        setConfirmDeleteDeckId(null);
    };

    return (
        <div className="flex-1 p-4">
            {loading && <span>Loading...</span>}
            {decks.sort((x,y) => y.updatedutc - x.updatedutc).map((deck) => (
                <DeckLink
                    key={deck.id}
                    onDelete={handleDeleteDeckId}
                    {...deck}
                />
            ))}

            <DeleteConfirmationDialog
                title="Delete deck"
                description={`Are you sure you want to delete deck: '${
                    decks.find((deck) => deck.id === confirmDeleteDeckId)?.name
                }'`}
                open={!!confirmDeleteDeckId}
                onCloseDialog={handleCloseDeleteDialog}
                onDeleteConfirmed={handleDeleteDeck}
                onDeleteRejected={handleCloseDeleteDialog}
            />
        </div>
    );
}

export default MyDecksPage;
