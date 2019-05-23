import React, { Component, Suspense, lazy } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrUpdateMyDeck, removeMyDecks } from '../../reducers/mydecks';
import isEqual from 'lodash/isEqual';
import DeckThumbnail from '../../atoms/DeckThumbnail';
import { cardsDb, bannedCards, restrictedCards, setInfos, getDbIndexByWaveAndCard } from '../../data/index';
import { withStyles } from '@material-ui/core/styles';
import Switch from '../../atoms/Switch';
import toPairs from 'lodash/toPairs';
import { withFirebase } from '../../firebase';
import useAuthUser from '../../hooks/useAuthUser';
import MyDecksAuth from './MyDecksAuth';
import MyDecksAnon from './MyDecksAnon';

function MyDecksPage() {
    const authUser = useAuthUser();
    return (
        <div>{
            authUser 
            ? <MyDecksAuth />
            : <MyDecksAnon />
        }</div>
    )
}

export default MyDecksPage;