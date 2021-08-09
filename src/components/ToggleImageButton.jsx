import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({
    onIcon: {
        opacity: 1,
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        transition: theme.transitions.create("opacity", {
            duration: theme.transitions.duration.standard,
        }),
    },

    onIconOff: {
        opacity: 0,
    },
});

class ToggleImageButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <IconButton
                onClick={() => this.props.onToggle()}
                style={{
                    position: "relative",
                    width: "2.5rem",
                    height: "2.5rem",
                }}
            >
                <img
                    src={this.props.offImage}
                    alt="off"
                    style={{
                        opacity: 0.65,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "2.5rem",
                        height: "2.5rem",
                    }}
                />
                <img
                    className={classnames(classes.onIcon, {
                        [classes.onIconOff]: this.props.isOff,
                    })}
                    src={this.props.onImage}
                    alt="on"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                />
            </IconButton>
        );
    }
}

export default withStyles(styles)(ToggleImageButton);
