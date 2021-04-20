import React, { useMemo, useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { ReactComponent as TogglesIcon } from "../../../../svgs/sliders.svg";
import { ReactComponent as CloseIcon } from "../../../../svgs/x.svg";
import { ReactComponent as ChampionshipLogo } from "../../../../svgs/championship_logo.svg";
import { ReactComponent as VanguardLogo } from "../../../../svgs/vanguard_logo.svg";
import { ReactComponent as RelicLogo } from "../../../../svgs/relic_logo.svg";
import ExpansionsToggle from "../../../../components/ExpansionsToggle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SvgIcon from "@material-ui/core/SvgIcon";
import OpenFormatIcon from "@material-ui/icons/Mood";
import ChampionshipFormatIcon from "@material-ui/icons/EmojiEvents";
import { factions } from "../../../../data";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import SectionTitle from "../../../../v2/components/SectionTitle";
import Toggle from "../../../../v2/components/HexToggle";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "../..";
import {
    CHAMPIONSHIP_FORMAT,
    getAllSetsValidForFormat,
    RELIC_FORMAT,
    VANGUARD_FORMAT,
    wufactions,
} from "../../../../data/wudb";
import DebouncedInput from "../../../../v2/components/DebouncedInput";

const useClasses = makeStyles((theme) => ({
    filtersPanel: {
        background: "white",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        boxShadow: "1px 0px 5px 0 rgba(0, 0, 0, 0.05)",
    },

    filtersContent: {
        padding: theme.spacing(2),
    },

    closeIcon: {
        display: "block",
        margin: `0 ${theme.spacing(1)}px 0 auto`,
    },

    formatInfo: {
        marginTop: theme.spacing(2),
    },
}));

function DeckPlayFormatToggle({ selectedFormat, onFormatChange }) {
    return (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button
                onClick={onFormatChange(VANGUARD_FORMAT)}
                variant={
                    selectedFormat === VANGUARD_FORMAT
                        ? "contained"
                        : "outlined"
                }
                startIcon={
                    <VanguardLogo
                        className={`${
                            selectedFormat !== VANGUARD_FORMAT
                                ? "text-purple-800"
                                : "text-white"
                        } text-2xl fill-current`}
                    />
                }
            >
                vanguard
            </Button>
            <Button
                onClick={onFormatChange(CHAMPIONSHIP_FORMAT)}
                variant={
                    selectedFormat === CHAMPIONSHIP_FORMAT
                        ? "contained"
                        : "outlined"
                }
                startIcon={
                    <ChampionshipLogo
                        className={`${
                            selectedFormat !== CHAMPIONSHIP_FORMAT
                                ? "text-purple-800"
                                : "text-white"
                        } text-2xl fill-current`}
                    />
                }
            >
                championship
            </Button>
            <Button
                onClick={onFormatChange(RELIC_FORMAT)}
                variant={
                    selectedFormat === RELIC_FORMAT ? "contained" : "outlined"
                }
                startIcon={
                    <RelicLogo
                        className={`${
                            selectedFormat !== RELIC_FORMAT
                                ? "text-purple-800"
                                : "text-white"
                        } text-2xl fill-current`}
                    />
                }
            >
                relic
            </Button>
        </ButtonGroup>
    );
}

function DeckPlayFormatInfo({ format, ...rest }) {
    switch (format) {
        case "open":
            return (
                <Typography variant="body2" {...rest}>
                    Only cards from the latest season (Direchasm) can be used.
                </Typography>
            );
        case "championship":
            return (
                <Typography variant="body2" {...rest}>
                    Library will be filtered to fullfil competitive play
                    requirements: forsaken and rotated out cards will be excluded.
                </Typography>
            );
        case "relic":
            return (
                <Typography variant="body2" {...rest}>
                    Library will be filtered to exlude forsaken cards.
                </Typography>
            );
        default:
            return null;
    }
}

function SelectedFaction({ faction = "morgwaeths-blade-coven", ...rest }) {
    return (
        <div className={`flex flex-grow ${rest.className}`}>
            <div className="">
                <picture>
                    <img
                        className="w-20 h-20"
                        src={`/assets/icons/${faction.name}-deck.png`}
                    />
                </picture>
            </div>
            <div className="flex-grow grid place-content-center text-gray-900 text-2xl">
                {faction.displayName}
            </div>
        </div>
    );
}

function FactionsPicker({ selected, onChangeWarband, ...rest }) {
    const handleSelectWarband = (faction) => () => {
        onChangeWarband(faction);
    };

    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.values(wufactions)
                .filter((faction) => faction.id != selected.id)
                .reverse()
                .map((faction) => (
                    <img
                        key={faction.id}
                        className="w-10 h-10 m-1 cursor-pointer"
                        onClick={handleSelectWarband(faction)}
                        src={`/assets/icons/${faction.name}-icon.png`}
                    />
                ))}
        </div>
    );
}

