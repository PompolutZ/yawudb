import React, { Component } from 'react';
import "./Home.css";
import { db } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReadonlyDeck } from '../components/Deck';
import { OrderedSet } from 'immutable';
import { cardsDb } from '../data';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state = {
        lastAddedDeck: null
    }

    componentDidMount() {
        db.collection('decks')
            .orderBy('created', 'desc')
            .limit(1)
            .get()
            .then(qs => qs.forEach(doc => this.setState({lastAddedDeck: {id: doc.id, ...doc.data()}})))
            .catch(error => console.log(error));
    }

    render() {
        const { history } = this.props;
        if(!this.state.lastAddedDeck) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <CircularProgress style={{color: '#3B9979'}} />
                        <div>Fetching last added deck...</div>
                    </div>
                </div>
            );
        }

        const { id, name, cards, sets, created } = this.state.lastAddedDeck;
        return(
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{margin: '1rem auto 2rem auto', fontSize: '2rem'}}>Last added deck:</div>
                <ReadonlyDeck name={name} created={created.toDate()} sets={sets} faction={id.substr(0, id.length - 13)} cards={new OrderedSet(cards.map(c => ({id: c, ...cardsDb[c]})))} />
                <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default withRouter(Home);