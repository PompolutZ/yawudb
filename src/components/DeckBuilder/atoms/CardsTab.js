import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { SET_VISIBLE_CARD_TYPES } from "../../../reducers/cardLibraryFilters";
import { ReactComponent as LockIcon } from "../../../svgs/lock.svg";
import { Set } from "immutable";

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

function CardsTab(props) {
    const classes = useStyles();

    const { editMode, isSelected } = props;
    const visibleCardTypes = new Set(props.types);

    const toggleTypeAtIndex = (index) => () => {
        if (!isSelected) return;

        if (visibleCardTypes.includes(index)) {
            props.onTypesChanged(visibleCardTypes.delete(index).toJS());
        } else {
            props.onTypesChanged(visibleCardTypes.add(index).toJS());
        }
    };

    const toggleTypeAtIndexesOneAndThree = () => {
        if (!isSelected) return;

        if (visibleCardTypes.includes(1) || visibleCardTypes.includes(3)) {
            props.onTypesChanged(visibleCardTypes.delete(1).delete(3).toJS());
        } else {
            props.onTypesChanged(visibleCardTypes.add(1).add(3).toJS());
        }
    };

    return (
        <div className={classes.root}>
            <div className="flex items-center">
                <Typography variant="subtitle2">cards</Typography>
                <LockIcon className="text-yellow-600 stroke-current w-3 h-3 ml-4" />
                <h6 className="text-gray-700 ml-1 text-xs">
                    {editMode
                        ? props.editRestrictedCardsCount
                        : props.restrictedCardsCount}
                    /3
                </h6>
            </div>
            <div className={classes.subhead}>
                <ToggleBox
                    isVisible={visibleCardTypes.includes(0)}
                    onToggle={toggleTypeAtIndex(0)}
                >
                    <React.Fragment>
                        <img
                            src={`/assets/icons/objective-icon.png`}
                            alt="objective"
                            className={classes.icon}
                        />
                        <Typography className={classes.item}>
                            {editMode
                                ? props.editObjectivesCount
                                : props.objectivesCount}
                        </Typography>
                    </React.Fragment>
                </ToggleBox>

                <ToggleBox
                    isVisible={
                        visibleCardTypes.includes(1) ||
                        visibleCardTypes.includes(3)
                    }
                    onToggle={toggleTypeAtIndexesOneAndThree}
                >
                    <React.Fragment>
                        <div className="flex">
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
                        </div>
                        <Typography className={classes.item}>
                            {editMode
                                ? props.editGambitsCount
                                : props.gambitsCount}
                        </Typography>
                    </React.Fragment>
                </ToggleBox>

                <ToggleBox
                    isVisible={visibleCardTypes.includes(2)}
                    onToggle={toggleTypeAtIndex(2)}
                >
                    <React.Fragment>
                        <img
                            src={`/assets/icons/upgrade-icon.png`}
                            alt="upgrade"
                            className={classes.icon}
                        />
                        <Typography className={classes.item}>
                            {editMode
                                ? props.editUpgradesCount
                                : props.upgradesCount}
                        </Typography>
                    </React.Fragment>
                </ToggleBox>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    types: state.cardLibraryFilters.visibleCardTypes,

    restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,
    objectivesCount: state.deckUnderBuild.objectivesCount,
    gambitsCount: state.deckUnderBuild.gambitsCount,
    upgradesCount: state.deckUnderBuild.upgradesCount,

    editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
    editObjectivesCount: state.deckUnderEdit.objectivesCount,
    editGambitsCount: state.deckUnderEdit.gambitsCount,
    editUpgradesCount: state.deckUnderEdit.upgradesCount,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onTypesChanged: (value) =>
            dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsTab);
