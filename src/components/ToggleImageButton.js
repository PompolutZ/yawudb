import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
    onIcon: {
        opacity: 1,
        position: 'absolute',
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.standard,
        }),
    },
    
    onIconOff: {
        opacity: 0
    }
});

class ToggleImageButton extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isOff : props.isOff
        }
    
    } 
    handleToggle = () => {
        this.props.onToggle(this.state.isOff);
        this.setState(state => ({isOff: !state.isOff}));
    }

    render() {
        const { classes } = this.props;
        return (
            <IconButton onClick={this.handleToggle}>
                <img src={this.props.offImage} width="46" height="46" alt="off" />
                <img className={classnames(classes.onIcon, {[classes.onIconOff]: this.state.isOff})} src={this.props.onImage} width="46" height="46" alt="on    " />
            </IconButton>
        );
    }
}

export default withStyles(styles)(ToggleImageButton);
