import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { factionIndexes, factions } from '../data/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as _ from 'lodash';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import AnimateHeight from 'react-animate-height';

const SelectedFaction = ({ faction, style }) => (
    <div style={{...style, ...{
        display: 'flex',
        alignItems: 'center',
        margin: '.5rem',
    }}}>
        <img style={{width: '3.5rem', height: '3.5rem', margin: '0 1rem 0 0rem'}} src={`/assets/icons/${faction}-icon.png`} />
        <Typography variant="title">{`${factions[faction]}`}</Typography>
    </div>
);


class FactionToggle extends Component {
    state = {
        isExpanded: false,
        selectedFaction: this.props.selectedFaction
    }

    handleSelectFaction = faction => {
        this.setState({ selectedFaction: faction, isExpanded: false });
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.setFaction(faction), 250);
    }

    renderFactionToggleButton = faction => {
        return (
            <div key={faction} style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center'}}>
                <ToggleImageButton 
                    isOff={faction !== this.state.selectedFaction} 
                    onImage={`/assets/icons/${faction}-icon.png`}
                    offImage={`/assets/icons/${faction}-icon-bw.png`}
                    onToggle={this.handleSelectFaction.bind(this, faction)}
                    />
                <Typography variant="button" style={{marginLeft: '.5rem'}}>{`${factions[faction]}`}</Typography>
            </div>
        );
    }     

    render() {
        const height = this.state.isExpanded ? 'auto' : 0;
        return (
            <div>
                <div style={{display: 'flex', marginTop: '1rem'}}>
                    <SelectedFaction faction={this.state.selectedFaction} style={{flex: '1 1 auto'}} />
                    <IconButton style={{color: 'white', backgroundColor: '#3B9979'}}
                                onClick={() => this.setState(state => ({isExpanded: !state.isExpanded}))}>
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
                <AnimateHeight
                    duration={200}
                    easing="ease-out"
                    height={height}>
                    <div style={{display: 'flex', flexFlow: 'column wrap', margin: '0 0 0 1rem'}}>
                        <Typography>Shadespire factions:</Typography>
                        { factionIndexes.slice(1, 9).map(faction => this.renderFactionToggleButton(faction)) }                        

                        <Typography>Nightvault factions:</Typography>
                        { factionIndexes.slice(9).map(faction => this.renderFactionToggleButton(faction)) }                        
                    </div>
                </AnimateHeight>
            </div>
            
        );
    }

}

export default FactionToggle;