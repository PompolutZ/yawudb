import React, { useContext, useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDecksFromDatabase,
    deletePrivateDeck,
} from "../../../features/privateDecksSlice";
import toPairs from "lodash/toPairs";
import MotionDeckThumbnail from "../atoms/MotionDeckThumbnail";
import FluidDeckThumbnail from "../../../atoms/FluidDeckThumbnail";
import DeckThumbnail from "../../../atoms/DeckThumbnail";
import useAuthUser from "../../../hooks/useAuthUser";
import DeleteConfirmationDialog from "../../../atoms/DeleteConfirmationDialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CritLoader from "../../../atoms/CritLoader";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
    },

    deckRow: {
        display: "flex",
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        marginRight: theme.spacing(2),
        alignItems: "center",
    },
}));

function MyDecksAuth() {
    const [loading, setLoading] = useState(true);
    const [deckToDelete, setDeckToDelete] = useState(null);
    const classes = useStyles();
    const isMd = useMediaQuery("(min-width: 700px)");
    const auth = useAuthUser();
    const dispatch = useDispatch();
    const privateDecks = useSelector((state) => {
        return state.privateDecks;
    });
    const decks = useMemo(
        () =>
            toPairs(privateDecks)
                .map(([id, value]) => ({ ...value, id }))
                .sort((l, r) => new Date(l.created) - new Date(r.created)),
        [privateDecks]
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        dispatch(fetchDecksFromDatabase(firebase));
    }, [auth]);

    useEffect(() => {
        setLoading(false);
    }, [decks]);

    const openDeleteDeckConfifmation = async (id, name) => {
        setDeckToDelete({ id, name });
    };

    const handleDeleteDeck = async () => {
        const { id } = deckToDelete;
        setDeckToDelete(null);
        await dispatch(deletePrivateDeck(firebase, id));
    };

    const handleCloseDeleteDialog = () => {
        setDeckToDelete(null);
    };

    if (loading) {
        return (
            <div
                className={classes.root}
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <CritLoader />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {decks &&
                decks.map((deck) =>
                    isMd ? (
                        <section key={deck.id} className={classes.deckRow}>
                            <DeckThumbnail
                                deckId={deck.id}
                                deck={deck}
                                canUpdateOrDelete
                                isDraft={deck.isDraft}
                                style={{ flex: 1 }}
                            ></DeckThumbnail>
                            <IconButton
                                style={{
                                    color: deck.private
                                        ? "grey"
                                        : "rgba(38, 166, 91, 1)",
                                    flex: "0 0",
                                    cursor: "pointer",
                                    width: "48px",
                                    height: "48px",
                                }}
                            >
                                <PublicIcon />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    openDeleteDeckConfifmation(
                                        deck.id,
                                        deck.name
                                    )
                                }
                                style={{
                                    color: "rgba(240, 52, 52, 1)",
                                    width: "48px",
                                    height: "48px",
                                    flex: "0 0",
                                    cursor: "pointer",
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </section>
                    ) : (
                        <MotionDeckThumbnail
                            key={deck.id}
                            deckName={deck.name}
                            deckId={deck.id}
                            onDelete={openDeleteDeckConfifmation}
                        >
                            <FluidDeckThumbnail
                                deckId={deck.id}
                                deck={deck}
                                canUpdateOrDelete
                                isDraft={deck.isDraft}
                            />
                            {/* {
                        this.state.showConflicts && (
                            <Suspense fallback={<CircularProgress style={{color: '#3B9979'}} />}>
                                <DeckConflictsAndWarnings 
                                    conflicts={this.state.conflicts[id]} 
                                    warnings={this.state.warnings[id]}
                                    decks={decks} />
                            </Suspense>
                        )
                    }                                                 */}
                        </MotionDeckThumbnail>
                    )
                )}

            <DeleteConfirmationDialog
                title="Delete deck"
                description={`Are you sure you want to delete deck: '${
                    deckToDelete && deckToDelete.name
                }'`}
                open={Boolean(deckToDelete)}
                onCloseDialog={handleCloseDeleteDialog}
                onDeleteConfirmed={handleDeleteDeck}
                onDeleteRejected={handleCloseDeleteDialog}
            />
        </div>
    );
}

export default MyDecksAuth;
