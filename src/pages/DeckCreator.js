import React, { Component } from 'react';
import FactionToggle from '../components/FactionToggle';
import DeckBuilder from '../components/DeckBuilder';

class DeckCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFaction: 'garreks-reavers',
        };
        
        this.toggleFaction = this.toggleFaction.bind(this);
    }

    toggleFaction(index) {
        this.setState(state => ({selectedFaction: index}));
    } 

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '0 .5rem 0 .5rem'}}>
                    <FactionToggle onFactionChange={this.toggleFaction} />
                </div>
                <DeckBuilder key={this.state.selectedFaction} faction={this.state.selectedFaction} />
            </div>
            );
    }
}

export default DeckCreator;