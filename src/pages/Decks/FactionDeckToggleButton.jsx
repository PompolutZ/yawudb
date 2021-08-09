import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { factionIdPrefix } from "../../data";
import ButtonBase from "@material-ui/core/ButtonBase";

function FactionDeckToggleButton({
    classes,
    faction,
    factionDisplayName,
    isSelected,
    onClick,
}) {
    return (
        <ButtonBase
            className={classes.root}
            style={{ opacity: isSelected ? 1 : 0.4 }}
            onClick={onClick(factionIdPrefix[faction])}
        >
            <img
                className={classes.img}
                src={`/assets/icons/${faction}-deck.png`}
                alt={factionDisplayName}
            />
        </ButtonBase>
    );
}

const styles = (theme) => ({
    root: {
        width: "3rem",
        height: "3rem",
        margin: ".5rem",
    },

    img: {
        width: "3rem",
        height: "3rem",
    },
});

export default withStyles(styles)(FactionDeckToggleButton);
