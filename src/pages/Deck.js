import React, { useMemo } from "react";
import ReadonlyDeck from "../components/ReadonlyDeck/index";
import {
    warbandsWithDefaultSet,
    idPrefixToFaction,
    PREFIX_LENGTH,
} from "../data/index";
import { useHistory, useLocation } from "react-router-dom";
import DeleteConfirmationDialog from "../atoms/DeleteConfirmationDialog";
import { Helmet } from "react-helmet";
import { getCardById } from "../data/wudb";
import useAuthUser from "../hooks/useAuthUser";
import { useContext } from "react";
import { FirebaseContext } from "../firebase";

function Deck(props) {
    const user = useAuthUser();
    const firebase = useContext(FirebaseContext);
    const location = useLocation();
    const history = useHistory();
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = React.useState(
        false
    );
    const [cardsView, setCardsView] = React.useState(false);
    const cards = useMemo(() => {
        const cs = location.state.deck.cards.map(getCardById);
        return cs;
    }, [location.state.deck]);

    const handleChangeView = () => {
        setCardsView((prev) => !prev);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogVisible(false);
    };

    const handleDeleteDeck = async () => {
        try {
            const { id } = location.state.deck;
            firebase.deck(id).off();

            await firebase.realdb.ref(`/decks/${id}`).remove();

            props.firebase
                .decksMetaDb()
                .doc("all")
                .update({
                    ids: props.firebase.firestoreArrayRemove(id),
                });

            props.firebase
                .decksMetaDb()
                .doc(id.split("-")[0])
                .update({
                    ids: props.firebase.firestoreArrayRemove(id),
                });

            if (props.uid) {
                props.removeDeck(id);

                firebase.db
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        mydecks: props.firebase.firestoreArrayRemove(id),
                    });
            } else {
                const anonDeckIds =
                    JSON.parse(localStorage.getItem("yawudb_anon_deck_ids")) ||
                    [];
                const updated = anonDeckIds.filter((deckId) => deckId !== id);
                localStorage.setItem(
                    "yawudb_anon_deck_ids",
                    JSON.stringify(updated)
                );
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

    const _copyDeck = () => {
        props.copyResetDeck();
        const { id, name, cards, sets } = location.state.deck;
        const strippedId = id.substring(0, id.length - 13);
        const faction =
            strippedId.length > PREFIX_LENGTH
                ? strippedId
                : idPrefixToFaction[strippedId];
        const defaultSet = warbandsWithDefaultSet.filter((a) =>
            a.includes(faction)
        );
        props.copySetFaction(faction, defaultSet[0][1]);
        props.copyCreateModeSets(sets);
        if (cards) {
            for (let c of cards) {
                props.copyAddCard(c);
            }
        }

        props.copyChangeName(`${name} - COPY`);
        props.copyChangeDescription();
        history.push(`/deck/create`);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    {`${
                        ""
                        // factions[
                        //     idPrefixToFaction[deck.id.substr(0, id.length - 13)]
                        // ]
                    } Deck for Warhammer Underworlds`}
                </title>
                <meta
                    name="description"
                    content={`Get inspired with this deck to build your next Grand Clash winning ${
                        // factions[
                        //     idPrefixToFaction[deck.id.substr(0, id.length - 13)]
                        // ]
                        ""
                    } deck.`}
                />
                <meta
                    property="og:title"
                    content={`${
                        // factions[
                        //     idPrefixToFaction[deck.id.substr(0, id.length - 13)]
                        // ]
                        ""
                    } Deck for Warhammer Underworlds`}
                />
                <meta
                    property="og:description"
                    content={`Get inspired with this deck to build your next Grand Clash winning ${
                        // factions[
                        //     idPrefixToFaction[deck.id.substr(0, id.length - 13)]
                        // ]
                        ""
                    } deck.`}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://yawudb.com/view/deck/${location.state.deck.id}`}
                />
                <meta
                    property="og:image"
                    content={`https://yawudb.com/assets/icons/${
                        ""
                        // idPrefixToFaction[id.substr(0, id.length - 13)]
                    }-deck.png`}
                />
            </Helmet>
            <
            >
                <ReadonlyDeck
                    {...location.state.deck}
                    onCardsViewChange={handleChangeView}
                    cardsView={cardsView}
                    desc=""
                    factionId={location.state.deck.id.split('-')[0]}
                    cards={cards}
                    canUpdateOrDelete={location.state.canUpdateOrDelete}
                    onCopy={_copyDeck}
                    onDelete={_deleteDeck}
                />

                <DeleteConfirmationDialog
                    title="Delete deck"
                    description={`Are you sure you want to delete deck: '${location.state.deck.name}'`}
                    open={isDeleteDialogVisible}
                    onCloseDialog={handleCloseDeleteDialog}
                    onDeleteConfirmed={handleDeleteDeck}
                    onDeleteRejected={handleCloseDeleteDialog}
                />
            </>
        </React.Fragment>
    );
}

export default Deck;
