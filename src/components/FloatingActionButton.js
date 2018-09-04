import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
    '@media screen and (min-width: 768px)' : {
        mobileOnly : {
            opacity: 0
        }
    },

    '@media screen and (max-width: 600px)' : {
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
            <Button variant="fab" 
                    className={`fab ${classnames(classes.default, classes.mobileOnly, {[classes.enabled]: this.props.isEnabled})}`}
                    onClick={() => this.props.onClick()}>
                {this.props.children}
            </Button>
        );
    }
}

export default withStyles(styles)(FloatingActionButton);