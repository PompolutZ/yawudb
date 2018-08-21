import React, { Component } from 'react';
import "./Home.css";
import * as _ from 'lodash';
import { OrderedSet } from 'immutable';

import WUCard from '../components/WUCard';
import FactionToggle from '../components/FactionToggle';
import { cardsDb, factionCards } from '../data/index';
import * as dbu from '../utils';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: new OrderedSet()
        };
        
        this.toggleChosenAxes = this.toggleChosenAxes.bind(this);
        this.loadCards = this.loadCards.bind(this);
        this.clearCards = this.clearCards.bind(this);
    }

    loadCards(factionCards) {
        console.log(factionCards);
        for(let i = factionCards[dbu.FactionFirstCardIndex]; i <= factionCards[dbu.FactionLastCardIndex]; i++) {
            const cardNumber = dbu.getDbIndexByWaveAndCard(factionCards[dbu.WaveIndex], i);
            const { name, type, set } = cardsDb[cardNumber];
            const card = <WUCard key={cardNumber} id={cardNumber} cardN={i} name={name} type={type} set={set} />;
            this.setState(state => ({cards: state.cards.add(card)}));
        }
    }

    clearCards(factionCards) {
        this.setState(state => ({cards: new OrderedSet()}));
    }

    toggleChosenAxes(index) {
        this.clearCards();
        this.loadCards(factionCards[index]);
    } 

    componentDidMount() {
        this.loadCards(factionCards['garreks-reavers']);
    }

    render() {
        let content;
        if(this.state.cards.isEmpty()) {
            content = <div>Please, select faction to see corresponding cards.</div>;
        } else {
            content = this.state.cards
        }

        return (
            <div>
                <div>{ `Total shown cards: ${this.state.cards.count()}` }</div>
                <FactionToggle onFactionChange={this.toggleChosenAxes} />
                { content }
            </div>
            );
    }
}

export default Home;