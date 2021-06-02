import React, { useEffect, useReducer, useState } from "react";
import CardsTab from "./CardsTab";
import { animated, useSpring } from "react-spring";
import { OBJECTIVE_GLORY_FILTERS } from "./constants/objectiveGloryFilters";
import { OBJECTIVE_SCORE_TYPE_FILTERS } from "./constants/objectiveScoreTypeFilters";
import { KEYWORD_FILTERS } from "./constants/keywordFilters";
import { CARD_TYPE_FILTERS } from "./constants/cardTypeFilters";
import FiltersGroupToggles from "./FilterGroupToggles";

const cardTypesReducer = (state, action) => {
    switch (action.type) {
        case "Objective":
            return {
                ...state,
                [action.type]: {
                    ...state[action.type],
                    enabled: action.payload,
                },
            };
        case "Gambit":
            return {
                ...state,
                [action.type]: {
                    ...state[action.type],
                    enabled: action.payload,
                },
            };
        case "Upgrade":
            return {
                ...state,
                [action.type]: {
                    ...state[action.type],
                    enabled: action.payload,
                },
            };
    }
};

function LibraryFilters({ bounds }) {
    const [showFilters, setShowFilters] = useState(false);
    const [cardTypesFilters, dispatchCardType] = useReducer(
        cardTypesReducer,
        CARD_TYPE_FILTERS.reduce(
            (filters, filter) => ({
                ...filters,
                [filter.label]: { ...filter, enabled: true },
            }),
            {}
        )
    );

    const [enabledCardTypes, setEnabledCardTypes] = useState(
        CARD_TYPE_FILTERS.map((f) => f.label)
    );

    const [enabledKeywords, setEnabledKeywords] = useState(
        KEYWORD_FILTERS.map((f) => f.label)
    );

    const [enabledObjectiveScoreTypes, setObjectiveScoreTypes] = useState(
        OBJECTIVE_SCORE_TYPE_FILTERS.map((f) => f.label)
    );
    const [enabledGloryFilters, setEnabledGloryFilters] = useState(
        OBJECTIVE_GLORY_FILTERS.map((f) => f.label)
    );

    useEffect(() => {
        console.log(cardTypesFilters);
    }, [cardTypesFilters]);

    const styles = useSpring({
        height: showFilters ? bounds.height : 0,
        width: bounds.width,
        top: bounds.top,
        left: bounds.left,
        position: "absolute",
        zIndex: 1,
    });

    const clicked = () => {
        setShowFilters((prev) => !prev);
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

    return (
        <>
            <CardsTab
                enabledTypes={enabledCardTypes}
                onToggleType={handleToggleKeyword(
                    enabledCardTypes,
                    setEnabledCardTypes
                )}
                onToggleShowFilters={clicked}
            />
            <animated.div className="bg-white text-gray-900" style={styles}>
                <div className={`${showFilters ? "block" : "hidden"} p-2`}>
                    <FiltersGroupToggles
                        title="Glory"
                        disabled={!enabledCardTypes.includes('Objective')}
                        filters={OBJECTIVE_GLORY_FILTERS}
                        enabledFilters={enabledGloryFilters}
                        onToggle={handleToggleKeyword(
                            enabledGloryFilters,
                            setEnabledGloryFilters
                        )}
                    />
                    <FiltersGroupToggles
                        title="Score type"
                        disabled={!enabledCardTypes.includes('Objective')}
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
                </div>
            </animated.div>
        </>
    );
}

export default LibraryFilters;