function CardLibraryFilters(props) {
    const state = useDeckBuilderState();
    const dispatch = useDeckBuilderDispatcher();

    const classes = useClasses();
    const [showFilters, setShowFilters] = React.useState(false);
    const [selectedFormat, setSelectedFormat] = useState(state.format);

    /// Here will be new approach, keeping the rest for now
    const validSets = useMemo(() => getAllSetsValidForFormat(selectedFormat), [
        selectedFormat,
    ]);
    const [warband, setWarband] = useState(state.faction);
    const [hideDuplicates, setHideDuplicates] = useState(true);
    const [selectedSets, setSelectedSets] = useState(state.sets);

    useEffect(() => {
        setWarband(state.faction);
    }, [state.faction]);
    
    const handleFormatChange = (format) => () => {
        setSelectedFormat(format);
    };

    const closeAndUpdateFilters = () => {
        setShowFilters(false);
        dispatch({
            type: "UPDATE_FILTERS",
            payload: {
                faction: warband,
                sets: selectedSets,
                hideDuplicates,
                format: selectedFormat,
            },
        });
    };

    useEffect(() => {
        setSelectedSets(validSets);
    }, [validSets]);

    return (
        <div style={{ flex: "1 1 auto" }}>
            <div
                style={{
                    paddingBottom: "1rem",
                    margin: "1rem .5rem 0 .5rem",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <DebouncedInput
                    className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-purple-700"
                    placeholder="Search for any text on card"
                    onChange={props.onSearchTextChange}
                />
                <IconButton onClick={() => setShowFilters(true)}>
                    <TogglesIcon />
                </IconButton>
            </div>

            <Slide
                className={classes.filtersPanel}
                mountOnEnter
                in={showFilters}
                direction="right"
                timeout={{
                    enter: 300,
                    exit: 175,
                }}
            >
                <Grid item xs={12} md={6}>
                    <div className="w-full h-full flex flex-col overflow-x-hidden">
                        <IconButton
                            onClick={closeAndUpdateFilters}
                            className="self-end"
                        >
                            <CloseIcon />
                        </IconButton>
                        <section className="overflow-y-auto px-4 pb-8">
                            <SectionTitle className="mb-8" title="Warband" />

                            <SelectedFaction faction={warband} />

                            <FactionsPicker
                                selected={warband}
                                onChangeWarband={setWarband}
                            />

                            <SectionTitle title="Format" className="my-8" />

                            <div className="flex flex-col items-center">
                                <DeckPlayFormatToggle
                                    selectedFormat={selectedFormat}
                                    onFormatChange={handleFormatChange}
                                />

                                <DeckPlayFormatInfo
                                    className={classes.formatInfo}
                                    format={state.format}
                                />
                            </div>

                            <SectionTitle title="Sets" className="my-8" />

                            <div className="flex my-4">
                                <Toggle
                                    checked={hideDuplicates}
                                    onChange={setHideDuplicates}
                                />
                                <p className="ml-2">
                                    For dublicate cards show only newest one.
                                </p>
                            </div>
                            <ExpansionsToggle
                                expansions={validSets}
                                selectedExpansions={selectedSets}
                                onExpansionsChange={setSelectedSets}
                            />
                        </section>
                    </div>
                </Grid>
                {/* 

                    <div>

                    </div> */}

                {/*  */}
            </Slide>
        </div>
    );
}

export default CardLibraryFilters;
