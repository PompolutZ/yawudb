import React, { useEffect, useState } from "react";
import CardsTab from "./CardsTab";
import { animated, useSpring } from "react-spring";
import { OBJECTIVE_GLORY_FILTERS } from "./constants/objectiveGloryFilters";
import { OBJECTIVE_SCORE_TYPE_FILTERS } from "./constants/objectiveScoreTypeFilters";
import { KEYWORD_FILTERS } from "./constants/keywordFilters";
import { CARD_TYPE_FILTERS } from "./constants/cardTypeFilters";
import FiltersGroupToggles from "./FilterGroupToggles";
import useMeasure from "react-use-measure";

const composeTypeFilters = (enabledTypes) => {
    if (enabledTypes.length === 0) {
        return () => false;
    } else {
        return composeFilters(enabledTypes, CARD_TYPE_FILTERS);
    }
};

const composeFilters = (enabledTypes, allTypeFilters) => {
    if (enabledTypes.length === 0) {
        return (card) => card;
    }

    return enabledTypes
        .map((type) => {
            const filter = allTypeFilters.find((f) => f.label === type);

            if (!filter) throw Error("Cannot find filter matching type!");

            return filter.filter;
        })
        .reduce((compFilter, fun) => {
            return compFilter
                ? (card) => compFilter(card) || fun(card)
                : (card) => fun(card);
        }, undefined);
};

function LibraryFilters({ bounds, onFiltersChanged }) {
    const [showFilters, setShowFilters] = useState(false);

    const [enabledCardTypes, setEnabledCardTypes] = useState(
        CARD_TYPE_FILTERS.map((f) => f.label)
    );

    const [enabledKeywords, setEnabledKeywords] = useState([]);

    const [enabledObjectiveScoreTypes, setObjectiveScoreTypes] = useState([]);
    const [enabledGloryFilters, setEnabledGloryFilters] = useState([]);
    const [ref, { height }] = useMeasure();

    const styles = useSpring({
        height: showFilters ? bounds.height : 0,
        width: bounds.width,
        top: height,
        left: 0,
        position: "absolute",
        zIndex: 1,
    });

    const changeShowFilters = () => {
        if (showFilters) {
            updateAllFilters();
        }

        setShowFilters((prev) => !prev);
    };

    useEffect(() => {
        updateAllFilters();
    }, [enabledCardTypes]);

    const updateAllFilters = () => {
        const typesFilter = composeTypeFilters(enabledCardTypes);

        const keywordsFilters = composeFilters(
            enabledKeywords,
            KEYWORD_FILTERS
        );
        const gloryFilters = composeFilters(
            enabledGloryFilters,
            OBJECTIVE_GLORY_FILTERS
        );
        const scoreTypeFilters = composeFilters(
            enabledObjectiveScoreTypes,
            OBJECTIVE_SCORE_TYPE_FILTERS
        );

        onFiltersChanged({
            test: (card) =>
                typesFilter(card) &&
                keywordsFilters(card) &&
                gloryFilters(card) &&
                scoreTypeFilters(card),
        });
    };

    const handleToggleKeyword = (value, update) => (keyword) => () => {
        const index = value.indexOf(keyword);
        if (index >= 0) {
            update((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
            ]);
        } else {
            update((prev) => [...prev, keyword]);
        }
    };

    const handleClearAll = () => {
        setEnabledGloryFilters([]);
        setObjectiveScoreTypes([]);
        setEnabledKeywords([]);
    };

    return (
        <div className="relative" ref={ref}>
            <CardsTab
                enabledTypes={enabledCardTypes}
                onToggleType={handleToggleKeyword(
                    enabledCardTypes,
                    setEnabledCardTypes
                )}
                totalActiveFilters={
                    enabledKeywords.length +
                    enabledObjectiveScoreTypes.length +
                    enabledGloryFilters.length
                }
                onToggleShowFilters={changeShowFilters}
            />
            <animated.div className="bg-white text-gray-900" style={styles}>
                <div
                    className={`${
                        showFilters ? "flex flex-col" : "hidden"
                    } p-2`}
                >
                    <FiltersGroupToggles
                        title="Glory"
                        disabled={!enabledCardTypes.includes("Objective")}
                        filters={OBJECTIVE_GLORY_FILTERS}
                        enabledFilters={enabledGloryFilters}
                        onToggle={handleToggleKeyword(
                            enabledGloryFilters,
                            setEnabledGloryFilters
                        )}
                    />
                    <FiltersGroupToggles
                        title="Score type"
                        disabled={!enabledCardTypes.includes("Objective")}
                        filters={OBJECTIVE_SCORE_TYPE_FILTERS}
                        enabledFilters={enabledObjectiveScoreTypes}
                        onToggle={handleToggleKeyword(
                            enabledObjectiveScoreTypes,
                            setObjectiveScoreTypes
                        )}
                    />
                    <FiltersGroupToggles
                        title="Keyword"
                        filters={KEYWORD_FILTERS}
                        enabledFilters={enabledKeywords}
                        onToggle={handleToggleKeyword(
                            enabledKeywords,
                            setEnabledKeywords
                        )}
                    />

                    <button
                        className="btn btn-red py-3"
                        disabled={
                            enabledGloryFilters.length === 0 &&
                            enabledKeywords.length === 0 &&
                            enabledObjectiveScoreTypes.length === 0
                        }
                        onClick={handleClearAll}
                    >
                        Clear All Filters
                    </button>
                </div>
            </animated.div>
        </div>
    );
}

export default LibraryFilters;
