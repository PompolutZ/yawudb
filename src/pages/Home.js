import React, { Component } from 'react';
import "./Home.css";
import * as _ from 'lodash';
import { OrderedSet } from 'immutable';

import WUCard from '../components/WUCard';
import FactionToggle from '../components/FactionToggle';
import { cardsDb, factionCards, expansionCardsU } from '../data/index';
import * as dbu from '../utils';
import ExpansionsToggle from '../components/ExpansionsToggle';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            factionCards: new OrderedSet(),
            universalCards: new OrderedSet()
        };
        
        this.toggleFaction = this.toggleFaction.bind(this);
        this.loadFactionCards = this.loadFactionCards.bind(this);
        this.clearCards = this.clearCards.bind(this);
        this.toggleExpansion = this.toggleExpansion.bind(this);
    }

    _getWUCardByIdFromDB(cardId, cardPersonalNumber, isAlter) {
        const { name, type, set } = cardsDb[cardId];
        return <WUCard key={cardId} id={cardId} cardPN={cardPersonalNumber} name={name} type={type} set={set} isAlter={isAlter} />;
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
        this.clearCards();
        this.loadFactionCards(factionCards[index]);
    } 

    toggleExpansion(expansions) {
        this.loadExpansionCards(expansions)
    }

    componentDidMount() {
        this.loadFactionCards(factionCards['garreks-reavers']);
    }

    render() {
        const cards = this.state.factionCards.union(this.state.universalCards);

        let content;
        if(this.state.factionCards.isEmpty()) {
            content = <div>Please, select faction to see corresponding factionCards.</div>;
        } else {
            content = cards.map((c, i) => this._getWUCardByIdFromDB(c, parseInt(c.slice(-3)), i % 2 === 0))
        }

        return (
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
            );
    }
}

export default Home;