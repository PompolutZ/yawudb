import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { idPrefixToFaction } from '../../data';
import { Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Startup from './Startup';
import CurrentGame from './CurrentGame';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1rem',
        display: 'flex'
    },
}));

function GameAssistantPage(props) {
    const classes = useStyles();
    // const [selectedFactionId, setSelectedFactionId] = useState('');
    // const [selectedDeckName, setSelectedDeckName] = useState('');
    // const [selectedDeck, setSelectedDeck] = useState([]);

    // useEffect(() => {
    //     setSelectedFactionId(props.location.state.factionId);
    //     setSelectedDeckName(props.location.state.name);
    //     setSelectedDeck(props.location.state.cards);
    // }, []);

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={ROUTES.GAME_ASSISTANT} component={Startup} />
                <Route exact path={`${ROUTES.GAME_ASSISTANT}/game/:id`} component={CurrentGame} />
            </Switch>
            {/* <div>
                <Typography variant="subtitle2">Current Deck:</Typography>
                <div className={classes.deckHeader}>
                    <img src={`/assets/icons/${idPrefixToFaction[selectedFactionId]}-icon.png`} className={classes.deckHeaderFactionIcon} />
                    <Typography>{selectedDeckName}</Typography>
                </div>
                <Button></Button>
            </div> */}
        </div>
    )
}

export default GameAssistantPage;