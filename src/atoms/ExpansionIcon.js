import React, { PureComponent } from "react";
import { setsIndex, setsNames } from "../data/index";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },

    small: {
        width: "1rem",
        height: "1rem",
    },

    medium: {
        width: "2rem",
        height: "2rem",
    },

    large: {
        width: "3rem",
        height: "3rem",
    },
});

class ExpansionIcon extends PureComponent {
    render() {
        const { classes, set, variant } = this.props;
        return (
            <div className={classes.root}>
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`/assets/icons/${setsIndex[set]}-icon.webp`}
                    />
                    <img
                        src={`/assets/icons/${setsIndex[set]}-icon-24.png`}
                        alt={`${setsNames[set]}`}
                        className={
                            variant === "large"
                                ? classes.large
                                : variant === "medium"
                                ? classes.medium
                                : classes.small
                        }
                    />
                </picture>
                {/* 
                <img className={variant === 'large' ? classes.large : variant === 'medium' ? classes.medium : classes.small} 
                    src={`/assets/icons/${setsIndex[set]}-icon.png`} 
                    alt={`${setsNames[set]}`} /> */}
            </div>
        );
    }
}

export default withStyles(styles)(ExpansionIcon);
