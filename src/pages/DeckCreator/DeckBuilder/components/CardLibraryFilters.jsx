import React, { useMemo, useState, useEffect } from "react";
import { ReactComponent as TogglesIcon } from "../../../../svgs/sliders.svg";
import { ReactComponent as CloseIcon } from "../../../../svgs/x.svg";
import { ReactComponent as CompassIcon } from "@icons/compass.svg";
import ExpansionsToggle from "../../../../components/ExpansionsToggle";
import SectionTitle from "../../../../v2/components/SectionTitle";
import Toggle from "../../../../v2/components/HexToggle";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "../..";
import {
    CHAMPIONSHIP_FORMAT,
    getAllSetsValidForFormat,
    NEMESIS_FORMAT,
    RELIC_FORMAT,
    warbandHasPlot,
    wufactions,
    wusets,
} from "../../../../data/wudb";
import DebouncedInput from "../../../../v2/components/DebouncedInput";
import { DeckPlayFormatToggle } from "../../../../v2/components/DeckPlayFormatToggle";
import { DeckPlayFormatInfo } from "../../../../v2/components/DeckPlayFormatInfo";
import IconButton from "../../../../v2/components/IconButton";
import {
    FactionDeckPicture,
    FactionPicture,
} from "@components/FactionDeckPicture";
import { Overlay } from "@components/Overlay";

function SelectedFaction({ faction = "morgwaeths-blade-coven", ...rest }) {
    return (
        <div className={`flex flex-grow ${rest.className}`}>
            <FactionDeckPicture faction={faction.name} />
            <div className="flex-grow grid place-content-center text-gray-900 text-2xl">
                {faction.displayName}
            </div>
        </div>
    );
}

const notPlayableFactionIds = [1, 38, 39, 40, 41];

function FactionsPicker({ selected, onChangeWarband, ...rest }) {
    const handleSelectWarband = (faction) => () => {
        onChangeWarband(faction);
    };

    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.values(wufactions)
                .filter(
                    (faction) =>
                        faction.id != selected.id &&
                        !notPlayableFactionIds.includes(faction.id)
                )
                .reverse()
                .map((faction) => (
                    <div className="relative" key={faction.id}>
                        <img
                            className="w-10 h-10 m-1 cursor-pointer"
                            onClick={handleSelectWarband(faction)}
                            src={`/assets/icons/${faction.name}-icon.png`}
                        />
                        {warbandHasPlot(faction.id) && (
                            <div className="absolute w-4 h-4 bg-purple-700 bottom-0 left-4 rounded-full text-white">
                                <CompassIcon className="stroke-current w-4 h-4" />
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

function CardLibraryFilters(props) {
    const state = useDeckBuilderState();
    const dispatch = useDeckBuilderDispatcher();

    const [showFilters, setShowFilters] = React.useState(false);
    const [selectedFormat, setSelectedFormat] = useState(state.format);

    /// Here will be new approach, keeping the rest for now
    const validSets = useMemo(
        () => getAllSetsValidForFormat(selectedFormat),
        [selectedFormat]
    );
    const [warband, setWarband] = useState(state.faction);
    const [hideDuplicates, setHideDuplicates] = useState(true);
    const [selectedSets, setSelectedSets] = useState(state.sets);

    useEffect(() => {
        setWarband(state.faction);
    }, [state.faction]);

    useEffect(() => {
        setSelectedSets(
            selectedFormat === NEMESIS_FORMAT
                ? [wusets["Illusory Might Universal Deck"]]
                : validSets
        );
    }, [selectedFormat, validSets]);

    const handleFormatChange = (format) => {
        setSelectedFormat(format);
    };

    const closeAndUpdateFilters = () => {
        setShowFilters(!showFilters);
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

    // useEffect(() => {
    //     console.log("TOGGLE!", showFilters);
    // }, [showFilters]);

    return (
        <>
            <div className="flex items-center">
                <IconButton
                    className="rounded-full mr-1 w-12 h-12 drop-shadow-md bg-gray-100 grid place-content-center relative hover:bg-gray-100 focus:text-purple-700"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FactionPicture
                        faction={state.faction.name}
                        size="w-11 h-11"
                    />
                </IconButton>

                <DebouncedInput
                    className="rounded h-12 bg-gray-200 box-border flex-1 py-1 px-2 outline-none border-2 focus:border-purple-700"
                    placeholder="Search for any text on card"
                    onChange={props.onSearchTextChange}
                />
                <IconButton
                    className="rounded-full ml-3 px-2 w-11 h-11 grid place-content-center relative hover:bg-gray-100 focus:text-purple-700"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <TogglesIcon />
                </IconButton>
            </div>

            <Overlay visible={showFilters}>
                <div className="flex-1 flex flex-col pt-4 pb-12">
                    <IconButton
                        onClick={closeAndUpdateFilters}
                        className="rounded-full ml-3 px-2 w-11 h-11 grid place-content-center relative hover:bg-gray-100 self-end"
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
                                formats={[
                                    NEMESIS_FORMAT,
                                    CHAMPIONSHIP_FORMAT,
                                    RELIC_FORMAT,
                                ]}
                                selectedFormat={selectedFormat}
                                onFormatChange={handleFormatChange}
                            />

                            <DeckPlayFormatInfo
                                className="text-gray-900 text-sm mt-2"
                                format={selectedFormat}
                            />
                        </div>

                        <SectionTitle title="Sets" className="my-8" />

                        {selectedFormat !== NEMESIS_FORMAT && (
                            <div className="flex my-4">
                                <Toggle
                                    checked={hideDuplicates}
                                    onChange={setHideDuplicates}
                                />
                                <p className="ml-2">
                                    For dublicate cards show only newest one.
                                </p>
                            </div>
                        )}
                        <ExpansionsToggle
                            singleSet={selectedFormat === NEMESIS_FORMAT}
                            selectedFormat={selectedFormat}
                            expansions={validSets}
                            selectedExpansions={selectedSets}
                            onExpansionsChange={setSelectedSets}
                        />
                    </section>
                </div>
            </Overlay>
            {/* <Slide
                className={classes.filtersPanel}
                mountOnEnter
                in={showFilters}
                direction="right"
                timeout={{
                    enter: 300,
                    exit: 175,
                }}
            >
            </Slide> */}
        </>
    );
}

export default CardLibraryFilters;
