import React, { useMemo, useState } from "react";
import DelayedSearch from "../../DelayedSearch";
import { IconButton, Typography } from "@material-ui/core";
import { ReactComponent as TogglesIcon } from "../../../svgs/sliders.svg";
import { ReactComponent as CloseIcon } from "../../../svgs/x.svg";
import ExpansionsToggle from "../../ExpansionsToggle";
import { connect } from "react-redux";
import {
    CHANGE_SEARCH_TEXT,
    SET_CREATE_MODE_SETS,
    SET_EDIT_MODE_SETS,
    SET_VISIBLE_CARD_TYPES,
    SET_VISIBLE_OBJECTIVE_SCORE_TYPES,
    SET_ELIGIBLE_FOR_ORGANIZED_PLAY,
    SET_DECK_PLAY_FORMAT,
} from "../../../reducers/cardLibraryFilters";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SvgIcon from "@material-ui/core/SvgIcon";
import OpenFormatIcon from "@material-ui/icons/Mood";
import ChampionshipFormatIcon from "@material-ui/icons/EmojiEvents";
import { deckPlayFormats, factions, getValidSets, setsIndex, warbandsWithDefaultSet } from "../../../data";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import SectionTitle from "../../../v2/components/SectionTitle";
import Toggle from "../../../v2/components/HexToggle";

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

function FactionsPicker({ selected, onChangeWarband, onChangeWarbandSet, ...rest }) {
    
    const handleSelectWarband = (faction, defaultSet) => () => {
        onChangeWarband(faction);
        onChangeWarbandSet(defaultSet);
    }

    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {warbandsWithDefaultSet
                .filter(([faction]) => faction != selected)
                .map(([faction, defaultSet]) => (
                    <img
                        key={faction}
                        className="w-10 h-10 m-1"
                        onClick={handleSelectWarband(faction, defaultSet)}
                        src={`/assets/icons/${faction}-icon.png`}
                    />
                ))}
        </div>
    );
}

function CardLibraryFilters(props) {
    const { selectedFaction, setFaction } = props;
    const classes = useClasses();
    const onSelectedSetsChange = props.editMode
        ? props.onEditModeSelectedSetsChange
        : props.onCreateModeSelectedSetsChange;
    const sets = props.editMode ? props.editModeSets : props.createModeSets;

    const [showFilters, setShowFilters] = React.useState(false);
    const [format, setFormat] = React.useState(
        props.deckPlayFormat ? props.deckPlayFormat : deckPlayFormats[0]
    );

    /// Here will be new approach, keeping the rest for now
    const validSets = useMemo(() => getValidSets(format), [format]);
    const [warband, setWarband] = useState(selectedFaction);
    const [warbandsSet, setWarbandsSet] = useState(() => {
        const [,set] = warbandsWithDefaultSet.find(([faction]) => faction == selectedFaction);
        return set;
    })
    const [hideDuplicates, setHideDuplicates] = useState(true);
    const [selectedSets, setSelectedSets] = useState(sets.map(set => setsIndex[set]));  
    
    /// =============

    const toggleFiltersAreaVisibility = () => {
        // setFiltersAreaHeight((prev) => (prev === 0 ? "auto" : 0));
        setShowFilters((prev) => !prev);

        if(showFilters) {
            console.log('UPDATE ONLY WHEN HIDING FILTERS');
            setFaction(warband, warbandsSet);
            onSelectedSetsChange(selectedSets.map(s => setsIndex.indexOf(s)))
            props.onChangeDeckPlayFormat(format);
            props.onChangeEligibleForOrganizedPlay(format !== "open");
        }
    };

    const handleFormatChange = (format) => () => {
        setFormat(format);
    };

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
                <DelayedSearch
                    defaultValue={props.searchText}
                    onSearchInputChange={props.onSearchTextChange}
                />
                <IconButton onClick={toggleFiltersAreaVisibility}>
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
                        onClick={toggleFiltersAreaVisibility}
                        className={classes.closeIcon}
                    >
                        <CloseIcon />
                    </IconButton>

                    <section className={classes.filtersContent}>
                        <SectionTitle title="Warband" />

                        <SelectedFaction faction={warband} />

                        <FactionsPicker selected={warband} onChangeWarband={setWarband} onChangeWarbandSet={setWarbandsSet} />

                        <SectionTitle title="Format" className="my-8" />

                        <div className="flex flex-col items-center">
                            <DeckPlayFormatToggle
                                selectedFormat={format}
                                onFormatChange={handleFormatChange}
                            />

                            <DeckPlayFormatInfo className={classes.formatInfo} format={format} />
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

const mapStateToProps = (state) => {
    return state.cardLibraryFilters;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchTextChange: (value) =>
            dispatch({ type: CHANGE_SEARCH_TEXT, payload: value }),
        onCreateModeSelectedSetsChange: (value) =>
            dispatch({ type: SET_CREATE_MODE_SETS, payload: value }),
        onEditModeSelectedSetsChange: (value) =>
            dispatch({ type: SET_EDIT_MODE_SETS, payload: value }),
        onVisibleCardTypesChange: (value) =>
            dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
        onVisibleObjectiveScoreTypesChange: (value) =>
            dispatch({
                type: SET_VISIBLE_OBJECTIVE_SCORE_TYPES,
                payload: value,
            }),
        onChangeEligibleForOrganizedPlay: (value) =>
            dispatch({ type: SET_ELIGIBLE_FOR_ORGANIZED_PLAY, payload: value }),
        onChangeDeckPlayFormat: (value) =>
            dispatch({ type: SET_DECK_PLAY_FORMAT, payload: value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLibraryFilters);
