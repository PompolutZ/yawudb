import React, { PureComponent } from "react";
import ObjectiveScoreTypeIcon from "../../ObjectiveScoreTypeIcon";
import {
    setsIndex,
    totalCardsPerWave,
    bannedCards,
    restrictedCards,
} from "../../../data/index";
import { pickCardColor } from "../../../utils/functions";
import AnimateHeight from "react-animate-height";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BlockIcon from "@material-ui/icons/Block";
import LockIcon from "@material-ui/icons/Lock";
import CardRule from "../../../atoms/CardRule";
import { getCardWaveFromId, getSetNameById } from "../../../data/wudb";

const idToPrintId = (id) => {
    return `${id}/${totalCardsPerWave[parseInt(getCardWaveFromId(id))]}`;
};

const SetIcon = ({ id, setId }) => (
    <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${getSetNameById(setId)}-icon.webp`}
        />
        <img
            id={id}
            style={{ margin: "auto .1rem", width: "1.2rem", height: "1.2rem" }}
            src={`/assets/icons/${getSetNameById(setId)}-icon-24.png`}
            alt="icon"
        />
    </picture>
);

class Card extends PureComponent {
    state = {
        expanded: false,
        useTextFallback: false,
    };

    render() {
        const { card, classes, asImage } = this.props;
        const cardId = `${card.id}`.padStart(5, "0");
        const animateHeight = this.state.expanded ? "auto" : 0;

        return (
            <div>
                {asImage && (
                    <div style={{ margin: ".5rem", position: "relative" }}>
                        <img
                            alt={card.name}
                            src={`/assets/cards/${cardId}.png`}
                            style={{ width: `14rem` }}
                        />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography>Location: </Typography>
                            <SetIcon id={`${cardId}`} setId={card.setId} />
                        </div>

                        {bannedCards[card.id] && (
                            <BlockIcon className={classes.blockedIcon} />
                        )}
                        {restrictedCards[card.id] && (
                            <LockIcon className={classes.lockedIcon} />
                        )}
                    </div>
                )}
                {!asImage && (
                    <React.Fragment>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                margin: "0 0 .5rem 1rem",
                            }}
                            onClick={this._toggleExpanded}
                        >
                            <SetIcon id={`${cardId}`} setId={card.setId} />
                            <div style={{ color: pickCardColor(cardId) }}>
                                <u>{card.name}</u>
                            </div>
                            {card.glory && (
                                <div style={{ marginLeft: ".3rem" }}>
                                    ({card.glory})
                                </div>
                            )}
                            {card.scoreType >= 0 && (
                                <ObjectiveScoreTypeIcon
                                    type={card.scoreType}
                                    style={{ width: ".8rem", height: ".8rem" }}
                                />
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: ".3rem",
                                    color: "gray",
                                    fontSize: ".7rem",
                                }}
                            >
                                <div>(</div>
                                {idToPrintId(cardId)}
                                <picture>
                                    <source
                                        type="image/webp"
                                        srcSet={`/assets/icons/wave-${cardId.substr(
                                            0,
                                            2
                                        )}-icon-48.webp`}
                                    />
                                    <img
                                        id={idToPrintId(cardId)}
                                        alt={`wave-${cardId.substr(0, 2)}`}
                                        src={`/assets/icons/wave-${cardId.substr(
                                            0,
                                            2
                                        )}-icon-24.png`}
                                        style={{
                                            width: ".7rem",
                                            height: ".7rem",
                                        }}
                                    />
                                </picture>
                                <div>)</div>
                            </div>
                        </div>
                        <AnimateHeight
                            height={animateHeight}
                            duration={250}
                            easing="ease-out"
                        >
                            {!this.state.useTextFallback && (
                                <img
                                    onError={this._handleImageError}
                                    onLoad={this._handleImageLoaded}
                                    className={classes.img}
                                    src={`/assets/cards/${cardId}.png`}
                                    alt={card.id}
                                />
                            )}
                            {this.state.useTextFallback && (
                                <CardRule rule={card.rule} />
                            )}
                        </AnimateHeight>
                    </React.Fragment>
                )}
            </div>
        );
    }

    _toggleExpanded = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };

    _handleImageLoaded = () => {
        this.setState({ useTextFallback: false });
    };

    _handleImageError = (e) => {
        this.setState({ useTextFallback: true });
    };
}

const styles = (theme) => ({
    img: {
        width: "90%",
        margin: ".5rem 5%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "20rem",
        },
    },

    blockedIcon: {
        color: "rgba(255, 0, 0)",
        opacity: ".7",
        width: "10rem",
        height: "10rem",
        position: "absolute",
        zIndex: "1",
        top: "2rem",
        left: "2rem",
    },

    lockedIcon: {
        color: "goldenrod",
        opacity: ".7",
        width: "10rem",
        height: "10rem",
        position: "absolute",
        zIndex: "1",
        top: "2rem",
        left: "2rem",
    },
});

export default withStyles(styles)(Card);
