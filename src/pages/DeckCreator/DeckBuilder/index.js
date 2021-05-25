import React, { useEffect, useState } from "react";

import Deck from "./components/Deck";

import FloatingActionButton from "../../../components/FloatingActionButton";
import { Redirect, withRouter } from "react-router-dom";
import SimpleSnackbar from "../../../components/SimpleSnackbar";
import CardLibraryFilters from "./components/CardLibraryFilters";
import CardsLibrary from "./components/CardsLibrary";
import { AddCardSVG, DeckSVG } from "../../../atoms/SVGs";
import { Tabs, Tab } from "@material-ui/core";
import CardsTab from "./atoms/CardsTab";
import FightersInfoList from "../../../atoms/FightersInfoList";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "..";
import useAuthUser from "../../../hooks/useAuthUser";
import { resetDeckAction, saveDeckAction } from "../reducer";
import uuid4 from "uuid/v4";
import FactionDeckPicture from "../../../v2/components/FactionDeckPicture";
import DeleteConfirmationDialog from "../../../atoms/DeleteConfirmationDialog";

const useStyles = makeStyles(() => ({
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

function DeckBuilder({ currentDeckName, existingDeckId, createdTimestamp }) {
    const [searchText, setSearchText] = useState("");
    const [deckId, setDeckId] = useState(existingDeckId || "");
    const [deckName, setDeckName] = useState(currentDeckName || "");
    const [isMobileDeckVisible, setIsMobileDeckVisible] = useState(false);
    const [showConfirmDeckReset, setShowConfirmDeckReset] = useState(false);
    const { uid, displayName } = useAuthUser() || {
        uid: "Anonymous",
        displayName: "Anonymous",
    };

    const {
        faction,
        selectedObjectives,
        selectedGambits,
        selectedUpgrades,
        format,
        status,
    } = useDeckBuilderState();

    const dispatch = useDeckBuilderDispatcher();

    const classes = useStyles();
    const theme = useTheme();

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, value) => {
        setTabIndex(value);
    };

    const _handleShowDeckMobile = () => {
        setIsMobileDeckVisible((prev) => !prev);
    };

    useEffect(() => {
        if (existingDeckId) return;

        setDeckId(`${faction.abbr}-${uuid4().split("-").slice(-1)[0]}`);
    }, [faction, existingDeckId]);

    const handleCloseConfirmDialog = () => {
        setShowConfirmDeckReset(false);
    };

    const handleResetDeck = () => {
        dispatch(resetDeckAction());
        handleCloseConfirmDialog();
    };

    const handleResetCurrentDeck = () => {
        setShowConfirmDeckReset(true);
    };

    const handleSaveDeck = () => {
        const now = new Date();
        dispatch(
            saveDeckAction({
                deckName: deckName || `${faction.displayName} Deck`,
                author: uid,
                authorDisplayName: displayName,
                deckId,
                createdutc: createdTimestamp || now.getTime(),
                updatedutc: now.getTime(),
            })
        );
    };

    return (
        <div className={classes.root}>
            {status === "Saved" && <Redirect to="/mydecks" />}
            <Grid container spacing={1} style={{ height: "98%" }}>
                <Grid item xs={12} md={5} lg={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.leftPaperInner}>
                            <div>
                                <CardLibraryFilters
                                    onSearchTextChange={setSearchText}
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
                                                isSelected={tabIndex === 0}
                                            />
                                        }
                                    />
                                    <Tab
                                        label={
                                            <div className="flex items-center">
                                                <FactionDeckPicture
                                                    faction={faction.name}
                                                    size="w-8 h-8 mr-1"
                                                />
                                                Fighters
                                            </div>
                                        }
                                    />
                                </Tabs>
                            </div>
                            <div className="flex flex-1">
                                {tabIndex === 0 && (
                                    <CardsLibrary searchText={searchText} />
                                )}
                                {tabIndex === 1 && (
                                    <FightersInfoList faction={faction} />
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
                        md={7}
                        lg={9}
                        style={{
                            overflow: useMediaQuery(theme.breakpoints.up("md"))
                                ? "hidden"
                                : "auto",
                            backgroundColor: "white",
                        }}
                    >
                        <Deck
                            deckName={deckName}
                            onDeckNameChange={setDeckName}
                            faction={faction}
                            selectedObjectives={selectedObjectives}
                            selectedGambits={selectedGambits}
                            selectedUpgrades={selectedUpgrades}
                            format={format}
                            onSave={handleSaveDeck}
                            onReset={handleResetCurrentDeck}
                        />
                    </Grid>
                </Slide>
            </Grid>
            <DeleteConfirmationDialog
                title="Clear current deck"
                description={`Are you sure you want to clear current deck? Your deck building progress will be lost.`}
                open={showConfirmDeckReset}
                onCloseDialog={handleCloseConfirmDialog}
                onDeleteConfirmed={handleResetDeck}
                onDeleteRejected={handleCloseConfirmDialog}
            />

            <FloatingActionButton isEnabled onClick={_handleShowDeckMobile}>
                {!isMobileDeckVisible && <DeckSVG />}
                {isMobileDeckVisible && <AddCardSVG />}
            </FloatingActionButton>
        </div>
    );
}

export default withRouter(DeckBuilder);
