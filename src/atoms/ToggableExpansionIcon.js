import React, { PureComponent } from 'react';
import ExpansionIcon from './ExpansionIcon';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        opacity: 1,
        margin: '0 .1rem .1rem 0',
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.standard,
        }),
    },

    transparentRoot: {
        opacity: 0.2,
        margin: '0 .1rem .1rem 0',
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.standard,
        }),
    }
});

class ToggableExpansionIcon extends PureComponent {
    state = {
        isEnabled: this.props.isEnabled,
    }

    render() {
        const { classes, set, variant } = this.props;
        return (
            <div className={classnames(classes.root, {[classes.transparentRoot]: !this.state.isEnabled})}
                onClick={this.handleClick}>
                <ExpansionIcon set={set} variant={variant} />
            </div>
        );
    }

    handleClick = () => {
        this.setState(state => ({ isEnabled: !state.isEnabled }));
        this.props.onClick(this.props.set);
    }
}

export default withStyles(styles)(ToggableExpansionIcon);