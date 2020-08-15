import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../components/MenuAppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "1rem .5rem",
        [theme.breakpoints.up("sm")]: {
            margin: `1rem .5rem 1rem calc(${drawerWidth}px + .5rem)`
        },
    },

    disclaimer: {
        fontSize: "8px",
    }
}));

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Typography variant="body2" className={classes.disclaimer}>
                The information presented on this site about Warhammer
                Underworlds, both literal and graphical, is copyrighted by Games
                Workshop. This website is not produced, endorsed, supported, or
                affiliated with Games Workshop and produced without commercial purpose in mind. 
                This website is licensed under MIT license and its source code could be found <Link href="https://github.com/PompolutZ/yawudb">here</Link>.
            </Typography>
        </footer>
    );
}

export default Footer;
