import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { SET_VISIBLE_CARD_TYPES } from "../../../../reducers/cardLibraryFilters";
import { ReactComponent as LockIcon } from "../../../../svgs/lock.svg";
import { ReactComponent as SurgeIcon } from "../../../../svgs/zap.svg";
import { Set } from "immutable";
import { useDeckBuilderState } from "../..";
import {
    validateCardForPlayFormat,
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import { ReactComponent as FilterIcon } from "../../../../svgs/filter.svg";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
    },

    header: {
        fontSize: ".8rem",
    },

    subhead: {
        display: "flex",
        padding: "auto 1rem",
        alignItems: "center",
    },

    icon: {
        width: "1rem",
        height: "1rem",
        color: "goldenrod",
    },

    fixedIcon: {
        position: "absolute",
        left: ".5rem",
        top: "0",
        zIndex: "1",
    },

    item: {
        fontSize: "1rem",
        margin: "0 .5rem 0 .2rem",
    },
}));

function ToggleBox({ children, isVisible, onToggle }) {
    return (
        <div
            className={`flex items-center ${
                isVisible ? "opacity-100" : "opacity-50"
            }`}
            onClick={onToggle}
        >
            {children}
        </div>
    );
}

function ToggleButton({ on, children, className, ...rest }) {
    return (
        <button
            className={`x-2 py-3 px-3 border-t-2 border-b-2 border-l-2 rounded-none focus:outline-none transition-colors duration-300 ${
                on
                    ? "bg-purple-100 border-purple-300 shadow-none text-gray-900"
                    : "bg-purple-500 border-purple-500 shadow-lg text-white"
            } ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

function IconButton({ children, className }) {
    return <button className={` rounded-full focus:outline-none focus:ring ring-gray-500 ${className}`}>{children}</button>;
}

function CardsTab(props) {
    const {
        selectedObjectives,
        selectedGambits,
        selectedUpgrades,
        format,
    } = useDeckBuilderState();

    const restrictedCards = useMemo(() => {
        return [
            ...selectedObjectives,
            ...selectedUpgrades,
            ...selectedGambits,
        ].filter((card) => {
            const [, , isRestricted] = validateCardForPlayFormat(card, format);
            return isRestricted;
        });
    }, [selectedObjectives, selectedUpgrades, selectedGambits, format]);

    const surgeCount = useMemo(() => {
        return selectedObjectives.filter(
            (objective) =>
                objective.scoreType === "Surge" || objective.scoreType === 0
        ).length;
    }, [selectedObjectives]);

    const visibleCardTypes = new Set(props.types);

    const toggleTypeAtIndex = (index) => () => {
        if (visibleCardTypes.includes(index)) {
            props.onTypesChanged(visibleCardTypes.delete(index).toJS());
        } else {
            props.onTypesChanged(visibleCardTypes.add(index).toJS());
        }
    };

    const toggleTypeAtIndexesOneAndThree = () => {
        if (visibleCardTypes.includes(1) || visibleCardTypes.includes(3)) {
            props.onTypesChanged(visibleCardTypes.delete(1).delete(3).toJS());
        } else {
            props.onTypesChanged(visibleCardTypes.add(1).add(3).toJS());
        }
    };

    return (
        <div className="flex items-center my-2">
            {format === CHAMPIONSHIP_FORMAT && (
                <div className="flex flex-col items-center mx-2">
                    <LockIcon className="text-yellow-600 stroke-current w-4 h-4" />
                    <h6 className="text-gray-700 text-xs">
                        {restrictedCards.length}/3
                    </h6>
                </div>
            )}
            <ToggleButton
                className="flex-1"
                on={visibleCardTypes.includes(0)}
                onClick={toggleTypeAtIndex(0)}
            >
                <div className="flex items-center space-x-1">
                    <img
                        src={`/assets/icons/objective-icon.png`}
                        alt="objective"
                        className="w-4 h-4"
                    />
                    <div>{selectedObjectives.length}</div>
                    <SurgeIcon
                        className={`stroke-current w-3 h-3 flex-shrink-0 ${
                            surgeCount > 6 ? "text-red-700" : "text-gray-700"
                        }`}
                    />
                    <h6
                        className={`ml-1 text-xs ${
                            surgeCount > 6 ? "text-red-700" : "text-gray-700"
                        }`}
                    >
                        {surgeCount}/6
                    </h6>
                </div>
            </ToggleButton>
            <ToggleButton
                className="flex-1 flex items-center space-x-1"
                on={
                    visibleCardTypes.includes(1) || visibleCardTypes.includes(3)
                }
                onClick={toggleTypeAtIndexesOneAndThree}
            >
                <img
                    src={`/assets/icons/spell-icon.png`}
                    alt="ploy"
                    className="w-4 h-4"
                />
                <img
                    src={`/assets/icons/ploy-icon.png`}
                    alt="spell"
                    className="w-4 h-4"
                />
                <div>{selectedGambits.length}</div>
            </ToggleButton>
            <ToggleButton
                className="flex-1 flex items-center space-x-1 border-r-2"
                on={visibleCardTypes.includes(2)}
                onClick={toggleTypeAtIndex(2)}
            >
                    <img
                        src={`/assets/icons/upgrade-icon.png`}
                        alt="upgrade"
                        className="w-4 h-4"
                    />
                    <div>{selectedUpgrades.length}</div>
            </ToggleButton>
            <IconButton className="rounded-full ml-3 px-2 w-11 h-11 grid place-content-center" onClick={props.onToggleShowFilters}>
                <FilterIcon className="w-6 h-6 text-gray-700 stroke-current filter drop-shadow-md" />
            </IconButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    types: state.cardLibraryFilters.visibleCardTypes,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onTypesChanged: (value) =>
            dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsTab);
