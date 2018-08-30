import React, { Component } from 'react';
import "./Home.css";
import { OrderedSet } from 'immutable';

import { getWUCardByIdFromDB } from '../components/WUCard';
import FactionToggle from '../components/FactionToggle';
import Deck from '../components/Deck';
import { factionCards, expansionCardsU, factions } from '../data/index';
import { db } from '../firebase';

import ExpansionsToggle from '../components/ExpansionsToggle';
import FloatingActionButton from '../components/FloatingActionButton';
import ReorderIcon from '@material-ui/icons/Reorder';

import * as dbu from '../utils';
import * as _ from 'lodash';

const uuid4 = require('uuid/v4');

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFaction: 'garreks-reavers',
            factionCards: new OrderedSet(),
            universalCards: new OrderedSet(),
            deck: new OrderedSet(),
            isMobileDeckVisible: false
        };
        
        this.toggleFaction = this.toggleFaction.bind(this);
        this.loadFactionCards = this.loadFactionCards.bind(this);
        this.clearCards = this.clearCards.bind(this);
        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.toggleCardInDeck = this.toggleCardInDeck.bind(this);
        this.handleShowDeckMobile = this.handleShowDeckMobile.bind(this);
        this.saveCurrentDeck = this.saveCurrentDeck.bind(this);
    }

    loadFactionCards(factionCards) {
        console.log(factionCards);
        for(let i = factionCards[dbu.FactionFirstCardIndex]; i <= factionCards[dbu.FactionLastCardIndex]; i++) {
            const cardId = dbu.getDbIndexByWaveAndCard(factionCards[dbu.WaveIndex], i);
            this.setState(state => ({factionCards: state.factionCards.add(cardId)}));
        }
    }

    loadExpansionCards(expansions){
        let updated = new OrderedSet();
        for (let e of expansions) {
            const expansionWave = expansionCardsU[e][0];
            const expansionCards = expansionCardsU[e].slice(1).map(c => dbu.getDbIndexByWaveAndCard(expansionWave, c));
            updated = updated.union(expansionCards);
        }

        this.setState(state => ({universalCards: updated}));
    }

    clearCards(factionCards) {
        this.setState(state => ({factionCards: new OrderedSet()}));
    }

    toggleFaction(index) {
        this.setState(state => ({selectedFaction: index}));
        this.clearCards();
        this.loadFactionCards(factionCards[index]);
    } 

    toggleExpansion(expansions) {
        this.loadExpansionCards(expansions)
    }

    toggleCardInDeck(id, type, name, set) {
        const card = {id: id, type: type, name: name, set: set};
        const existingCard = this.state.deck.find(v => v.id === id);
        if(existingCard) {
            if(this.state.deck.count() === 1) {
                this.setState(state => ({isMobileDeckVisible: false, deck: state.deck.delete(existingCard)}));
            } else {
                this.setState(state => ({deck: state.deck.delete(existingCard)}));
            }
            
        } else {
            this.setState(state => ({deck: state.deck.add(card)}));
        }
    }

    saveCurrentDeck() {
        const id = uuid4();
        const deckPayload = {
            id: `${this.state.selectedFaction}-${id.slice(-12)}`,
            name: `${factions[this.state.selectedFaction]} Deck`,
            cards: this.state.deck.map(c => c.id).toJS(),
            sets: new OrderedSet(this.state.deck.map(c => c.set)).toJS()
        }
        
        db.collection('decks').add(deckPayload).then(docRef => console.log(docRef.id)).catch(error => console.log(error));    
    }

    componentDidMount() {
        console.log('Mounted');
        this.loadFactionCards(factionCards[this.state.selectedFaction]);
    }

    componentWillUnmount() {
        console.log('Will Unmount');
    }

    handleShowDeckMobile() {
        this.setState(state => ({isMobileDeckVisible: !state.isMobileDeckVisible}));
    }

    render() {
        const cards = this.state.factionCards.union(this.state.universalCards);

        let content;
        if(this.state.factionCards.isEmpty()) {
            content = <div>Please, select faction to see corresponding factionCards.</div>;
        } else {
            content = cards.map(c => {
                const cardPN = parseInt(c.slice(-3));
                return getWUCardByIdFromDB(c, cardPN, cardPN % 2 === 0, this.toggleCardInDeck, this.state.deck.some(v => v.id === c))
            })
        }

        return (
            <div style={{display: 'flex'}}>
                <div>
                    <div style={{marginBottom: '1rem'}}>{ `Total shown factionCards: ${cards.count()}` }</div>
                    <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '0 .5rem 0 .5rem'}}>
                        <FactionToggle onFactionChange={this.toggleFaction} />
                    </div>
                    <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                        <ExpansionsToggle onExpansionsChange={this.toggleExpansion} />
                    </div>
                    { content }
                </div>
                <div className="sideDeck" style={{flex: '1 1 auto'}}>
                    <Deck faction={this.state.selectedFaction} 
                            cards={this.state.deck} 
                            onToggleCardInDeck={this.toggleCardInDeck}
                            onSave={this.saveCurrentDeck} />
                </div>
                <div className="fullscreenDeck" style={{visibility: this.state.isMobileDeckVisible && !this.state.deck.isEmpty() ? 'visible' : 'hidden', opacity: 1, transition: 'opacity 0.5s ease'}}>
                    <Deck faction={this.state.selectedFaction} 
                            cards={this.state.deck} 
                            onToggleCardInDeck={this.toggleCardInDeck}
                            onSave={this.saveCurrentDeck} />
                </div>
                <FloatingActionButton isEnabled={!this.state.deck.isEmpty()} onClick={this.handleShowDeckMobile}>
                    <ReorderIcon />
                </FloatingActionButton>
            </div>
            );
    }
}

export default Home;