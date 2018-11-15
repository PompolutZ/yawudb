import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { cardsDb, setsIndex, setsNames, bannedCards, restrictedCards } from '../data/index';
import { Typography } from '@material-ui/core';
import { pickCardColor } from '../utils/functions';


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
        const isRestricted = Boolean(restrictedCards[this.props.match.params.id]);
        const isBanned = Boolean(bannedCards[this.props.match.params.id]);
        console.log(isRestricted);
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
                {
                    isRestricted && (
                        <div className={classes.cardInfoItem}>
                            <Typography variant="caption" style={{ color: pickCardColor(this.props.match.params.id)}}>
                                Note! This card is in the restricted list for Organized Play.
                                You can have only up to 5 restricted cards in your deck for Organized Play.
                            </Typography>
                        </div>
                    )
                }
                {
                    isBanned && (
                        <div className={classes.cardInfoItem}>
                            <Typography variant="caption" style={{ color: pickCardColor(this.props.match.params.id)}}>
                                Note! This card is in the banned list for Organized Play.
                                You cannot have banned cards in your deck for Organized Play.
                            </Typography>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withStyles(styles)(Card);