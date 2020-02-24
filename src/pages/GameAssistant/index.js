import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
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

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={ROUTES.GAME_ASSISTANT} component={Startup} />
                <Route exact path={`${ROUTES.GAME_ASSISTANT}/game/:id`} component={CurrentGame} />
            </Switch>
        </div>
    )
}

export default GameAssistantPage;