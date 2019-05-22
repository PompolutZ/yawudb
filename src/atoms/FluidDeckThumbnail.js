import React, { PureComponent } from 'react'
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
import { withRouter } from 'react-router-dom';
import { VIEW_DECK } from '../constants/routes';

const styles = theme => ({
    root: {
        display: 'flex',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        margin: '0 .5rem',
        padding: '.5rem',
        pointer: 'cursor',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem',
        },
    },
})

function FluidDeckThumbnail({ classes, history, deckId, deck, isDraft }) {
    const cards =
        (deck.cards && deck.cards.map(cardId => cardsDb[cardId])) || []
    const { name, authorDisplayName, created, sets } = deck
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
    const banned =
        deck.cards && deck.cards.filter(c => Boolean(bannedCards[c])).length
    const restricted =
        deck.cards && deck.cards.filter(c => Boolean(restrictedCards[c])).length
    const orginizedPlayValid = banned === 0 && restricted <= 5

    const handleClick = () => history.push(`${VIEW_DECK}/${deckId}`, deck);

    return (
        <div className={classes.root} onClick={handleClick}>
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
                            alignItems: 'flex-end'
                        }}
                    >
                        <NoValidIcon style={{ width: '1.2rem'}} />
                        <RestrictedBannedCardsCount
                            banned={banned}
                            restricted={restricted}
                        />
                    </div>
                )}
                {/*                  */}
            </div>
            <DeckThumbnailHeader
                title={name}
                author={authorDisplayName}
                date={created}
                sets={sets}
                scoringOverview={scoringOverview}
                banned={banned}
                restricted={restricted}
                isDraft={isDraft}
            />
        </div>
    )
}

export default withRouter(withStyles(styles)(FluidDeckThumbnail));
