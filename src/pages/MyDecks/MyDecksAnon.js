import React, { useState, useEffect, useContext } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FluidDeckThumbnail from '../../atoms/FluidDeckThumbnail';
import { FirebaseContext } from '../../firebase';

function MyDecksAnon({ classes }) {
    // const firebase = useContext(FirebaseContext);
    // const [deckIds, setDeckIds] = useState(JSON.parse(localStorage.getItem('yawudb_anon_deck_ids')) || []);
    // const decks = JSON.parse(localStorage.getItem('yawudb_decks')) || {};
    // useEffect(() => {
    //     firebase.decks().on('value', snapshot => {
    //         console.log('Hello');
    //         setDeckIds(JSON.parse(localStorage.getItem('yawudb_anon_deck_ids')) || []);
    //     });

    //     return () => firebase.decks().off();
    // }, []);

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h4">Oh Nooo! Seems like this page has being swallowed by a Lethal Hex.</Typography>
                <Typography>Let's hope we will see it again one day...</Typography>
                <img src="/assets/icons/lethal.png" style={{ display: 'block', margin: 'auto', filter: 'drop-shadow(0 0 10px red)'}} />
            </div>
            {/* <Typography className={classes.info}>
                <span className={classes.strongEmphasis}>Note:</span> 
                Decks you see below has quick access only from this browser, because your presence is Anonymous. 
                So, you would need to search for them among all decks if you open this app in another browser. 
                If you login, then all decks below will be automatically associated with your account and you could access them 
                here from any browser.
            </Typography>
            
            <Divider />

            {
                deckIds.length === 0 && (
                    <Typography className={classes.info}>Seems, you haven't made any decks yet.</Typography>
                )
            }
            {
                deckIds.length > 0 && (
                    deckIds.map((id, index) => <FluidDeckThumbnail key={index} deckId={id} deck={decks[id]} canUpdateOrDelete />)
                )
            } */}
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
        // background: 'magenta',
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