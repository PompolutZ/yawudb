import React, { useState, useEffect } from "react";
import { factions, warbandsWithDefaultSet } from "../../data/index";
import keys from "lodash/keys";
import FactionIcon from "./FactionIcon";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function FactionToggleDesktopBase({ classes, faction, setFaction, edit }) {
    const [selectedFaction, setSelectedFaction] = useState(
        warbandsWithDefaultSet.filter(([f, defaultSet]) => f === faction)[0]
    );
    const strippedFaction = selectedFaction[0].startsWith("n_")
        ? selectedFaction[0].slice(2)
        : selectedFaction[0];

    useEffect(() => {
        setFaction(selectedFaction[0], selectedFaction[1]);
    }, [selectedFaction]);

    return (
        <div style={{ display: "flex", marginRight: "1rem" }}>
            <div className={classes.selectedFaction}>
                <img
                    src={`/assets/icons/${strippedFaction}-icon.png`}
                    width="72"
                    height="72"
                />
                <Typography className={classes.selectedFactionName}>
                    {factions[strippedFaction]}
                </Typography>
            </div>
            <div>
                <div>
                    <div className={classes.seasonHeader}>Nightvault:</div>
                    {warbandsWithDefaultSet
                        .slice(8)
                        .map(([f, defaultCardsSet]) => (
                            <FactionIcon
                                key={f}
                                faction={f}
                                selected={f === selectedFaction[0]}
                                onSelected={setSelectedFaction}
                                cardsSet={defaultCardsSet}
                            />
                        ))}
                </div>
                <div>
                    <div className={classes.seasonHeader}>Shadespire:</div>
                    {warbandsWithDefaultSet
                        .slice(0, 8)
                        .map(([f, defaultCardsSet]) => (
                            <FactionIcon
                                key={f}
                                faction={f}
                                selected={f === selectedFaction[0]}
                                onSelected={setSelectedFaction}
                                cardsSet={defaultCardsSet}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

const styles = (theme) => ({
    seasonHeader: {
        borderBottom: "1px solid gray",
        margin: "1rem 0 0.5rem 0",
    },

    selectedFaction: {
        alignSelf: "flex-end",
        width: "10rem",
        height: "10rem",
        margin: "1rem 1rem 0 1rem",
        boxSizing: "border-box",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
    },

    selectedFactionName: {
        marginTop: "1rem",
        fontSize: 12,
        fontWeight: 500,
        textAlign: "center",
        [theme.breakpoints.up("md")]: {
            fontSize: 18,
            fontWeight: 300,
        },
    },
});

export default withStyles(styles)(FactionToggleDesktopBase);
