import React, { Component } from 'react';
import { setInfos } from '../data/index';
import * as _ from 'lodash';
import ToggableExpansionIcon from '../atoms/ToggableExpansionIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex', 
        flexFlow: 'row wrap',
        [theme.breakpoints.down('sm')] : {
            maxWidth: '25rem',
        }
    }
});

class ExpansionsToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedExpansions: this.props.selectedSets.map(x => parseInt(x, 10)),
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(expansion) {
        const exp = parseInt(expansion, 10);
        let expansions = [];
        const indexOf = this.state.selectedExpansions.indexOf(exp);
        if(indexOf >= 0) {
            expansions = [...this.state.selectedExpansions.slice(0, indexOf), ...this.state.selectedExpansions.slice(indexOf + 1)]
        } else {
            expansions = [exp, ...this.state.selectedExpansions]
        }

        this.setState({selectedExpansions: expansions});
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.onExpansionsChange(expansions), 350);
    }

    renderIndex(v){
        return (
            <ToggableExpansionIcon key={v} set={v} variant="large" isEnabled={this.state.selectedExpansions.includes(parseInt(v, 10))}
                onClick={this.handleToggle} />
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                { _.keys(setInfos).map(v => this.renderIndex(v)) }
            </div>
        );
    }
}

export default withStyles(styles)(ExpansionsToggle);