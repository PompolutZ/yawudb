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
import changelog from '../changelog';
import uuid4 from 'uuid/v4';
import { connect } from 'react-redux';
import { addOrUpdateLastDeck } from '../reducers/lastDeck';

const getChangeLogItemsByKey = key => {
    return Object.keys(changelog[key])
    .reduce((acc, v) => [...acc, {name: v, description: changelog[key][v]}], []);
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
        // lastAddedDeck: null
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
                    this.props.addOrUpdate(doc.id, doc.created, {...deck, id: doc.id, created: deck.created.toDate(), author: userProfileRef.data().displayName});
                    // this.setState({lastAddedDeck: });
                } else {
                    this.props.addOrUpdate(doc.id, doc.created, {...deck, id: doc.id, created: deck.created.toDate()});
                    // this.setState({lastAddedDeck: });
                }
            }))
            .catch(error => console.log(error));
    }

    render() {
        const { classes, history } = this.props;
        const lastUpdateKey = Object.keys(changelog)[0];
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
                    !this.props.lastDeck.id && (
                        <div style={{display: 'flex', height: '100vh'}}>
                            <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                                <CircularProgress style={{color: '#3B9979'}} />
                                <div>Fetching last added deck...</div>
                            </div>
                        </div>
                    )
                }
                {
                    this.props.lastDeck.id && (
                        <ReadonlyDeck 
                            name={this.props.lastDeck.data.name} 
                            author={this.props.lastDeck.data.author} 
                            created={this.props.lastDeck.data.created} 
                            sets={this.props.lastDeck.data.sets} 
                            scoringSummary={this.props.lastDeck.data.scoringSummary}
                            factionId={this.props.lastDeck.id.substr(0, this.props.lastDeck.id.length - 13)} 
                            cards={new OrderedSet(this.props.lastDeck.data.cards.map(c => ({id: c, ...cardsDb[c]})))} />                        
                    )
                }
                <FloatingActionButton isEnabled onClick={() => history.push('/deck/create')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lastDeck: state.lastDeck,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrUpdate: (id, timestamp, data) => dispatch(addOrUpdateLastDeck(id, timestamp, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Home)));