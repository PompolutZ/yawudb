import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
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
            if(!userData) {
                this.setState({loading: false});
                return;
            }

            for(let deckId of userData.mydecks) {
                const deckRef = await db.collection('decks').doc(deckId).get();
                const data = deckRef.data();
                const created = data.created.toDate();
                this.setState(state => ({decks: state.decks.push({...data, id: deckId, created: created, author:this.props.userInfo.displayName})}));
            }

            this.setState({loading: false});
        } catch(error) {
            console.log(error);
        }
    }

    handleClick = history => {
        history.goBack()//push('/newdeck')
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
                { this.state.decks.count() === 0 && 
                    <div style={{display: 'flex', height: '80vh', flexFlow: 'column nowrap'}}>
                        <Typography variant="title" style={{margin: 'auto auto 1rem auto'}}>You don't have any decks yet.</Typography>
                        <Typography variant="headline" style={{margin: '0 auto auto auto'}}>Why not to make one?</Typography>
                    </div> 
                }
                <div>
                    {
                        this.state.decks.map(deck => <DeckOverview key={uuid4()} isEditable {...deck} />)
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