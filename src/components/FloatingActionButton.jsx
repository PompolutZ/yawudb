import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    default: {
        position: "fixed",
        bottom: "44px",
        right: "20px",
        zIndex: 1000,
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:focus": {
            outline: 'none',
        },
        opacity: 1,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

function FloatingActionButton(props){
    const classes = useStyles();

    return (
        <Fab
            className={classes.default}
            onClick={() => props.onClick()}
        >
            {props.children}
        </Fab>
    );
}

export default FloatingActionButton;
