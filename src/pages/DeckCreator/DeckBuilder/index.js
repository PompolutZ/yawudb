import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Deck from "./components/Deck";
import FloatingActionButton from "../../../components/FloatingActionButton";
import { Redirect } from "react-router-dom";
import CardLibraryToggles from "./components/CardLibraryFilters";
import { AddCardSVG, DeckSVG } from "../../../atoms/SVGs";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "..";
import useAuthUser from "../../../hooks/useAuthUser";
import { resetDeckAction, saveDeckAction } from "../reducer";
import uuid4 from "uuid/v4";
import DeleteConfirmationDialog from "../../../atoms/DeleteConfirmationDialog";
import CardsLibrary from "./components/CardsLibrary";
import LibraryFilters from "./components/LibraryFilters";

function Filters() {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState({});
    const [bounds, setBounds] = useState({});
    const ref = useRef();

    useLayoutEffect(() => {
        if(!ref.current) return;
        let bounds = ref.current.getBoundingClientRect();
        setBounds(bounds);
    }, [])

    return (
        <div className="flex-1 flex-col flex p-2 lg:border-r">
            <CardLibraryToggles onSearchTextChange={setSearchText} />
            <LibraryFilters bounds={bounds} onFiltersChanged={setFilter} />

            <div ref={ref} className="flex flex-1">
                <CardsLibrary searchText={searchText} filter={filter} />
            </div>
        </div>
    );
}

function DeckBuilder({ currentDeckName, existingDeckId, createdTimestamp }) {
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

    const theme = useTheme();

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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 bg-white">
            {status === "Saved" && <Redirect to="/mydecks" />}

            <Filters />

            <Slide
                mountOnEnter
                in={
                    useMediaQuery(theme.breakpoints.up("md"))
                        ? true
                        : isMobileDeckVisible
                }
                direction="up"
                timeout={{
                    enter: useMediaQuery(theme.breakpoints.up("md")) ? 0 : 175,
                    exit: useMediaQuery(theme.breakpoints.up("md")) ? 0 : 75,
                }}
                style={{
                    backgroundColor: useMediaQuery(theme.breakpoints.up("md"))
                        ? "white"
                        : "rgba(0, 0, 0, .5)",
                    top: 0,
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
                <div
                    className="lg:col-span-3 p-2 pt-4"
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
                </div>
            </Slide>
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

export default DeckBuilder;
