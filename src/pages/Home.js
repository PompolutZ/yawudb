import React, { Component } from 'react';
import "./Home.css";
import * as _ from 'lodash';
import { OrderedSet } from 'immutable';

import WUCard from '../components/WUCard';
import FactionToggle from '../components/FactionToggle';
import { cardsDb, expansionCards } from '../data/index';

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

    loadCards(cardNumbers) {
        for(let n of cardNumbers) {
            const { name, type, set } = cardsDb[n];
            const card = <WUCard key={n} id={n} cardN={n.slice(2)} name={name} type={type} set={set} />;
            this.setState(state => ({cards: state.cards.add(card)}));
        }
    }

    clearCards(cardNumbers) {
        this.setState(state => ({cards: new OrderedSet()}));
    }

    toggleChosenAxes(isOn) {
        console.log('Show Chosen Axes: ', this);
        if (isOn) {
            this.loadCards(expansionCards[3]);
        } else {
            this.clearCards();
        }
    } 

    componentDidMount() {
        this.loadCards([]);
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
                <FactionToggle />
                { content }
            </div>
            );
    }
}

export default Home;