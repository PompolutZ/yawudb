import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const uuid4 = require('uuid/v4');

class MyDecks extends Component {
    state = {
        decks: new List(),
        loading: true,
        showNotification: false
    }

    async componentDidMount() {
        try {
            const userDataRef = await db.collection('users').doc(this.props.userInfo.uid).get();
            const userData = userDataRef.data();
            for(let deckId of userData.mydecks) {
                const deckRef = await db.collection('decks').doc(deckId).get();
                this.setState(state => ({decks: state.decks.push({id: deckId, ...deckRef.data()})}));
            }

            this.setState({loading: false});
        } catch(error) {
            console.log(error);
        }
    }

    handleClick = history => {
        history.push('/newdeck')
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
                <FloatingActionButton isEnabled onClick={() => this.handleClick(history)}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(MyDecks));