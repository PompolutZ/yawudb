import React, { useState, useEffect, useContext } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FluidDeckThumbnail from '../../atoms/FluidDeckThumbnail';
import { FirebaseContext } from '../../firebase';

function MyDecksAnon({ classes }) {
    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h4">Oh Nooo! Seems like this page has tried to score 'Calculated Risk' but being swallowed by a Lethal Hex!</Typography>
                <Typography>Let's hope we will see it again one day...</Typography>
                <img src="/assets/icons/lethal.png" style={{ display: 'block', margin: 'auto', filter: 'drop-shadow(0 0 10px red)'}} />
            </div>
        </div>
    )
}

const styles = theme => ({
    root: {
        display: 'grid',
        placeContent: 'center',
        flexGrow: 1,
        width: '100%',
        height: '100%',
        flexFlow: 'column nowrap',
        background: 'white',
    },

    info: {
        margin: '1rem',
        textAlign: 'justify',
    },

    strongEmphasis: {
        color: theme.palette.primary.main,
        fontWeight: 500,
        marginRight: '.1rem',
    },

    emphasis: {
        color: theme.palette.primary.main,
        marginRight: '.1rem',
    }
});

export default withStyles(styles)(MyDecksAnon);