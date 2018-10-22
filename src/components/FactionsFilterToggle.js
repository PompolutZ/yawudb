import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { factionIdPrefix, factions } from '../data/index';
import * as _ from 'lodash';
import { Typography } from '@material-ui/core';

class FactionsFilterToggle extends Component {
    state = {
        selectedFactions: this.props.selectedFactions,
    }

    handleToggle = faction => {
        let factions = [];
        const indexOf = this.state.selectedFactions.indexOf(faction);
        if(indexOf >= 0) {
            factions = [...this.state.selectedFactions.slice(0, indexOf), ...this.state.selectedFactions.slice(indexOf + 1)]
        } else {
            factions = [faction, ...this.state.selectedFactions]
        }

        this.setState({selectedFactions: factions});
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.onFactionsChange(factions), 350);
    }

    renderRow = faction => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}} key={faction}>
                <ToggleImageButton
                                    isOff={!this.state.selectedFactions.includes(faction)} 
                                    onImage={`/assets/icons/${faction}-icon.png`}
                                    offImage={`/assets/icons/${faction}-icon-bw.png`}
                                    onToggle={this.handleToggle.bind(this, faction)}
                                    />
                <Typography variant="button" style={{marginLeft: '.5rem'}}>{factions[faction]}</Typography>                                                    
            </div>
        );
    }

    renderColumn = faction => {
        return <ToggleImageButton key={faction}
                    isOff={!this.state.selectedFactions.includes(faction)} 
                    onImage={`/assets/icons/${faction}-icon.png`}
                    offImage={`/assets/icons/${faction}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, faction)}
                    />
    }

    render() {
        if(this.props.isVertical) {
            return (
                <div style={{display: 'flex', flexFlow: 'column wrap'}}>
                    { _.keys(factionIdPrefix).map(this.renderRow) }    
                </div>
            );
        }

        return (
            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                { _.keys(factionIdPrefix).map(this.renderColumn) }
            </div>
        );
    }
}

export default FactionsFilterToggle;