import React, { Component } from 'react';
import ToggleImageButton from './ToggleImageButton';
import { expansionCardsU, expansionCodeName } from '../data/index';
import * as _ from 'lodash';

class ExpansionsToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedExpansions: [],
            expansions: []
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(expansion) {
        let expansions = [];
        const indexOf = this.state.selectedExpansions.indexOf(expansion);
        if(indexOf >= 0) {
            expansions = [...this.state.selectedExpansions.slice(0, indexOf), ...this.state.selectedExpansions.slice(indexOf + 1)]
        } else {
            expansions = [expansion, ...this.state.selectedExpansions]
        }

        this.setState(state => ({selectedExpansions: expansions}));
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.onExpansionsChange(expansions), 350);
    }

    componentDidMount() {
        this.setState(state => ({expansions: _.keys(expansionCardsU)}));    
    }

    renderIndex(v){
        const name = expansionCodeName[v];
        return <ToggleImageButton key={name}
                    isOff={!this.state.selectedExpansions.includes(v)} 
                    onImage={`/assets/icons/${name}-icon.png`}
                    offImage={`/assets/icons/${name}-icon-bw.png`}
                    onToggle={this.handleToggle.bind(this, v)}
                    />
    }

    render() {
        return (
            <div>
                { this.state.expansions.map(v => this.renderIndex(v)) }
            </div>
        );
    }
}

export default ExpansionsToggle;