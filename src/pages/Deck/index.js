import React, { useEffect, useState } from "react";
import ReadonlyDeck from "./ReadonlyDeck/index";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCardById } from "../../data/wudb";
import useAuthUser from "../../hooks/useAuthUser";
import { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import DeleteConfirmationDialog from "../../atoms/DeleteConfirmationDialog";

function Deck(props) {
    const user = useAuthUser();
    const firebase = useContext(FirebaseContext);
    const { id } = useParams();
    const { state } = useLocation();
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState([]);
    const [factionId, setFactionId] = useState("");
    const [canUpdateOrDelete, setCanUpdateOrDelete] = useState(false);
    const history = useHistory();
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = React.useState(
        false
    );
    const [cardsView, setCardsView] = React.useState(false);

    useEffect(() => {
        if (state) {
            setDeck(state.deck);
            setCards(state.deck.cards.map(getCardById));
            setFactionId(state.deck && state.deck.id.split("-")[0]);
            setCanUpdateOrDelete(state.canUpdateOrDelete);
        } else {
            firebase.realdb
                .ref(`/decks/${id}`)
                .once("value")
                .then((s) => {
                    if (!s.val()) return;

                    let deck = s.val();
                    let updatedDeck = { ...deck, id };
                    if (typeof deck.sets !== "string") {
                        updatedDeck.sets = deck.sets.map((s) => s + 1);
                    } else {
                        updatedDeck.sets = deck.sets.split(",");
                    }

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

                    setDeck(updatedDeck);
                    setCards(updatedDeck.deck.split(",").map(getCardById));
                    setFactionId(id.split("-")[0]);
                });
        }
    }, [state]);

    const handleChangeView = () => {
        setCardsView((prev) => !prev);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogVisible(false);
    };

    const handleDeleteDeck = async () => {
        try {
            const { id } = deck;
            firebase.deck(id).off();

            await firebase.realdb.ref(`/decks/${id}`).remove();

            if (props.uid) {
                props.removeDeck(id);

                firebase.db
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        mydecks: props.firebase.firestoreArrayRemove(id),
                    });
            }

            handleCloseDeleteDialog();
            history.push("/mydecks");
        } catch (err) {
            console.error("ERROR deleting deck: ", err);
        }
    };

    const _deleteDeck = async () => {
        setIsDeleteDialogVisible(true);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    {`Deck for Warhammer Underworlds`}
                </title>
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
            {!deck && <div className="flex-1">Loading...</div>}
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
