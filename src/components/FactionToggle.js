import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { factionCards } from '../data/index';
import * as _ from 'lodash';

class FactionToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            factions: {}
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
        console.log('Invoked!', value);
    }

    componentDidMount() {
        const factions = _.chain(factionCards)
            .keys()
            .drop(1)
            .reduce((acc, v) => {
                console.log(v);
                return {...acc, [v]:false};
            }, {})
            .value();
        console.log(factions);    
        this.setState(state => ({factions: factions}));    
    }

    render() {
        return (
            <div>
                { this.state.factions }
            </div>
        );
    }
}

export default FactionToggle;