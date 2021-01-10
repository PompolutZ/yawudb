import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { idPrefixToFaction } from "../../data";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0rem",
        width: "100%",
    },

    deckHeader: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        "& > *": {
            flex: "1 auto",
        },
    },

    deckHeaderFactionIcon: {
        width: "2rem",
        height: "2rem",
        flex: "0 0 auto",
        marginRight: ".3rem",
    },

    container: {
        display: "flex",
        overflowX: "scroll",
        backgroundColor: "magenta",
        width: "100%",
        padding: "25px 0",
        "-webkit-scrollbar": "0px",
    },

    card: {
        flexShrink: 0,
        width: "calc(532px / 2)",
        height: "calc(746px / 2)",
        borderRadius: "10px",
        marginLeft: "10px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
}));

const clamp = (value, clampAt = 30) => {
    if (value > 0) {
        return value > clampAt ? clampAt : value;
    } else {
        return value < -clampAt ? -clampAt : value;
    }
};

function Startup(props) {
    const { state } = useLocation();
    const classes = useStyles();
    const objectives = state.cards
        .filter((c) => c.type === 0)
        .map((c) => c.id)
        .join();
    const powers = state.cards
        .filter((c) => c.type !== 0)
        .map((c) => c.id)
        .join();
    // const [style, set] = useSpring(() => ({
    //     transform: 'perspective(500px) rotateY(25deg)'
    // }));

    // const bind = useScroll(event => {
    //     set({
    //         transform: `perspective(500px) rotateY(${
    //             event.scrolling ? clamp(event.delta[0]) : 0
    //         }deg)`
    //     })
    // })

    const onTextFieldFocus = (e) => {
        e.target.select();
    };

    return (
        <div
            className={classes.root}
            style={{ display: "flex", flexFlow: "column wrap" }}
        >
            <Typography style={{ maxWidth: "300px" }}>Objectives:</Typography>
            <Divider />
            <TextField
                fullWidth
                multiline
                value={objectives}
                onFocus={onTextFieldFocus}
            />
            <br />
            <Typography>Power cards:</Typography>
            <Divider />
            <TextField
                fullWidth
                multiline
                value={powers}
                onFocus={onTextFieldFocus}
            />
            {/* <div className={classes.container} {...bind()}>
                {
                    props.location.state.cards.map(card => (
                        <animated.div 
                            key={card.id}
                            className={classes.card}
                            style={{
                                ...style,
                                backgroundImage: `url(/assets/cards/${card.id}.png)`
                            }}
                            />
                    ))
                }
            </div> */}
            {/* <div>
                <Typography variant="subtitle2">Current Deck:</Typography>
                <div className={classes.deckHeader}>
                    <img src={`/assets/icons/${idPrefixToFaction[selectedFactionId]}-icon.png`} className={classes.deckHeaderFactionIcon} />
                    <Typography>{selectedDeckName}</Typography>
                </div>
                <Button onClick={handleStart}>Start</Button>
            </div> */}
        </div>
    );
}

export default Startup;
