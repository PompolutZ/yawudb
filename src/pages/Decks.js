import React, { Component } from 'react';
import { db } from '../firebase';

const uuid4 = require('uuid/v4');

class Decks extends Component {
    state = {
        decks: []
    }

    componentDidMount() {
        db.collection('decks')
            .get()
            .then(qs => {
                qs.forEach(doc => {
                    this.setState(state => ({decks: [doc.data(), ...state.decks]}))
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <h1>Decks</h1>
                <div>
                    {
                        this.state.decks.map(d => <div key={uuid4()}>{d.name}</div>)
                    }
                </div>
            </div>
        );
    }
}

export default Decks;