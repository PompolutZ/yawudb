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

    handleToggle(faction, index) {
        this.setState(_ => ({selectedIndex: index}));
        this.props.onFactionChange(faction);
    }

    componentDidMount() {
        this.setState(state => ({factions: _.keys(factionCards)}));    
    }

    renderIndex(v, i){
        return <ToggleImageButton key={v}
                    isOff={i !== this.state.selectedIndex} 
                    onImage={`/assets/icons/${v}-icon.png`}
                    offImage={`/assets/icons/${v}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, v, i)}
                    />
    }

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                { this.state.factions.slice(1).map((v, i) => this.renderIndex(v, i)) }
            </div>
        );
    }
}

export default FactionToggle;