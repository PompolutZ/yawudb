import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { factionCards } from '../data/index';
import * as _ from 'lodash';

class FactionToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            factions: []
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(index) {
        this.setState(state => ({selectedIndex: index}));
    }

    componentDidMount() {
        const factions = _.chain(factionCards)
            .keys()
            .drop(1)
            .value();
        console.log(factions);    
        this.setState(state => ({factions: factions}));    
    }

    renderIndex(v, i){
        console.log('render', i, this.state.selectedIndex);
        return <ToggleImageButton key={v}
                    isOff={i !== this.state.selectedIndex} 
                    onImage={`/assets/icons/${v}-icon.png`}
                    offImage={`/assets/icons/${v}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, i)}
                    />
    }

    render() {
        return (
            <div>
                { this.state.factions.map((v, i) => this.renderIndex(v, i)) }
            </div>
        );
    }
}

export default FactionToggle;