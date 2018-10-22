import React, { Component } from 'react';
import firebase, { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import FactionsFilterToggle from '../components/FactionsFilterToggle';
import { Typography, Button } from '@material-ui/core';
import { filterFactionByIdRange } from '../data/index';
import { connect } from 'react-redux';
import { SET_FACTIONS_FILTER } from '../reducers/decksFilters';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const uuid4 = require('uuid/v4');

const styles = theme => ({
    root : {
        display: 'flex',
        flexFlow: 'row wrap',
    },

    filters : {
        margin: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '0 1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '0 1 auto'
        }
    },

    decksList : {
        flex: '0 1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '1 1 auto'
        }
    },
});

class Decks extends Component {
    state = {
        decks: new List(),
        loading: false
    }

    componentDidMount = async () => {
        await this._reloadWithFilters();
    }

    _reloadDecks = async query => {
        try {
            this.setState({ loading: true });
            query.forEach(async doc => {
                const deck = doc.data();
                if(deck.author !== 'Anonymous') {
                    const userProfileRef = await db.collection('users').doc(deck.author).get();
                    this.setState(state => ({ decks: state.decks.push({...deck, id: doc.id, author: userProfileRef.data().displayName})} ));        
                } else {
                    this.setState(state => ({ decks: state.decks.push({...deck, id: doc.id })}));
                }
            });

            this.setState({loading: false});
        } catch(error) {
            console.log(error);
        }
    }

    _reloadWithFilters = async () => {
        this.setState({ loading: true, decks: new List() });
        const decksRef = db.collection('decks');
        const id = firebase.firestore.FieldPath.documentId;
        const queries = this.props.selectedFactions.map(faction => {
            const { start, end } = filterFactionByIdRange[faction];
            if(start && end) {
                return decksRef.where(id(), ">=", start).where(id(), "<", end);
            } else {
                return decksRef.where(id(), ">=", start);
            }
        });

        for(let query of queries) {
            const querySnapshot = await query.get();
            querySnapshot.forEach(async doc => {
                const deck = doc.data();
                const created = deck.created.toDate();
                if(deck.author !== 'Anonymous') {
                    const userProfileRef = await db.collection('users').doc(deck.author).get();
                    this.setState(state => ({ 
                        loading: false,
                        decks: state.decks.push({ ...deck, id: doc.id, created: created, author: userProfileRef.data().displayName })}));
                } else {
                    this.setState(state => ({ 
                        loading: false,
                        decks: state.decks.push({ ...deck, id: doc.id, created: created})}));
                }
            });
        }
    }

    render() {
        const { classes, history } = this.props;
        return (
            <div className={classes.root}>
                <div className={classnames(classes.filters)}>
                    <Typography variant="body2" style={{marginBottom: '.5rem'}}>Show decks for selected factions:</Typography>
                    <FactionsFilterToggle isVertical={window.matchMedia('(min-width: 800px)').matches} onFactionsChange={this.props.onFactionsChange} selectedFactions={this.props.selectedFactions} />
                    <Button style={{backgroundColor: '#3B9979', color: 'white', alignSelf:'flex-end', marginTop: '1rem'}}
                            onClick={this._reloadWithFilters}>
                        Reload
                    </Button>
                </div>
                <div className={classnames(classes.decksList)}>
                    {
                        this.state.loading && (
                            <div style={{display: 'flex', height: '100vh'}}>
                                <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                                    <CircularProgress style={{color: '#3B9979'}} />
                                    <div>Fetching decks...</div>
                                </div>
                            </div>
                        ) 
                    }
                    {
                        this.state.decks
                            .sortBy(d => d.created, (date1, date2) => date2 - date1)
                            .map(d => <DeckOverview key={uuid4()} {...d} />)
                    }
                </div>
                <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedFactions: state.decksFilters.showDecksForFactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFactionsChange: factions => dispatch({ type: SET_FACTIONS_FILTER, payload: factions })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Decks)));