import React, { Component } from 'react';
import { setsIndex } from '../data/index';
import { Typography } from '@material-ui/core';
import AnimateHeight from 'react-animate-height';
import { pickCardColor } from '../utils/functions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            maxWidth: '15rem',
        },
    },

    cardName: {
        cursor: 'pointer',
    }
});

class Card extends Component {
    state = {
        isExpanded: false
    }

    render() {
        const {classes, id, name, set, percentage} = this.props;
        const animateHeight = this.state.isExpanded ? 'auto' : 0;
        return (
            <div style={{display: 'flex', flexFlow: 'column wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
                    <img src={`/assets/icons/${setsIndex[set]}-icon.png`} alt={`${setsIndex[set]}`} width="24" height="24" style={{marginRight: '.5rem'}} />
                    <Typography variant="body2"
                        className={classes.cardName} 
                        style={{marginRight: '.5rem', fontSize: `${0.5 + percentage}rem`, color: pickCardColor(id)}}
                        onClick={() => this.setState(state => ({isExpanded: !state.isExpanded}))}>
                        <u>{`${name}`}</u>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{fontSize: `${0.5 + percentage}rem`}}>{`${(percentage * 100).toFixed(2)}%`}</Typography>
                </div>
                <AnimateHeight
                    height={animateHeight}
                    duration={250}
                    easing="ease-out">
                    <img className={classes.card} src={`/assets/cards/${id}.png`} alt={id} style={{width: '100%'}} />
                </AnimateHeight>
            </div>
        );
    }
}

export default withStyles(styles)(Card);
