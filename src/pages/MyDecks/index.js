import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FactionDeckPicture from "../../v2/components/FactionDeckPicture";
import { VIEW_DECK } from "../../constants/routes";
import { checkCardIsObjective, getCardById } from "../../data/wudb";
import { ReactComponent as TrashIcon } from "../../svgs/trash.svg";
import ScoringOverview from "../../atoms/ScoringOverview";
import SetsList from "../../atoms/SetsList";
import DeleteConfirmationDialog from "../../atoms/DeleteConfirmationDialog";
import {
    useDeleteUserDeck,
    useGetUserDecks,
} from "../../hooks/wunderworldsAPIHooks";

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
                <div>
                    <h3 className="text-sm font-bold text-gray-700">
                        {new Date(props.updatedutc).toLocaleDateString()}
                    </h3>
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
    const [{ data, loading }, refetch] = useGetUserDecks(true);
    const [, deleteUserDeck] = useDeleteUserDeck();
    const { state } = useLocation();
    const [confirmDeleteDeckId, setConfirmDeleteDeckId] = useState(undefined);

    useEffect(() => {
        refetch();
    }, [state]);

    const handleCloseDeleteDialog = () => {
        setConfirmDeleteDeckId(null);
    };

    const handleDeleteDeckId = (deckId) => () => {
        setConfirmDeleteDeckId(deckId);
    };

    const handleDeleteDeck = async () => {
        await deleteUserDeck({
            url: `/api/v1/user-decks/${confirmDeleteDeckId}`,
        });
        await refetch();
        setConfirmDeleteDeckId(null);
    };

    return (
        <div className="flex-1 flex p-4">
            {loading && (
                <div className="flex-1 flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            )}
            {!loading && data && data.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <p> You don't have any decks yet.</p>
                </div>
            )}
            {data && (
                <div className="flex-1">
                    {data
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
                    data &&
                    data.find((deck) => deck.id === confirmDeleteDeckId)?.name
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
