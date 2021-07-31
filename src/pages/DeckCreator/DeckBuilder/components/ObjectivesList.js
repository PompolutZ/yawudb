import React, { useMemo } from "react";
import ScoringOverview from "../../../../atoms/ScoringOverview";
import { CardsList } from "./CardsList";
import { CHAMPIONSHIP_FORMAT } from "../../../../data/wudb";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";
import SectionTitle from "../../../../v2/components/SectionTitle";
import { animated, useSpring } from "react-spring";
import { useResizeHeight } from "../../../../hooks/useResizeHeight";
import { ExpandCollapseButton } from "../../../../v2/components/ExpandCollapseButton";

function ObjectivesList({ selectedObjectives, format, isValid }) {
    const [measureRef, open, toggle, contentHeight] = useResizeHeight({
        open: true,
    });
    const expand = useSpring({
        height: open ? `${contentHeight}px` : '0px',
    });

    const totalGlory = useMemo(
        () =>
            selectedObjectives.reduce(
                (total, { glory }) => (total += glory),
                0
            ),
        [selectedObjectives]
    );

    const objectiveSummary = useMemo(
        () =>
            selectedObjectives.reduce(
                (acc, c) => {
                    acc[c.scoreType] += 1;
                    return acc;
                },
                { Surge: 0, End: 0, Third: 0 }
            ),
        [selectedObjectives]
    );

    const surge = useMemo(() => {
        return selectedObjectives.filter(
            (objective) => objective.scoreType === "Surge"
        );
    }, [selectedObjectives]);

    const end = useMemo(() => {
        return selectedObjectives.filter(
            (objective) => objective.scoreType === "End"
        );
    }, [selectedObjectives]);

    const third = useMemo(() => {
        return selectedObjectives.filter(
            (objective) => objective.scoreType === "Third"
        );
    }, [selectedObjectives]);

    return (
        <div
            className={`${
                isValid ? "bg-green-100" : "bg-red-200"
            } p-2 mb-4 lg:mb-0`}
        >
            <CardListSectionHeader
                className="border-none"
                type="Objectives"
                amount={selectedObjectives.length}
            >
                <>
                    <ScoringOverview
                        summary={objectiveSummary}
                        glory={totalGlory}
                    />

                    <ExpandCollapseButton
                        open={open}
                        className="ml-auto lg:hidden outline-none shadow-md text-white bg-purple-700 rounded-full hover:bg-purple-500 focus:text-white"
                        onClick={toggle}
                    />
                </>
            </CardListSectionHeader>

            <animated.div style={expand} className="overflow-hidden">
                <div ref={measureRef} className="pb-1">
                    {surge.length > 0 && (
                        <section className="mt-4 mb-2">
                            <SectionTitle className="my-2" title="Surge" />
                            <CardsList
                                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                                cards={surge}
                            />
                        </section>
                    )}
                    {end.length > 0 && (
                        <section className="mt-4 mb-4">
                            <SectionTitle
                                className="mt-4 mb-2"
                                title="End Phase"
                            />
                            <CardsList
                                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                                cards={end}
                            />
                        </section>
                    )}
                    {third.length > 0 && (
                        <section className="mt-4 mb-2">
                            <SectionTitle title="Third End Phase" />
                            <CardsList
                                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                                cards={third}
                            />
                        </section>
                    )}
                </div>
            </animated.div>
        </div>
    );
}

export default ObjectivesList;
