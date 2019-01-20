import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
    '@media screen and (min-width: 800px)' : {
        mobileOnly : {
            opacity: 0,
        }
    },

    '@media screen and (max-width: 768px)' : {
        default: {
            position: 'fixed', 
            bottom: '44px', 
            right: '20px', 
            zIndex: 3,
            color: 'white',
            backgroundColor: '#3B9979' ,
            '&:hover': {
                backgroundColor: '#3B9979'
            },
            opacity: 0,
        },

        enabled: {
            opacity: 1,
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
              }),
          }
    },
});

class FloatingActionButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fab 
                className={`fab ${classnames(classes.default, classes.mobileOnly, {[classes.enabled]: this.props.isEnabled})}`}
                onClick={() => this.props.onClick()}>
                {this.props.children}
            </Fab>
        );
    }
}

export default withStyles(styles)(FloatingActionButton);