import React, { useEffect, useState } from "react";
import Deck from "./components/Deck";
import { Redirect } from "react-router-dom";
import CardLibraryToggles from "./components/CardLibraryFilters";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "..";
import useAuthUser from "../../../hooks/useAuthUser";
import { resetDeckAction, saveDeckAction, updateDeckAction } from "../reducer";
import uuid4 from "uuid/v4";
import { DeleteConfirmationDialog } from "@components/DeleteConfirmationDialog";
import CardsLibrary from "./components/CardsLibrary";
import LibraryFilters from "./components/LibraryFilters";

import { ReactComponent as WarbandIcon } from "../../../svgs/warband.svg";
import FightersInfoList from "../../../atoms/FightersInfoList";
import { Transition } from "@headlessui/react";
import useMeasure from "react-use-measure";
import BottomPanelNavigation from "./components/BottomPanelNavigation";

function Filters() {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState({});
    const [ref, bounds] = useMeasure();

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

function DeckBuilder({ currentDeckName, existingDeckId, isPrivate, action }) {
    const [deckId, setDeckId] = useState(existingDeckId || "");
    const [deckName, setDeckName] = useState(currentDeckName || "");
    const [activeTabMobile, setActiveTabMobile] = useState(action === "create" ? "LIBRARY" : "DECK");
    const [showWarband, setShowWarband] = useState(false);
    const [showConfirmDeckReset, setShowConfirmDeckReset] = useState(false);
    const { uid, displayName } = useAuthUser() || {
        uid: "Anonymous",
        displayName: "Anonymous",
    };

    const {
        faction,
        status,
    } = useDeckBuilderState();

    const dispatch = useDeckBuilderDispatcher();

    const theme = useTheme();

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
        if (existingDeckId) {
            dispatch(
                updateDeckAction({
                    deckName: deckName || `${faction.displayName} Deck`,
                    author: uid,
                    authorDisplayName: displayName,
                    deckId,
                    private: isPrivate,
                })
            )
        } else {
            dispatch(
                saveDeckAction({
                    deckName: deckName || `${faction.displayName} Deck`,
                    author: uid,
                    authorDisplayName: displayName,
                    deckId,
                })
            );
        }
    };

    return (
        <div className="flex-1 grid grid-cols-1 pb-16 lg:pb-0 lg:grid-cols-4 bg-white relative">
            {status === "Saved" && <Redirect to="/mydecks" />}

            <Filters />
            
            <BottomPanelNavigation activeOption={activeTabMobile} onShow={setActiveTabMobile} />
            <Slide
                mountOnEnter
                in={
                    useMediaQuery(theme.breakpoints.up("md"))
                        ? true
                        : activeTabMobile === "DECK"
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
                    zIndex: 1,
                    paddingBottom: useMediaQuery(theme.breakpoints.up("md"))
                        ? 0
                        : "4rem",
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
                    <button
                        className={`hidden lg:flex ml-auto mr-4 items-center py-2 text-xs text-gray-700 outline-none hover:text-purple-700 focus:text-purple-500`}
                        onClick={() => {
                            setShowWarband(true);
                        }}
                    >
                        <WarbandIcon className="h-6 fill-current mr-2" />
                        Warband
                    </button>

                    <Deck
                        deckName={deckName}
                        onDeckNameChange={setDeckName}
                        onSave={handleSaveDeck}
                        onReset={handleResetCurrentDeck}
                    />
                </div>
            </Slide>
            <Transition
                show={activeTabMobile === "WARBAND" || showWarband}
                className="fixed inset-0 z-10 flex backdrop-filter backdrop-blur-sm"
                enter="transition transform duration-300"
                enterTo="opacity-100 translate-y-0"
                enterFrom="opacity-0 translate-y-10"
            >
                <FightersInfoList onClose={() => setShowWarband(false)} />
            </Transition>
            <DeleteConfirmationDialog
                title="Clear current deck"
                description={`Are you sure you want to clear current deck? Your deck building progress will be lost.`}
                open={showConfirmDeckReset}
                onCloseDialog={handleCloseConfirmDialog}
                onDeleteConfirmed={handleResetDeck}
                onDeleteRejected={handleCloseConfirmDialog}
            />
        </div>
    );
}

export default DeckBuilder;
