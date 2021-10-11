import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import FactionDeckPicture from "../../v2/components/FactionDeckPicture";
import { VIEW_DECK } from "../../constants/routes";
import { checkCardIsObjective, getCardById } from "../../data/wudb";
import { ReactComponent as TrashIcon } from "../../svgs/trash.svg";
import ScoringOverview from "../../atoms/ScoringOverview";
import SetsList from "../../atoms/SetsList";
import DeleteConfirmationDialog from "../../atoms/DeleteConfirmationDialog";
import { fetchUserDecks } from "../../hooks/wunderworldsAPIHooks";
import useAuthUser from "../../hooks/useAuthUser";
import useDexie from "../../hooks/useDexie";
import { useDeleteUserDeckFactory } from "../../hooks/useDeleteUserDeckFactory";
import { useSaveDeckFactory } from "../../hooks/useSaveDeckFactory";
import Firebase from "../../firebase";
import { PeopleIcon } from "../../v2/components/Icons";

function DeckLink({ onDelete, ...props }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cards = props.cards.map((x) => getCardById(x));
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
                <div className="space-y-2">
                    <div className="flex">
                        <h3 className="text-sm font-bold text-gray-700">
                            {new Date(props.updatedutc).toLocaleDateString()}
                        </h3>
                        {!props.private && (
                            <div className="flex items-center text-purple-700 uppercase text-xs pl-2 font-bold space-x-2">
                                <PeopleIcon className="w-4 h-4 stroke-current" />
                                public
                            </div>
                        )}
                    </div>
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

function useUserDecksLoader() {
    const db = useDexie("wudb");
    const user = useAuthUser();
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [decks, setDecks] = useState([]);
    const fetchAsync = useCallback(async () => {
        setLoading(true);

        try {
            if (user) {
                const token = await Firebase.getTokenId();
                if (token) {
                    const { data } = await fetchUserDecks();
                    setDecks(data);
                }
            } else {
                const localDecks = await db.anonDecks.toArray();
                setDecks(localDecks);
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchAsync();
    }, [user]);

    return [decks, loading, error, fetchAsync];
}

function useAnonDecksSyncronisation(refetch) {
    const user = useAuthUser();
    const db = useDexie("wudb");
    const saveDeck = useSaveDeckFactory();

    useEffect(() => {
        if (!user) return;

        db.anonDecks
            .toArray()
            .then((anonDecks) => {
                anonDecks.forEach(async (d) => {
                    const {
                        deckId,
                        createdutc,
                        updatedutc,
                        deck,
                        sets,
                        name,
                        faction,
                    } = d;
                    await saveDeck({
                        data: {
                            deckId,
                            createdutc,
                            updatedutc,
                            deck,
                            sets,
                            name,
                            faction,
                            private: d.private,
                        },
                    });
                });

                return anonDecks.map(({ id }) => id);
            })
            .then((idsToDelete) => db.anonDecks.bulkDelete(idsToDelete))
            .then(() => {
                refetch();
            })
            .catch((e) =>
                console.error("Error transfering decks to server", e)
            );
    }, [user, db, refetch, saveDeck]);
}

function AnonymousUserDecksStorageInfo() {
    return (
        <div>
            <p className="border-2 border-purple-700 text-purple-700 bg-purple-100 text-justify p-4 my-4 rounded-md lg:mx-auto lg:w-2/5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline relative mb-1 h-5 w-5 mr-2"
                    fill="#DDD6FE"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Greetings stranger! Decks below are stored in this very browser
                only. If you{" "}
                {
                    <Link className="underline font-bold" to="/login">
                        sign in
                    </Link>
                }
                , they will be stored in database and available to you on any
                device.
            </p>
        </div>
    );
}

function MyDecksPage() {
    const user = useAuthUser();
    const [userDecks, loading, error, refetch] = useUserDecksLoader(user);
    useAnonDecksSyncronisation(refetch);
    const [confirmDeleteDeckId, setConfirmDeleteDeckId] = useState(undefined);
    const deleteDeckAsync = useDeleteUserDeckFactory();

    const handleCloseDeleteDialog = () => {
        setConfirmDeleteDeckId(null);
    };

    const handleDeleteDeckId = (deckId) => () => {
        setConfirmDeleteDeckId(deckId);
    };

    const handleDeleteDeck = async () => {
        try {
            await deleteDeckAsync(confirmDeleteDeckId);
            refetch();
            setConfirmDeleteDeckId(null);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex-1 flex p-4 flex-col">
            {!user && <AnonymousUserDecksStorageInfo />}
            {/* {
                error && error.response.status === 401 && (
                    <Redirect to="/login" />
                )
            } */}
            {loading && (
                <div className="flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            )}
            {!loading && userDecks.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <p>
                        You don't have any decks yet.{" "}
                        <Link
                            className="text-purple-700 font-bold"
                            to="/deck/create"
                        >
                            Let's make one!
                        </Link>
                    </p>
                </div>
            )}

            {userDecks.length > 0 && (
                <div className="flex-1">
                    {userDecks
                        .map((deck) => ({
                            ...deck,
                            id: deck.deckId,
                            cards: deck.deck,
                        }))
                        .sort((x, y) => y.updatedutc - x.updatedutc)
                        .map((deck) => (
                            <DeckLink
                                key={deck.id}
                                onDelete={handleDeleteDeckId}
                                {...deck}
                            />
                        ))}
                </div>
            )}

            <DeleteConfirmationDialog
                title="Delete deck"
                description={`Are you sure you want to delete deck: '${
                    userDecks.find(
                        (deck) => deck.deckId === confirmDeleteDeckId
                    )?.name
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
