import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { cardType } from '../data/index';
import { Typography } from '@material-ui/core';

class CardTypeToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCardTypes: [...cardType],
            cardTypes: [...cardType]
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(expansion) {
        let cardTypes = [];
        const indexOf = this.state.selectedCardTypes.indexOf(expansion);
        console.log(indexOf);
        if(indexOf >= 0) {
            cardTypes = [...this.state.selectedCardTypes.slice(0, indexOf), ...this.state.selectedCardTypes.slice(indexOf + 1)]
        } else {
            cardTypes = [expansion, ...this.state.selectedCardTypes]
        }
        console.log(cardTypes)
        this.setState(state => ({selectedCardTypes: cardTypes}));
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.oncardTypesChange(cardTypes.map(x => cardType.indexOf(x))), 250);
    }

    renderIndex(name){
        // const name = expansionCodeName[v];
        return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
                <ToggleImageButton 
                    isOff={!this.state.selectedCardTypes.includes(name)} 
                    onImage={`/assets/icons/${name.toLowerCase()}-icon.png`}
                    offImage={`/assets/icons/${name.toLowerCase()}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, name)}
                    />
                <Typography variant="title" style={{margin: '0 0 0 .5rem', opacity: !this.state.selectedCardTypes.includes(name) ? '.4' : 1}}>{name}</Typography>        
            </div>
        );
    }

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                { this.state.cardTypes.map(v => this.renderIndex(v)) }
            </div>
        );
    }
}

export default CardTypeToggle;