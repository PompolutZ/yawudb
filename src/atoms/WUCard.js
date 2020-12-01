import React, { PureComponent, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AnimateHeight from "react-animate-height";
import { totalCardsPerWave } from "../data/index";
import CardRule from "./CardRule";
import LockIcon from "@material-ui/icons/Lock";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import {
    getCardNumberFromId,
    getCardWaveFromId,
    getSetNameById,
} from "../data/wudb";
import ObjectiveScoreTypeIcon from "../components/ObjectiveScoreTypeIcon";
import { ReactComponent as GloryIcon } from "../svgs/wu-glory.svg";
import { ReactComponent as CloseIcon } from "../svgs/x.svg";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "../pages/DeckCreator";
import { ADD_CARD_ACTION, REMOVE_CARD_ACTION } from "../pages/DeckCreator/reducer";

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        margin: "0 .5rem 0 auto",
    },

    expandOpen: {
        transform: "rotate(180deg)",
    },

    addButton: {
        position: "absolute",
        top: "1.5rem",
        right: "-.5rem",
        width: "2rem",
        height: "2rem",
        borderRadius: "1rem",
        color: "white",
        display: "flex",
    },

    inTheDeck: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        //backgroundColor: '#3B9979',
    },

    notInTheDeck: {
        //backgroundColor: '#8A1C1C',
        transform: "rotate(45deg)",
    },

    cardImg: {
        width: "calc(100% - 2rem)",
        margin: "0 1rem",
        [theme.breakpoints.up("md")]: {
            maxWidth: "20rem",
            margin: "auto",
        },
    },
}));

const factionColorsTable = {
    gr: "#860700",
    sc: "#3E4862",
    sg: "#3F2C3A",
    ib: "#406100",
    tca: "#C5580D",
    ss: "#4A220D",
    mf: "#840300",
    tf: "#323F5E",
    stc: "#323F5E",
    toftbq: "#3F6E68",
    teotn: "#275D73",
    zg: "#2B3537",
    gh: "#79522B",
    mm: "#806E84",
    tp: "#4F3A6F",
    yg: "#385033",
    ic: "#42445A",
    lhm: "#607B6F",
};

function Rank({ value }) {
    const normalized = value >= 10000 ? value / 10000 : value;
    const wholeStarsCount = Math.floor(normalized / 2);
    const wholeStars = isNaN(wholeStarsCount)
        ? []
        : new Array(wholeStarsCount).fill(1);
    const halfStars = normalized % 2 > 0 ? [0] : [];
    const rankInStars = [...wholeStars, ...halfStars];
    return (
        <div className="flex fill-current text-gray-700">
            {rankInStars.map((star, i) => {
                if (star === 1)
                    return <StarIcon key={i} style={{ width: ".8rem" }} />;
                if (star === 0)
                    return <StarHalfIcon key={i} style={{ width: ".8rem" }} />;
            })}
        </div>
    );
}

const CardTypeImage = ({ type, className }) => (
    <img
        className={`w-6 h-6 ${className}`}
        src={`/assets/icons/${type.toLowerCase()}-icon.png`}
        alt={type}
    />
);

