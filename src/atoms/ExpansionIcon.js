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
        const { classes, set, variant, setName } = this.props;
        return (
            <div className={classes.root}>
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`/assets/icons/${setName}-icon.webp`}
                    />
                    <img
                        src={`/assets/icons/${setName}-icon-24.png`}
                        alt={`${setName}`}
                        className={
                            variant === "large"
                                ? classes.large
                                : variant === "medium"
                                ? classes.medium
                                : classes.small
                        }
                    />
                </picture>
            </div>
        );
    }
}

export default withStyles(styles)(ExpansionIcon);
