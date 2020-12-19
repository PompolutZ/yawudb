import React, { useMemo, useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { ReactComponent as TogglesIcon } from "../../../svgs/sliders.svg";
import { ReactComponent as CloseIcon } from "../../../svgs/x.svg";
import ExpansionsToggle from "../../ExpansionsToggle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SvgIcon from "@material-ui/core/SvgIcon";
import OpenFormatIcon from "@material-ui/icons/Mood";
import ChampionshipFormatIcon from "@material-ui/icons/EmojiEvents";
import { factions } from "../../../data";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import SectionTitle from "../../../v2/components/SectionTitle";
import Toggle from "../../../v2/components/HexToggle";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "../../../pages/DeckCreator";
import { getAllSetsValidForFormat, wufactions } from "../../../data/wudb";
import DebouncedInput from "../../../v2/components/DebouncedInput";

const useClasses = makeStyles((theme) => ({
    filtersPanel: {
        background: "white",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
        position: "fixed",
        overflow: 'auto',
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
    }
}));

const RelicFormatIcon = ({ ...rest }) => (
    <SvgIcon {...rest}>
        <path d="M 15 2 C 13.894531 2 13 2.894531 13 4 C 13 5.105469 13.894531 6 15 6 C 16.105469 6 17 5.105469 17 4 C 17 2.894531 16.105469 2 15 2 Z M 11.4375 5 C 8.855469 7.230469 7.738281 10.058594 7.28125 11.6875 C 7.058594 12.476563 7.273438 13.320313 7.8125 13.9375 L 10.3125 16.8125 L 12 22 L 14 22 L 12.0625 16.03125 L 10.59375 12.875 C 10.59375 12.875 10.753906 10.90625 12.25 9.28125 L 15.71875 13.75 L 17.3125 12.90625 Z M 17.375 14 L 16.34375 14.5625 L 17.8125 22 L 19 22 Z M 8.0625 15.84375 L 6 22 L 8 22 L 9.46875 17.40625 Z" />
    </SvgIcon>
)

function DeckPlayFormatToggle({ selectedFormat, onFormatChange }) {

    return (
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
            >
                <Button
                    onClick={onFormatChange("open")}
                    variant={
                        selectedFormat === "open" ? "contained" : "outlined"
                    }
                    startIcon={<OpenFormatIcon />}
                >
                    open
                </Button>
                <Button
                    onClick={onFormatChange("championship")}
                    variant={
                        selectedFormat === "championship"
                            ? "contained"
                            : "outlined"
                    }
                    startIcon={<ChampionshipFormatIcon />}
                >
                    championship
                </Button>
                <Button
                    onClick={onFormatChange("relic")}
                    variant={
                        selectedFormat === "relic"
                            ? "contained"
                            : "outlined"
                    }
                    startIcon={<RelicFormatIcon />}
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
                    Card library will be available in full, without any
                    restrictions.
                </Typography>
            );
        case "championship":
            return (
                <Typography variant="body2" {...rest}>
                    Library will be filtered to fullfil competitive play
                    requirements: banned and rotated out cards will be excluded.
                </Typography>
            );
        case "relic":
            return (
                <Typography variant="body2" {...rest}>
                    Library will be filtered to exlude banned cards only.
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
                        src={`/assets/icons/${faction}-deck.png`}
                    />
                </picture>
            </div>
            <div className="flex-grow grid place-content-center text-gray-900 text-2xl">
                {factions[faction]}
            </div>
        </div>
    );
}

function FactionsPicker({ selected, onChangeWarband, ...rest }) {
    
    const handleSelectWarband = (faction) => () => {
        onChangeWarband(faction);
    }

    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.values(wufactions)
                .filter(faction => faction.id != selected.id)
                .reverse()
                .map(faction => (
                    <img
                        key={faction.id}
                        className="w-10 h-10 m-1"
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
    const validSets = useMemo(() => getAllSetsValidForFormat(selectedFormat), [selectedFormat]);
    const [warband, setWarband] = useState(state.faction);
    const [hideDuplicates, setHideDuplicates] = useState(true);
    const [selectedSets, setSelectedSets] = useState(state.sets);  

    const handleFormatChange = (format) => () => {
        setSelectedFormat(format);
    };

    const closeAndUpdateFilters = () => {
        setShowFilters(false);
        dispatch({ type: 'UPDATE_FILTERS', payload: {
            faction: warband,
            sets: selectedSets,
            hideDuplicates,
            format: selectedFormat,
        }})
    }

    useEffect(() => {
        setSelectedSets(validSets);        
    }, [validSets])

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
                <Grid className={classes.filtersContainer} item xs={12} md={6}>
                    <IconButton
                        onClick={closeAndUpdateFilters}
                        className={classes.closeIcon}
                    >
                        <CloseIcon />
                    </IconButton>

                    <section className={classes.filtersContent}>
                        <SectionTitle className="mb-8" title="Warband" />

                        <SelectedFaction faction={warband.name} />

                        <FactionsPicker selected={warband} onChangeWarband={setWarband} />

                        <SectionTitle title="Format" className="my-8" />

                        <div className="flex flex-col items-center">
                            <DeckPlayFormatToggle
                                selectedFormat={selectedFormat}
                                onFormatChange={handleFormatChange}
                            />

                            <DeckPlayFormatInfo className={classes.formatInfo} format={state.format} />
                        </div>

                        <SectionTitle title="Sets" className="my-8" />

                        <div className="flex my-4">
                            <Toggle checked={hideDuplicates} onChange={setHideDuplicates} />
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
                </Grid>
            </Slide>
        </div>
    );
}

export default CardLibraryFilters;
