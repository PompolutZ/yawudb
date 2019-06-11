import React from 'react'
import DeckIcon from './DeckIcon'
import DeckThumbnailHeader from './DeckThumbnailHeader'
import {
    idPrefixToFaction,
    cardsDb,
    bannedCards,
    restrictedCards,
} from '../data'
import { withStyles } from '@material-ui/core/styles'
import NoValidIcon from '@material-ui/icons/ReportProblem'
import RestrictedBannedCardsCount from './RestrictedBannedCardsCount'
import { withRouter } from 'react-router-dom'
import { VIEW_DECK } from '../constants/routes'
import { FirebaseContext } from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    root: {
        display: 'flex',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        margin: '0 0 .5rem 0',
        padding: '.3rem',
        pointer: 'cursor',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem',
        },
    },
})

function FluidDeckThumbnail({
    classes,
    history,
    deckId,
    deck,
    isDraft,
    canUpdateOrDelete,
}) {
    const firebase = React.useContext(FirebaseContext)
    const [data, setData] = React.useState(deck)
    const [loading, setLoading] = React.useState(!data);
    
    const cards = data && data.cards && data.cards.map(cardId => cardsDb[cardId]) || []
    const scoringOverview = cards
        .filter(c => c.type === 0)
        .reduce(
            (acc, o) => {
                acc.summary[o.scoreType] += 1
                acc.glory += Number(o.glory)
                return acc
            },
            {
                glory: 0,
                summary: [0, 0, 0, 0],
            }
        )

    React.useEffect(() => {
        if(!data) {
            setLoading(true);
        }

        firebase.deck(deckId).on('value', snapshot => {
            const data = snapshot.val();
            setData(data);
            setLoading(false);
            const cachedDecks = JSON.parse(localStorage.getItem('yawudb_decks'));
            localStorage.setItem('yawudb_decks', JSON.stringify({...cachedDecks, [deckId]: data }));
        })

        return () => firebase.deck(deckId).off()
    }, [])

    React.useEffect(() => {
        setData(deck);
    }, [deck])

    const banned = data &&
        data.cards && data.cards.filter(c => Boolean(bannedCards[c])).length
    const restricted = data &&
        data.cards && data.cards.filter(c => Boolean(restrictedCards[c])).length
    const orginizedPlayValid = banned === 0 && restricted <= 5

    const handleClick = () =>
        history.push(`${VIEW_DECK}/${deckId}`, {
            deck: deck,
            canUpdateOrDelete: canUpdateOrDelete,
        })

    return (
        <div
            className={classes.root}
            onClick={handleClick}
        >
            {loading && (
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                    }}
                >
                    <DeckIcon
                        width="3rem"
                        height="3rem"
                        faction={idPrefixToFaction[deckId.split('-')[0]]}
                        style={{ cursor: 'pointer' }}
                    />
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                        }}
                    >
                        <CircularProgress style={{ margin: 'auto' }} />
                    </div>
                </div>
            )}
            {!loading && (
                <React.Fragment>
                    <div style={{ margin: 'auto 0', position: 'relative' }}>
                        <DeckIcon
                            width="3rem"
                            height="3rem"
                            faction={idPrefixToFaction[deckId.split('-')[0]]}
                            style={{ cursor: 'pointer' }}
                        />
                        {!orginizedPlayValid && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -20,
                                    left: 0,
                                    color: 'crimson',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <NoValidIcon style={{ width: '1.2rem' }} />
                                <RestrictedBannedCardsCount
                                    banned={banned}
                                    restricted={restricted}
                                />
                            </div>
                        )}
                    </div>
                    <DeckThumbnailHeader
                        title={data.name}
                        author={data.authorDisplayName}
                        date={data.created}
                        sets={data.sets}
                        scoringOverview={scoringOverview}
                        banned={banned}
                        restricted={restricted}
                        isDraft={isDraft}
                    />
                </React.Fragment>
            )}
            {/*  */}
        </div>
    )
}

export default withRouter(withStyles(styles)(FluidDeckThumbnail))
