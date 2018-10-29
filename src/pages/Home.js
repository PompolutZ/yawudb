import React, { Component } from 'react';
import "./Home.css";
import { db } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReadonlyDeck from '../components/ReadonlyDeck';
import { OrderedSet } from 'immutable';
import { cardsDb } from '../data';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'; 

import * as changelog from '../changelog.json';
import * as _ from 'lodash';

const uuid4 = require('uuid/v4');

const getChangeLogItemsByKey = key => {
    return _.chain(changelog[key])
    .keys()
    .reduce((acc, v) => [...acc, {name: v, description: changelog[key][v]}], [])
    .value()
}

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'column wrap'
    },

    item: {
        fontFamily: 'roboto',
        fontSize: '1rem',
        color: 'white',
        marginLeft: '1rem'
    },

    changeLogItem: {
        fontFamily: 'roboto',
        fontSize: '.7rem',
        color: 'white',
        display: 'flex',
        flexFlow: 'column wrap',
        marginLeft: '1rem',
        alignItems: 'flex-start',
        marginBottom: '.5rem'
    },

    entry: {
        fontFamily: 'roboto',
    }
}

class Home extends Component {
    state = {
        lastAddedDeck: null
    }

    componentDidMount() {
        db.collection('decks')
            .orderBy('created', 'desc')
            .limit(1)
            .get()
            .then(qs => qs.forEach(async doc => {
                const deck = doc.data();
                if(deck.author !== 'Anonymous') {
                    const userProfileRef = await db.collection('users').doc(deck.author).get();
                    this.setState({lastAddedDeck: {...deck, id: doc.id, created: deck.created.toDate(), author: userProfileRef.data().displayName}});
                } else {
                    this.setState({lastAddedDeck: {...deck, id: doc.id, created: deck.created.toDate()}});
                }
            }))
            .catch(error => console.log(error));
    }

    render() {
        const { classes, history } = this.props;
        const lastUpdateKey = _.head(_.keys(changelog))
        const lastUpdate = getChangeLogItemsByKey(lastUpdateKey);
        
        return(
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{margin: '1rem', backgroundColor: '#3B9979', padding: '.3rem', borderRadius: '1rem'}}>
                    <Typography className={classes.item}>
                        { `What's new?` }
                    </Typography>

                    <div>
                        {
                            lastUpdate.map(entry => (
                                <div key={uuid4()} className={classes.changeLogItem}>
                                    <b>{`${entry.name}:`}</b>
                                    {
                                        entry.description.split('/n').map(line => (
                                            `${line}`
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div style={{margin: '1rem auto 2rem auto', fontSize: '2rem'}}>Last added deck:</div>
                {
                    !this.state.lastAddedDeck && (
                        <div style={{display: 'flex', height: '100vh'}}>
                            <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                                <CircularProgress style={{color: '#3B9979'}} />
                                <div>Fetching last added deck...</div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.lastAddedDeck && (
                        <ReadonlyDeck 
                            name={this.state.lastAddedDeck.name} 
                            author={this.state.lastAddedDeck.author} 
                            created={this.state.lastAddedDeck.created} 
                            sets={this.state.lastAddedDeck.sets} 
                            scoringSummary={this.state.lastAddedDeck.scoringSummary}
                            factionId={this.state.lastAddedDeck.id.substr(0, this.state.lastAddedDeck.id.length - 13)} 
                            cards={new OrderedSet(this.state.lastAddedDeck.cards.map(c => ({id: c, ...cardsDb[c]})))} />                        
                    )
                }
                <FloatingActionButton isEnabled onClick={() => history.push('/deck/create')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Home));