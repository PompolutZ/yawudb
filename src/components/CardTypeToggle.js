import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { cardType } from '../data/index';
import { Typography } from '@material-ui/core';
import { Set } from 'immutable';

class CardTypeToggle extends Component {
    state = {
        selectedCardTypes: new Set(this.props.selectedCardTypes),
    }

    handleToggle = index => {
        if(this.state.selectedCardTypes.includes(index)) {
            this.setState(state => ({ selectedCardTypes: state.selectedCardTypes.delete(index)} ));
        } else {
            this.setState(state => ({ selectedCardTypes: state.selectedCardTypes.add(index)} ));
        }
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.oncardTypesChange(this.state.selectedCardTypes.toJS()), 250);
    }

    renderIndex(name, index){
        return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <ToggleImageButton 
                    isOff={!this.state.selectedCardTypes.includes(index)} 
                    onImage={`/assets/icons/${name.toLowerCase()}-icon.png`}
                    offImage={`/assets/icons/${name.toLowerCase()}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, index)}
                    />
                <Typography variant="title" style={{margin: '0 0 0 .5rem', opacity: !this.state.selectedCardTypes.includes(index) ? '.4' : 1}}>{name}</Typography>        
            </div>
        );
    }

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                { cardType.map((v, i) => this.renderIndex(v, i)) }
            </div>
        );
    }
}

export default CardTypeToggle;