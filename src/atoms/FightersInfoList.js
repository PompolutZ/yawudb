import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { factionMembers } from "../data/index";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class FighterCard extends PureComponent {
    render() {
        const { faction, index, inspired } = this.props;
        return (
            <img
                className={this.props.className}
                alt={`card${index}`}
                onClick={this.handleCardClick}
                src={`/assets/cards/fighters/${faction}-${index}${
                    inspired ? "-inspired" : ""
                }.png`}
            />
        );
    }

    handleCardClick = () => {
        const { faction, index, inspired } = this.props;
        this.props.onCardClick(
            `/assets/cards/fighters/${faction}-${index}${
                inspired ? "-inspired" : ""
            }.png`
        );
    };
}

class FightersInfoList extends PureComponent {
    state = {
        popupIsVisible: false,
        popupCardPath: "",
    };

    render() {
        const { classes, faction } = this.props;
        const strippedFaction = faction.startsWith("n_")
            ? faction.slice(2)
            : faction;

        return (
            <div className={classes.root}>
                {factionMembers[strippedFaction].map((item, idx) => {
                    return (
                        <div key={item} className={classes.cardsRow}>
                            <FighterCard
                                className={classes.card}
                                faction={strippedFaction}
                                index={idx + 1}
                                onCardClick={this.showPopup}
                            />
                            <FighterCard
                                inspired
                                className={classes.cardInsp}
                                faction={strippedFaction}
                                index={idx + 1}
                                onCardClick={this.showPopup}
                            />
                            {/* <img alt={item} className={classes.cardInsp} src={`/assets/cards/fighters/${strippedFaction}-${idx + 1}-inspired.png`}  /> */}
                        </div>
                    );
                })}
                <div
                    className={classes.popup}
                    style={{
                        display: !this.state.popupIsVisible ? "none" : "",
                    }}
                >
                    <img
                        alt="popup"
                        className={classes.popupCard}
                        src={this.state.popupCardPath}
                    />
                    <IconButton
                        className={classes.closePopupButton}
                        onClick={this.handleClosePopup}
                    >
                        <HighlightOffIcon
                            style={{ width: "2rem", height: "2rem" }}
                        />
                    </IconButton>
                </div>
            </div>
        );
    }

    showPopup = (path) => {
        if (window.screen.width > 800) {
            return;
        }

        this.setState((state) => ({
            popupIsVisible: !state.popupIsVisible,
            popupCardPath: path,
        }));
    };

    handleClosePopup = () => {
        this.setState({ popupIsVisible: false, popupCardPath: "" });
    };
}

const styles = (theme) => ({
    root: {
        margin: "1rem 0 0 0",
        position: "relative",
    },

    popup: {
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, .7)",
        zIndex: "1",
        height: "120vh",
        width: "100%",
        top: 0,
        left: 0,
    },

    cardsRow: {
        [theme.breakpoints.up("lg")]: {
            display: "flex",
        },
    },

    card: {
        margin: "0 .5rem 1rem 1rem",
        width: "calc(50% - 1.5rem)",
        [theme.breakpoints.up("lg")]: {
            maxWidth: "50%",
        },
    },

    popupCard: {
        width: "calc(100% - 2rem)",
        margin: "5rem 1rem 1rem 1rem",
    },

    cardInsp: {
        margin: "0 1rem 1rem .5rem",
        width: "calc(50% - 1.5rem)",
        [theme.breakpoints.up("lg")]: {
            maxWidth: "50%",
        },
    },

    closePopupButton: {
        position: "absolute",
        top: "4.5rem",
        right: ".5rem",
        zIndex: 2,
        backgroundColor: "darkred",
        color: "white",
        padding: 0,
    },
});

export default withStyles(styles)(FightersInfoList);
