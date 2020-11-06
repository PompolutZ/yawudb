import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({
    default: {
        position: "fixed",
        bottom: "44px",
        right: "20px",
        zIndex: 1000,
        color: "white",
        backgroundColor: "#3B9979",
        "&:hover": {
            backgroundColor: "#3B9979",
        },
        opacity: 1,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
});

class FloatingActionButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fab
                className={classes.default}
                onClick={() => this.props.onClick()}
            >
                {this.props.children}
            </Fab>
        );
    }
}

export default withStyles(styles)(FloatingActionButton);
