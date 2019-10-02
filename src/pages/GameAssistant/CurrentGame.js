import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { idPrefixToFaction } from '../../data'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: '1 100%',
        flexFlow: 'row wrap'
    },

    deckHeader: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        '& > *': {
            flex: '1 auto',
        },
    },

    deckHeaderFactionIcon: {
        width: '3rem',
        height: '3rem',
        flex: '0 0 auto',
    },

    decks: {
        display: 'flex',
        flex: '1 auto',
        flexFlow: 'row wrap',
        maxHeight: '12rem',
        // '& > div': {
        //     flex: '1 20%',
        // },
    },

    deck: {
        flex: '1 1',
        boxSizing: 'border-box',
        margin: '1rem .3rem',
        display: 'flex',
        position: 'relative',
        '& > *': {
            margin: 'auto',
        },
    },

    hand: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            maxWidth: '21.5rem',
            overflowY: 'hidden',
        },
    }
}))

function shuffle(a) {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}

function CurrentGame(props) {
    console.log(props)
    const classes = useStyles()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedFactionId, setSelectedFactionId] = useState('')
    const [, setSelectedDeckName] = useState('')
    const [objectivesDrawPile, setObjectivesDrawPile] = useState([])
    const [powersDrawPile, setPowersDrawPile] = useState([])
    const [objectivesHand, setObjectivesHand] = useState({})
    const [powersHand, setPowersHand] = useState({})
    const [viewCardDialogOpen, setViewCardDialogOpen] = useState(false)
    const [cardToView, setCardToView] = useState(null)

    useEffect(() => {
        setSelectedFactionId(props.location.state.factionId)
        setSelectedDeckName(props.location.state.name)
        setObjectivesDrawPile(
            shuffle(props.location.state.cards.filter(card => card.type === 0))
        )
        setPowersDrawPile(
            shuffle(props.location.state.cards.filter(card => card.type !== 0))
        )
    }, [])

    useEffect(() => {
        console.log('OBJECTIVES: ', objectivesDrawPile)
    }, [objectivesDrawPile])

    useEffect(() => {
        console.log('POWERS: ', powersDrawPile)
    }, [powersDrawPile])

    const handleDrawStartingHand = () => {
        setObjectivesHand(
            objectivesDrawPile
                .slice(0, 3)
                .reduce((hand, card) => ({ ...hand, [card.id]: card }), {})
        )
        setObjectivesDrawPile(prev => prev.slice(3));
        setPowersHand(
            powersDrawPile
                .slice(0, 5)
                .reduce((hand, card) => ({ ...hand, [card.id]: card }), {})
        )
        setPowersDrawPile(prev => prev.slice(5))
    }

    const handleDrawObjective = () => {
    }

    const handleDrawPowerCard = () => {
        const card = powersDrawPile.shift();
        setPowersHand(prev => ({ ...prev, [card.id]: card }));
    }

    const handleOpenViewCard = card => () => {
        setCardToView(card)
        setViewCardDialogOpen(true)
    }

    const handleCloseViewCard = () => {
        setViewCardDialogOpen(false)
        setCardToView(null)
    }

    return (
        <div className={classes.root}>
                <div className={classes.deckHeader}>
                    <img
                        src={`/assets/icons/${idPrefixToFaction[selectedFactionId]}-icon.png`}
                        className={classes.deckHeaderFactionIcon}
                    />
                </div>
                <div style={{ flex: '1 100%', display: 'flex', flexFlow: 'column nowrap' }}>
                    <div style={{ borderBottom: '1px solid gray' }}>
                        <Typography variant="subtitle2">Draw Piles</Typography>
                    </div>
                    <div className={classes.decks}>
                        <div className={classes.deck}>
                            <img
                                src={`/assets/icons/ObjectivesBack.png`}
                                style={{ maxWidth: '8rem' }}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                style={{
                                    position: 'absolute',
                                    bottom: '5%',
                                    left: '25%',
                                }}
                            >
                                Draw
                            </Button>
                            <div style={{ position: 'absolute', top: '-1rem', left: '0', background: theme.palette.primary.main, borderRadius: '1rem', padding: '.3rem .5rem', border: '2px solid white' }}>
                                <Typography variant="subtitle2" style={{ color: 'white' }}>{objectivesDrawPile.length}</Typography>
                            </div>
                        </div>
                        <div className={classes.deck}>
                            <img
                                src={`/assets/icons/PowerCardsBack.png`}
                                style={{ maxWidth: '8rem' }}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                style={{
                                    position: 'absolute',
                                    bottom: '5%',
                                    left: '25%',
                                }}
                                onClick={handleDrawPowerCard}
                            >
                                Draw
                            </Button>
                            <div style={{ position: 'absolute', top: '-1rem', left: '0', background: theme.palette.primary.main, borderRadius: '1rem', padding: '.3rem .5rem', border: '2px solid white' }}>
                                <Typography variant="subtitle2" style={{ color: 'white' }}>{powersDrawPile.length}</Typography>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleDrawStartingHand}>
                        Draw Initial Hand
                    </Button>
                </div>
                <div style={{ flex: '1 100%', flexFlow: 'row nowrap' }}>
                    <div style={{ borderBottom: '1px solid gray' }}>
                        <Typography variant="subtitle2">Hand</Typography>
                    </div>
                    <div>
                        <Typography>{`Objectives at Hand: ${
                            Object.keys(objectivesHand).length
                        }`}</Typography>
                        <div className={classes.hand}>
                            {objectivesHand &&
                                Object.entries(objectivesHand).map(
                                    ([id, card]) => (
                                        <img
                                            onClick={handleOpenViewCard(card)}
                                            key={id}
                                            style={{
                                                width: '5rem',
                                                maxHeight: '7rem',
                                                flex: '0 0 auto',
                                                boxSizing: 'border-box',
                                                margin: '0 .3rem',
                                            }}
                                            src={`/assets/cards/${id}.png`}
                                        />
                                    )
                                )}
                        </div>
                    </div>
                    <div>
                        <Typography style={{ borderBottom: '1px solid gray' }}>
                            {`Power Cards at Hand: ${Object.keys(powersHand).length}`}
                        </Typography>
                        <div className={classes.hand}>
                            {powersHand &&
                                Object.entries(powersHand).map(([id, card]) => (
                                    <img
                                        key={id}
                                        onClick={handleOpenViewCard(card)}
                                        style={{
                                            width: '5rem',
                                            flex: '0 0 auto',
                                            maxHeight: '7rem',
                                            boxSizing: 'border-box',
                                            margin: '0 .3rem',
                                        }}
                                        src={`/assets/cards/${id}.png`}
                                    />
                                ))}
                        </div>
                    </div>
                </div>

            <Dialog
                fullScreen={fullScreen}
                open={viewCardDialogOpen}
                onClose={handleCloseViewCard}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    { cardToView ? cardToView.name : '' }
                </DialogTitle>
                <DialogContent>
                    { cardToView && (
                        <img src={`/assets/cards/${cardToView.id}.png`} style={{ width: '100%'}} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewCard} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CurrentGame
