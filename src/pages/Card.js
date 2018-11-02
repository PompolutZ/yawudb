import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { cardsDb, setsIndex, setsNames } from '../data/index';
import { Typography } from '@material-ui/core';


const styles = theme => {
    return {
        root: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            margin: '1rem'
        },

        card: {
            maxWidth: '100%',
            [theme.breakpoints.up('sm')] : {
                maxWidth: '20rem'
            },
            margin: '0 0 1rem 0'
        },

        cardInfoItem: {
            margin: '0 0 1rem 0',
            width: '100%',
            [theme.breakpoints.up('sm')] : {
                maxWidth: '20rem'
            },
        },

        row: {
            display: 'flex',
            alignItems: 'center'
        },

        setImage: {
            width: '2rem',
            height: '2rem'
        },

        setName: {
            margin: '0 0 0 .5rem'
        }
    }
}

class Card extends PureComponent {
    state = {
        card: null
    }

    componentDidMount = () => {
        this.setState({ card: cardsDb[this.props.match.params.id]});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <img src={`/assets/cards/${this.props.match.params.id}.png`} alt={`card`}
                    className={classes.card} />
                {
                    this.state.card !== null && (
                        <div className={classes.cardInfoItem}>
                            <Typography>Card location: </Typography>
                            <div className={classes.row}>
                                <img src={`/assets/icons/${setsIndex[this.state.card.set]}-icon.png`} 
                                    alt={`${setsIndex[this.state.card.set]}`}
                                    className={classes.setImage} />
                                <Typography variant="subheading" className={classes.setName}>{setsNames[this.state.card.set]}</Typography>
                            </div>    
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withStyles(styles)(Card);