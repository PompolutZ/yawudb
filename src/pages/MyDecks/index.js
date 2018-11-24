import React, { Component, PureComponent } from 'react';
import { db } from '../../firebase';
// import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrUpdateMyDeck, removeMyDecks } from '../../reducers/mydecks';
import isEqual from 'lodash/isEqual';
import DeckThumbnail from './atoms/DeckThumbnail';
import { cardsDb, bannedCards, restrictedCards } from '../../data/index';

class MyDecks extends Component {
    state = {
        loading: this.props.decks.length === 0,
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

            const ids = [];

            for(let deckId of userData.mydecks) {
                const deckRef = await db.collection('decks').doc(deckId).get();
                const data = deckRef.data();
                const created = data.created.toDate();
                this.props.addOrUpdate(deckId, data.created, {...data, id: deckId, created: created, author:this.props.userInfo.displayName, authorId: this.props.userInfo.uid});
                ids.push(deckId);
            }

            if(this.state.loading) {
                this.setState({loading: false});
            }

            this.props.removeMissingDecks(ids);    
        } catch(error) {
            console.log(error);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
            return false;
        }

        return true;
    }

    handleClick = history => {
        history.goBack();
    }

    handleThumbnailClick = id => {
        this.props.history.push(`/view/deck/${id}`);
    }

    render() {
        const { history, decks } = this.props;

        return (
            <div>
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
                    !this.state.loading && decks.length === 0 && 
                        <div style={{display: 'flex', height: '80vh', flexFlow: 'column nowrap'}}>
                            <Typography variant="title" style={{margin: 'auto auto 1rem auto'}}>You don't have any decks yet.</Typography>
                            <Typography variant="headline" style={{margin: '0 auto auto auto'}}>Why not to make one?</Typography>
                        </div> 
                }
                {
                    !this.state.loading && decks.length > 0 && (
                        <div>
                            {
                                // decks.map(([id, deck]) => <DeckOverview key={id} isEditable {...deck} />)

                                decks.map(([id, deck]) => {
                                    const bannedCardsCount = deck.cards.filter(id => Boolean(bannedCards[id])).length;
                                    const restrictedCardsCount = deck.cards.filter(id => Boolean(restrictedCards[id])).length;

                                    return <DeckThumbnail onClick={this.handleThumbnailClick.bind(this, id)} 
                                        key={id} 
                                        factionId={id} 
                                        title={deck.name} 
                                        author={deck.author} 
                                        date={deck.created}
                                        sets={deck.sets}
                                        objectives={deck.cards.map(c => ({ id: c, ...cardsDb[c]})).filter(c => c.type === 0)}
                                        banned={bannedCardsCount}
                                        restricted={restrictedCardsCount} />
                                })
                            }
                        </div>
                    )
                }

                <FloatingActionButton isEnabled onClick={() => this.handleClick(history)}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth,
        decks: Object.entries(state.mydecks),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrUpdate: (id, timestamp, data) => dispatch(addOrUpdateMyDeck(id, timestamp, data)),
        removeMissingDecks: ids => dispatch(removeMyDecks(ids)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDecks));