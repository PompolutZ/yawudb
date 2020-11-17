import React from "react";
import { OrderedSet } from "immutable";

import Deck from "../Deck";
import { cardsDb, factionIdPrefix } from "../../data/index";

import FloatingActionButton from "../FloatingActionButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleSnackbar from "../SimpleSnackbar";
import CardLibraryFilters from "./components/CardLibraryFilters";
import CardsLibrary from "./components/CardsLibrary";
import { AddCardSVG, DeckSVG } from "../../atoms/SVGs";
import { addOrUpdateMyDeck } from "../../reducers/mydecks";
import { Tabs, Tab } from "@material-ui/core";
import CardsTab from "./atoms/CardsTab";
import FightersInfoList from "../../atoms/FightersInfoList";
import { withFirebase } from "../../firebase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },

    paper: {
        flexGrow: 1,
        height: "100%",
    },

    leftPaperInner: {
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap",
    },
}));

const uuid4 = require("uuid/v4");

function DeckBuilder(props) {
    const { editMode, transferMode, isAuth, userInfo } = props;
    const {
        selectedFaction,
        currentDeckName,
        currentDeckSource,
        currentDeckDescription,
        currentDeck,
    } = props;
    const {
        changeName,
        changeSource,
        changeDescription,
        clearDeck,
        resetDeck,
        resetSearchText,
        setFaction,
    } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [tabIndex, setTabIndex] = React.useState(0);
    const [isMobileDeckVisible, setIsMobileDeckVisible] = React.useState(
        editMode || transferMode
    );
    const [showNotification, setShowNotification] = React.useState(false); //isMobileDeckVisible: this.props.editMode || this.props.transferMode,

    const handleTabChange = (event, value) => {
        setTabIndex(value);
    };

    const _handleShowDeckMobile = () => {
        setIsMobileDeckVisible((prev) => !prev);
    };

    const _updateCurrentDeck = async (args) => {
        try {
            if (!props.match.params.id) {
                _resetAndGoBack();
                return;
            }

            const cache =
                JSON.parse(localStorage.getItem("yawudb_decks")) || {};

            const updated = Date();
            const deckPayload = {
                name: currentDeckName,
                source: "",
                desc: currentDeckDescription,
                cards: new OrderedSet(currentDeck).toJS(),
                sets: new OrderedSet(
                    currentDeck.map((c) => cardsDb[c].set)
                ).toJS(),
                scoringSummary: [0, 0, 0, 0],
                tags: [],
                lastModified: Date(),
            };

            props.addOrUpdateDeck(props.match.params.id, updated, {
                ...deckPayload,
                id: props.match.params.id,
            });

            await props.firebase.realdb
                .ref("decks/" + props.match.params.id)
                .update(deckPayload);

            localStorage.setItem(
                "yawudb_decks",
                JSON.stringify({
                    ...cache,
                    [props.match.params.id]: deckPayload,
                })
            );

            _resetAndGoBack();
        } catch (err) {
            console.error("ERROR updating deck: ", err);
        }
    };

    const _saveCurrentDeck = async (args) => {
        try {
            const cache =
                JSON.parse(localStorage.getItem("yawudb_decks")) || {};
            const faction = selectedFaction.startsWith("n_")
                ? selectedFaction.slice(2)
                : selectedFaction;
            const deckId = `${factionIdPrefix[faction]}-${uuid4().slice(-12)}`;

            const deckPayload = {
                name: currentDeckName,
                source: "",
                desc: currentDeckDescription,
                cards: new OrderedSet(currentDeck).toJS(),
                sets: new OrderedSet(
                    currentDeck.map((c) => cardsDb[c].set)
                ).toJS(),
                scoringSummary: [0, 0, 0, 0],
                tags: [],
                created: Date(),
                author: isAuth ? userInfo.uid : "Anonymous",
                authorDisplayName: isAuth ? userInfo.displayName : "Anonymous",
                private: isAuth,
            };

            if (isAuth) {
                await props.firebase.db
                    .collection("users")
                    .doc(userInfo.uid)
                    .update({
                        mydecks: props.firebase.firestoreArrayUnion(deckId),
                    });
            }

            await props.firebase.realdb.ref("decks/" + deckId).set(deckPayload);

            // update meta for non-draft and public decks
            if (!args.isDraft && !isAuth) {
                props.firebase
                    .decksMetaDb()
                    .doc("all")
                    .update({
                        ids: props.firebase.firestoreArrayUnion(deckId),
                    });

                props.firebase
                    .decksMetaDb()
                    .doc(factionIdPrefix[faction])
                    .update({
                        ids: props.firebase.firestoreArrayUnion(deckId),
                    });
            }

            // User should be able easily access anon decks in the current browser
            if (!isAuth) {
                const anonDeckIds =
                    JSON.parse(localStorage.getItem("yawudb_anon_deck_ids")) ||
                    [];
                localStorage.setItem(
                    "yawudb_anon_deck_ids",
                    JSON.stringify([...anonDeckIds, deckId])
                );
            }

            localStorage.setItem(
                "yawudb_decks",
                JSON.stringify({ ...cache, [deckId]: deckPayload })
            );

            resetDeck();
            resetSearchText();
            setShowNotification(true);
            props.history.push(`/view/deck/${deckId}`, {
                deck: deckPayload,
                canUpdateOrDelete: true,
            });
        } catch (err) {
            console.error("ERROR saving new deck: ", err);
        }
    };

    const _resetAndGoBack = () => {
        props.history.goBack();
        setTimeout(() => {
            resetDeck();
            resetSearchText();
        }, 300);
    };

    const _cancelUpdate = () => {
        _resetAndGoBack();
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1} style={{ height: "98%" }}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.leftPaperInner}>
                            <div>
                                <CardLibraryFilters
                                    selectedFaction={selectedFaction}
                                    setFaction={setFaction}
                                    editMode={editMode}
                                />
                            </div>
                            <div>
                                <Tabs
                                    variant="fullWidth"
                                    value={tabIndex}
                                    onChange={handleTabChange}
                                >
                                    <Tab
                                        label={
                                            <CardsTab
                                                editMode={editMode}
                                                isSelected={tabIndex === 0}
                                            />
                                        }
                                    />
                                    <Tab label="Fighters" />
                                </Tabs>
                            </div>
                            <div style={{ flex: "1 100%" }}>
                                {tabIndex === 0 && (
                                    <CardsLibrary editMode={editMode} />
                                )}
                                {tabIndex === 1 && (
                                    <FightersInfoList
                                        faction={selectedFaction}
                                    />
                                )}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Slide
                    mountOnEnter
                    in={
                        useMediaQuery(theme.breakpoints.up("md"))
                            ? true
                            : isMobileDeckVisible
                    }
                    direction="up"
                    timeout={{
                        enter: useMediaQuery(theme.breakpoints.up("md"))
                            ? 0
                            : 175,
                        exit: useMediaQuery(theme.breakpoints.up("md"))
                            ? 0
                            : 75,
                    }}
                    style={{
                        backgroundColor: useMediaQuery(
                            theme.breakpoints.up("md")
                        )
                            ? "white"
                            : "rgba(0, 0, 0, .5)",
                        top: 60,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 10,
                        paddingBottom: useMediaQuery(theme.breakpoints.up("md"))
                            ? 0
                            : "1rem",
                        position: useMediaQuery(theme.breakpoints.up("md"))
                            ? "static"
                            : "fixed",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            overflow: useMediaQuery(theme.breakpoints.up("md"))
                                ? "hidden"
                                : "auto",
                            backgroundColor: "white",
                        }}
                    >
                        <Paper className={classes.paper}>
                            <Deck
                                faction={selectedFaction}
                                editMode={editMode}
                                currentName={currentDeckName}
                                currentSource={currentDeckSource}
                                currentDescription={currentDeckDescription}
                                changeName={changeName}
                                changeSource={changeSource}
                                changeDescription={changeDescription}
                                selectedCards={currentDeck}
                                onSave={_saveCurrentDeck}
                                onUpdate={_updateCurrentDeck}
                                onCancel={_cancelUpdate}
                                onRemoveAll={clearDeck}
                                isAuth={isAuth}
                            />
                        </Paper>
                    </Grid>
                </Slide>
            </Grid>
            {showNotification && (
                <SimpleSnackbar
                    position="center"
                    message="Save was successful!"
                />
            )}
            <FloatingActionButton isEnabled onClick={_handleShowDeckMobile}>
                {!isMobileDeckVisible && <DeckSVG />}
                {isMobileDeckVisible && <AddCardSVG />}
            </FloatingActionButton>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth !== null,
        userInfo: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOrUpdateDeck: (id, timestamp, data) =>
            dispatch(addOrUpdateMyDeck(id, timestamp, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(DeckBuilder)));
