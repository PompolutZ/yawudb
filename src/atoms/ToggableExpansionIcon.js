import React, { PureComponent } from "react";
import ExpansionIcon from "./ExpansionIcon";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        opacity: 1,
        margin: "0 .1rem .1rem 0",
        transition: theme.transitions.create("opacity", {
            duration: theme.transitions.duration.standard,
        }),
    },

    transparentRoot: {
        opacity: 0.2,
        margin: "0 .1rem .1rem 0",
        transition: theme.transitions.create("opacity", {
            duration: theme.transitions.duration.standard,
        }),
    },
});

function ToggableExpansionIcon(props){
    const { classes, set, variant } = props;

    return (
        <div
            className={classnames(classes.root, {
                [classes.transparentRoot]: !props.isEnabled,
            })}
            onClick={() => props.onClick(props.set)}
        >
            <ExpansionIcon setName={set} variant={variant} />
        </div>
    );

}

export default withStyles(styles)(ToggableExpansionIcon);
