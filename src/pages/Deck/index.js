import React, { useEffect, useState } from "react";
import ReadonlyDeck from "./ReadonlyDeck/index";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCardById } from "../../data/wudb";
import DeleteConfirmationDialog from "../../atoms/DeleteConfirmationDialog";
import {
    useDeleteUserDeck,
    useGetUserDeckById,
} from "../../hooks/wunderworldsAPIHooks";

function Deck() {
    const { id } = useParams();
    const [, fetch] = useGetUserDeckById(id, true);
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState([]);
    const [factionId, setFactionId] = useState("");
    const [canUpdateOrDelete, setCanUpdateOrDelete] = useState(false);
    const history = useHistory();
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = React.useState(
        false
    );
    const [cardsView, setCardsView] = React.useState(false);
    const [, deleteUserDeck] = useDeleteUserDeck();
    const [cannotShowDeckMessage, setCannotShowDeckMessage] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (state) {
            setDeck(state.deck);
            setCards(state.deck.cards.map(getCardById));
            setFactionId(state.deck && state.deck.id.split("-")[0]);
            setCanUpdateOrDelete(state.canUpdateOrDelete);

            setLoading(false);
        } else {
            fetch()
                .then((r) => {
                    const [data] = r.data;
                    if (!data) {
                        setCannotShowDeckMessage(true);
                    }

                    setDeck(data);
                    setCards(data.deck.map(getCardById));
                    setFactionId(id.split("-")[0]);

                    // NOTE! This should be fine, since we are using user-decks endpoint which
                    // performs token check whether current user is the one who is the decks author
                    setCanUpdateOrDelete(true);
                })
                .catch((e) => console.error(e))
                .finally(() => setLoading(false));
        }
    }, [state]);

    const handleChangeView = () => {
        setCardsView((prev) => !prev);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogVisible(false);
    };

    const handleDeleteDeck = async () => {
        const { id } = deck;
        await deleteUserDeck({
            url: `/api/v1/user-decks/${id}`,
        });
        handleCloseDeleteDialog();
        history.replace({ pathname: "/mydecks", state: { deck, status: 'DELETED' } });
    };

    const _deleteDeck = async () => {
        setIsDeleteDialogVisible(true);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Deck for Warhammer Underworlds`}</title>
                <meta
                    name="description"
                    content={`Get inspired with this deck to build your next Grand Clash winning deck.`}
                />
                <meta
                    property="og:title"
                    content={`Deck for Warhammer Underworlds`}
                />
                <meta
                    property="og:description"
                    content={`Get inspired with this deck to build your next Grand Clash winning deck.`}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://yawudb.com/view/deck/${id}`}
                />
            </Helmet>
            {loading && (
                <div className="flex-1 flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            )}
            {cannotShowDeckMessage && (
                <div className="flex-1 flex items-center justify-center px-8 text-xl">
                    <p>
                        Not possible to see this deck because it was either
                        deleted or not shared with everyone.
                    </p>
                </div>
            )}
            {deck && (
                <>
                    <ReadonlyDeck
                        {...deck}
                        onCardsViewChange={handleChangeView}
                        cardsView={cardsView}
                        desc=""
                        factionId={factionId}
                        cards={cards}
                        canUpdateOrDelete={canUpdateOrDelete}
                        onDelete={_deleteDeck}
                    />

                    <DeleteConfirmationDialog
                        title="Delete deck"
                        description={`Are you sure you want to delete deck: '${deck.name}'`}
                        open={isDeleteDialogVisible}
                        onCloseDialog={handleCloseDeleteDialog}
                        onDeleteConfirmed={handleDeleteDeck}
                        onDeleteRejected={handleCloseDeleteDialog}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default Deck;
