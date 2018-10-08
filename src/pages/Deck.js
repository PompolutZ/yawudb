import React, { Component } from 'react';
import { db } from '../firebase';
import { ReadonlyDeck } from '../components/Deck';
import { OrderedSet } from 'immutable';
import { cardsDb } from '../data/index';
import { CircularProgress } from '@material-ui/core';

class Deck extends Component {
    state = {
        deck: null
    }

    async componentDidMount() {
        try {
            // const deckRef = await db.collection('decks').doc(this.props.match.params.id).get();
            // const deck = deckRef.data();
            // console.log(deck);
            // this.setState({deck: {id: this.props.match.params.id, ...deck}});

            const deckRef = await db.collection('decks').doc(this.props.match.params.id).get();
            const data = deckRef.data();
            const created = data.created.toDate();
            this.setState({deck: {...data, id: this.props.match.params.id, created: created}}); //, author:this.props.userInfo.displayName
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if(!this.state.deck) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <CircularProgress style={{color: '#3B9979'}} />
                        <div>Fetching last added deck...</div>
                    </div>
                </div>
            );
        }

        const { id, name, cards, sets, created } = this.state.deck;
        return(
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                {/* <div style={{margin: '1rem auto 2rem auto', fontSize: '2rem'}}>Last added deck:</div> */}
                <ReadonlyDeck name={name} created={created} sets={sets} factionId={id.substr(0, id.length - 13)} cards={new OrderedSet(cards.map(c => ({id: c, ...cardsDb[c]})))} />
                {/* <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton> */}
            </div>
        );
    }
}

export default Deck;