import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import OpenFormatIcon from "@material-ui/icons/Mood";
import ChampionshipFormatIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: "1rem",
        height: "1rem",
    },
}));

const RelicIcon = ({ className, style }) => (
    <SvgIcon className={className} style={style}>
        <path d="M 15 2 C 13.894531 2 13 2.894531 13 4 C 13 5.105469 13.894531 6 15 6 C 16.105469 6 17 5.105469 17 4 C 17 2.894531 16.105469 2 15 2 Z M 11.4375 5 C 8.855469 7.230469 7.738281 10.058594 7.28125 11.6875 C 7.058594 12.476563 7.273438 13.320313 7.8125 13.9375 L 10.3125 16.8125 L 12 22 L 14 22 L 12.0625 16.03125 L 10.59375 12.875 C 10.59375 12.875 10.753906 10.90625 12.25 9.28125 L 15.71875 13.75 L 17.3125 12.90625 Z M 17.375 14 L 16.34375 14.5625 L 17.8125 22 L 19 22 Z M 8.0625 15.84375 L 6 22 L 8 22 L 9.46875 17.40625 Z" />
    </SvgIcon>
);

function PlayFormatsValidity({ validFormats }) {
    const classes = useStyles();

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ChampionshipFormatIcon
                className={classes.icon}
                style={{
                    color: validFormats.includes("championship")
                        ? "#3B9979"
                        : "red",
                }}
            />
            <RelicIcon
                className={classes.icon}
                style={{
                    color: validFormats.includes("relic") ? "#3B9979" : "red",
                }}
            />
            <OpenFormatIcon
                className={classes.icon}
                style={{
                    color: validFormats.includes("open") ? "#3B9979" : "red",
                }}
            />
        </div>
    );
}

export default PlayFormatsValidity;
