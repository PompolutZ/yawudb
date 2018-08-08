import React, { Component } from 'react';
import "./Home.css";

import WUCard from '../components/WUCard';
import { cardsDb } from '../data/index';

class Home extends Component {
    state = {
        cards: []
    };

    componentDidMount() {
        const _cards = [];
        const leadingZeros = ['', '0', '00']

        for (let card in cardsDb) {
            const { name, type, set } = cardsDb[card];
            const id = `01${leadingZeros[3 - card.toString().length]}${card}`;
            _cards.push(<WUCard key={id} id={id} cardN={card} name={name} type={type} set={set} />)
        }

        this.setState(state => ({cards: _cards}));
    }

    render() {
        return (
            <div>
                { this.state.cards }
            </div>
            );
    }
}

export default Home;