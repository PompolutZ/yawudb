import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { factionIndexes } from '../data/index';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames';

function FactionIcon({ classes, faction, cardsSet, selected, onSelected }) {
    const strippedFaction = faction.startsWith('n_') ? faction.slice(2) : faction;
    
    const handleClick = () => {
        onSelected([faction, cardsSet]);
    }

    return (
        <ButtonBase onClick={handleClick}>
            { 
                selected && (
                    <img className={classnames(classes.default, {[classes.selected]: selected})} alt={strippedFaction} src={`/assets/icons/${strippedFaction}-icon.png`} />
                )
            }
            { 
                !selected && (
                    <img className={classnames(classes.default, {[classes.selected]: selected})} alt={strippedFaction} src={`/assets/icons/${strippedFaction}-icon-bw.png`} />
                )
            }
        </ButtonBase>
    )
}

const styles = theme => ({
    default: {
        width: '2rem',
        height: '2rem',
        boxSizing: 'border-box',
        marginRight: '.3rem',
        opacity: .7,
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '.3rem'
        }
    },

    selected: {
        width: '2rem',
        height: '2rem',
        boxSizing: 'border-box',
        marginRight: '.3rem',
        opacity: 1,
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '.3rem'
        }
    }
});

export default withStyles(styles)(FactionIcon);