import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { cardType } from '../data/index';
import * as _ from 'lodash';

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
        return <ToggleImageButton key={name}
                    isOff={!this.state.selectedCardTypes.includes(name)} 
                    onImage={`/assets/icons/${name.toLowerCase()}-icon.png`}
                    offImage={`/assets/icons/${name.toLowerCase()}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, name)}
                    />
    }

    render() {
        return (
            <div>
                { this.state.cardTypes.map(v => this.renderIndex(v)) }
            </div>
        );
    }
}

export default CardTypeToggle;