import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { idPrefixToFaction } from '../../data';
import { Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1rem'
    },

    deckHeader: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        '& > *': {
            flex: '1 auto',
        }
    },

    deckHeaderFactionIcon: {
        width: '2rem',
        height: '2rem',
        flex: '0 0 auto',
        marginRight: '.3rem',
    }
}));

function Startup(props) {
    console.log(props);
    const classes = useStyles();
    const [selectedFactionId, setSelectedFactionId] = useState('');
    const [selectedDeckName, setSelectedDeckName] = useState('');
    const [selectedDeck, setSelectedDeck] = useState([]);

    useEffect(() => {
        setSelectedFactionId(props.location.state.factionId);
        setSelectedDeckName(props.location.state.name);
        setSelectedDeck(props.location.state.cards);
    }, []);

    const handleStart = () => {
        props.history.push(`${ROUTES.GAME_ASSISTANT}/game/1`, {
            factionId: selectedFactionId,
            name: selectedDeckName,
            cards: selectedDeck
        })
    }

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle2">Current Deck:</Typography>
                <div className={classes.deckHeader}>
                    <img src={`/assets/icons/${idPrefixToFaction[selectedFactionId]}-icon.png`} className={classes.deckHeaderFactionIcon} />
                    <Typography>{selectedDeckName}</Typography>
                </div>
                <Button onClick={handleStart}>Start</Button>
            </div>
        </div>
    )
}

export default Startup;