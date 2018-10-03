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

    componentDidMount = async () => {
        try {
            const decksQuerySelector = await db.collection('decks').get();
            decksQuerySelector.forEach(async doc => {
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

        console.log('DECKS', this.state.decks.toJS().filter(x => x.author === 'AlOsQbL2p3gDsyGzH61jNE1wuqA2'));

        return (
            <div>
                <div>
                    {
                        this.state.decks.map(d => <DeckOverview key={uuid4()} {...d} />)
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