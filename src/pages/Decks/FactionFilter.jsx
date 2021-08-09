import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { factionIndexes, factions, idPrefixToFaction } from "../../data";
import FactionDeckToggleButton from "./FactionDeckToggleButton";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import FactionDeckSelectMobile from "./FactionDeckSelectMobile";

function FactionFilter({ classes, history, selectedFaction, onSelect }) {
    return (
        <div className={classes.root}>
            <div className={classes.desktop}>
                <Typography style={{ marginLeft: ".5rem" }}>
                    Faction:
                </Typography>
                {factionIndexes.slice(1).map((faction) => (
                    <FactionDeckToggleButton
                        key={faction}
                        isSelected={
                            selectedFaction === "all" ||
                            faction === idPrefixToFaction[selectedFaction]
                        }
                        faction={faction}
                        factionDisplayName={factions[faction]}
                        onClick={onSelect}
                    />
                ))}
            </div>
            <div className={classes.mobile}>
                <FactionDeckSelectMobile
                    selectedFaction={selectedFaction}
                    onChange={onSelect}
                />
            </div>
        </div>
    );
}

const styles = (theme) => ({
    root: {},

    desktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
            flexFlow: "column nowrap",
            width: "5rem",
        },
    },

    mobile: {
        // display: 'flex',
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
});

export default withRouter(withStyles(styles)(FactionFilter));
