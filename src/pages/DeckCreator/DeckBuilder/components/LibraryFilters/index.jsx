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
        CARD_TYPE_FILTERS.slice(0,1).map((f) => f.label)
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

        const aggregateFilters = (card) => {
            if (enabledCardTypes.includes("Objective")) {
                return  typesFilter(card) &&
                keywordsFilters(card) &&
                gloryFilters(card) &&
                scoreTypeFilters(card);
            }

            return typesFilter(card) &&
            keywordsFilters(card);
        };

        onFiltersChanged({
            test: (card) =>
                aggregateFilters(card)
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

    const handleToggleType = (selectedTypes, allTypes, update) => type => () => {
        update([type])
    }

    const handleClearAll = () => {
        setEnabledGloryFilters([]);
        setObjectiveScoreTypes([]);
        setEnabledKeywords([]);
    };

    const calculateTotalFilterCount = (enabledCardTypes, enabledKeywords, enabledObjectiveScoreTypes, enabledGloryFilters) => {
        if (enabledCardTypes.includes("Objective")) {
            return enabledKeywords.length +
            enabledObjectiveScoreTypes.length +
            enabledGloryFilters.length;
        }

        return enabledKeywords.length;
    }

    return (
        <div className="relative" ref={ref}>
            <CardsTab
                enabledTypes={enabledCardTypes}
                onToggleType={handleToggleType(
                    enabledCardTypes,
                    CARD_TYPE_FILTERS.map((f) => f.label),
                    setEnabledCardTypes
                )}
                totalActiveFilters={
                    calculateTotalFilterCount(enabledCardTypes, enabledKeywords, enabledObjectiveScoreTypes, enabledGloryFilters)
                }
                onToggleShowFilters={changeShowFilters}
            />
            <animated.div className="bg-white text-gray-900 flex" style={styles}>
                <div
                    className={`${
                        showFilters ? "flex-1 flex flex-col overflow-y-auto" : "hidden"
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
