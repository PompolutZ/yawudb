import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

const uuid4 = require('uuid/v4');

class Decks extends Component {
    state = {
        decks: new List(),
        loading: true
    }

    componentDidMount() {
        db.collection('decks')
            .get()
            .then(qs => {
                qs.forEach(doc => {
                    this.setState(state => ({decks: state.decks.push({id: doc.id, ...doc.data()})}));        
                });
                this.setState({loading: false});
            })
            .catch(error => console.log(error));
    }

    render() {
        const { history } = this.props;

        if(this.state.loading) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <CircularProgress style={{color: '#3B9979'}} />
                        <div>Fetching decks...</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div>
                    {
                        this.state.decks.map(d => <DeckOverview key={uuid4()} id={d.id} name={d.name} sets={d.sets} cards={d.cards} created={d.created} />)
                    }
                </div>
                <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default withRouter(Decks);