class WUCardInfo extends PureComponent {
    render() {
        const {
            scoreType,
            isRestricted,
            isBanned,
            set,
            name,
            id,
            glory,
            onClick,
            rank,
            prefix,
        } = this.props;

        const wave = getCardWaveFromId(id);
        return (
            <div onClick={onClick}>
                <div className="flex items-center">
                    {isRestricted && (
                        <LockIcon
                            style={{
                                width: "1rem",
                                height: "1rem",
                                margin: ".2rem .3rem 0 0",
                                fill: "goldenrod",
                            }}
                        />
                    )}
                    {isBanned && (
                        <NotInterestedIcon
                            style={{
                                width: "1rem",
                                height: "1rem",
                                margin: ".2rem .3rem 0 0",
                                fill: "darkred",
                            }}
                        />
                    )}
                    <h6 className="text-sm">{name}</h6>
                    {!!scoreType && (
                        <ObjectiveScoreTypeIcon
                            type={scoreType}
                            style={{
                                width: ".8rem",
                                height: ".8rem",
                                margin: "0 .25rem",
                            }}
                        />
                    )}

                    {glory && (
                        <div className="flex items-center ml-2">
                            <GloryIcon className="bg-objectiveGold rounded-full w-4 h-4 fill-current mr-1" />

                            {glory}
                        </div>
                    )}
                </div>
                <div className="grid grid-flow-col auto-cols-max gap-1 text-gray-500">
                    {rank > 0 && (
                        <>
                            <Rank
                                color={
                                    rank >= 10000
                                        ? factionColorsTable[prefix]
                                        : "#3B9979"
                                }
                                value={rank}
                            />
                            |
                        </>
                    )}
                    <div
                        style={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            alignItems: "center",
                            margin: "0 .2rem 0 0",
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: ".75rem",
                                color: "gray",
                            }}
                        >
                            {` Set: `}
                        </Typography>
                        <img
                            alt={`${getSetNameById(set)}`}
                            style={{
                                width: ".8rem",
                                height: ".8rem",
                                marginLeft: ".2rem",
                            }}
                            src={`/assets/icons/${getSetNameById(
                                set
                            )}-icon.png`}
                        />
                    </div>
                    |
                    <div
                        style={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: ".75rem",
                                color: "gray",
                            }}
                        >
                            {`${getCardNumberFromId(id)}/${
                                totalCardsPerWave[+wave]
                            }`}
                        </Typography>
                        <img
                            alt={`wave-${wave}`}
                            style={{
                                width: ".8rem",
                                height: ".8rem",
                                marginLeft: ".2rem",
                            }}
                            src={`/assets/icons/wave-${wave}-icon.png`}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function WUCardAtom({ card, ...props }) {
    const classes = useStyles();
    const {
        selectedObjectives,
        selectedGambits,
        selectedUpgrades,
        faction,
    } = useDeckBuilderState();
    const dispatch = useDeckBuilderDispatcher();
    const [useTextFallback, setUseTextFallback] = React.useState(false);
    const {
        type,
        id,
        scoreType,
        glory,
        name,
        setId,
        rule,
        isRestricted,
        isBanned,
        withAnimation,
    } = card;

    const height = props.expanded ? "auto" : 0;
    const inDeck = useMemo(
        () =>
            [
                ...selectedObjectives,
                ...selectedGambits,
                ...selectedUpgrades,
            ].find((card) => card.id == id),
        [selectedObjectives, selectedGambits, selectedUpgrades]
    );

    const handleToggleCardInDeck = () => {
        if(inDeck) {
            dispatch({
                type: REMOVE_CARD_ACTION,
                payload: card
            })
        } else {
            dispatch({
                type: ADD_CARD_ACTION,
                payload: card
            })
        }
    }

    const pickBackgroundColor = (isRestricted, isBanned) => {
        if (isRestricted) {
            return "Goldenrod";
        }

        if (isBanned) {
            return "DarkRed";
        }

        return props.isAlter ? "rgb(224, 243, 236)" : "White";
    };

    const pickForegroundColor = (isRestricted, isBanned, defaultColor) => {
        if (isBanned || isRestricted) {
            return "white";
        }

        return defaultColor;
    };

    const handleImageLoaded = () => {
        setUseTextFallback(false);
    };

    const handleImageError = () => {
        setUseTextFallback(true);
    };

    return (
        <div
            style={{
                backgroundColor: pickBackgroundColor(false, false),
            }}
        >
            <div className="flex items-center h-16">
                <CardTypeImage className="mx-2" type={type} />
                <WUCardInfo
                    prefix={faction.abbr}
                    rank={props.ranking}
                    pickColor={pickForegroundColor}
                    isRestricted={isRestricted}
                    isBanned={isBanned}
                    set={setId}
                    name={name}
                    scoreType={scoreType}
                    type={type}
                    id={id}
                    glory={glory}
                    onClick={props.onExpandChange}
                />
                <ButtonBase
                    className={classes.expand}
                    onClick={handleToggleCardInDeck}
                >
                    <div className={`w-8 h-8 grid place-content-center ${inDeck ? 'bg-accent3-700' : 'bg-green-700'}`}>
                        <CloseIcon
                            className={`text-white stroke-current transform ${
                                inDeck ? "rotate-0" : "rotate-45"
                            }`}
                        />
                    </div>
                </ButtonBase>
            </div>
            <AnimateHeight
                duration={withAnimation ? 250 : 0}
                height={height} // see props documentation bellow
                easing="ease-out"
            >
                {useTextFallback ? (
                    <CardRule rule={rule} />
                ) : (
                    <img
                        onError={handleImageError}
                        onLoad={handleImageLoaded}
                        className={classes.cardImg}
                        alt={id}
                        src={`/assets/cards/${`${id}`.padStart(5, "0")}.png`}
                    />
                )}
            </AnimateHeight>
        </div>
    );
}

export default WUCardAtom;
