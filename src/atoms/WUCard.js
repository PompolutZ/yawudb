import React, { PureComponent, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ButtonBase from '@material-ui/core/ButtonBase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ReportIcon from '@material-ui/icons/Report'
import AddIcon from '@material-ui/icons/Add'
import AnimateHeight from 'react-animate-height'
import {
    cardType,
    totalCardsPerWave,
    setsIndex,
    bannedCards,
    factionIdPrefix,
} from '../data/index'
import ObjectiveScoreTypeIcon from '../components/ObjectiveScoreTypeIcon'
import { connect } from 'react-redux'
import { ADD_CARD, REMOVE_CARD } from '../reducers/deckUnderBuild'
import { Set } from 'immutable'
import { EDIT_ADD_CARD, EDIT_REMOVE_CARD } from '../reducers/deckUnderEdit'
import CardRule from './CardRule'
import { RestrictedCardSVG, Ranking } from './SVGs';
import LockIcon from '@material-ui/icons/Lock';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },

    expandOpen: {
        transform: 'rotate(180deg)',
    },

    addButton: {
        position: 'absolute',
        top: '1.5rem',
        right: '-.5rem',
        width: '2rem',
        height: '2rem',
        borderRadius: '1rem',
        color: 'white',
        display: 'flex',
    },

    inTheDeck: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        //backgroundColor: '#3B9979',
    },

    notInTheDeck: {
        //backgroundColor: '#8A1C1C',
        transform: 'rotate(45deg)',
    },

    cardImg: {
        width: 'calc(100% - 2rem)',
        margin: '0 1rem',
        [theme.breakpoints.up('md')]: {
            maxWidth: '20rem',
            margin: 'auto',
        },
    },
})

const colorsTable = [
    '#3E5E5F',
    // '#581F19',
    // '#181D57',
    '#321B3F',
    '#38461A',
    '#985519',
    '#61411A',
    '#8A1C1C',
    '#1A3965',
]

const factionColorsTable = {
    "gr": "#860700",
    "sc" : "#3E4862",
    "sg" : "#3F2C3A",
    "ib" : "#406100",
    "tca" : "#C5580D",
    "ss" : "#4A220D",
    "mf" : "#840300",
    "tf" : "#323F5E",
    "stc" : "#323F5E",
    "toftbq" : "#3F6E68",
    "teotn" : "#275D73",
    "zg" : "#2B3537",
    "gh" : "#79522B",
    "mm": "#806E84",
    "tp": "#4F3A6F",
    "yg": "#385033",
    "ic": "#42445A",
    "lhm": "#607B6F",

}

function Rank({ color, value }) {
    const normalized = value >= 10000 ? value / 10000 : value;
    console.log(Math.floor(normalized / 2), normalized);
    const wholeStarsCount = Math.floor(normalized / 2);
    const wholeStars = isNaN(wholeStarsCount) ? [] : new Array(wholeStarsCount).fill(1);
    const halfStars = normalized % 2 > 0 ? [0] : [];
    const rankInStars = [...wholeStars, ...halfStars];
    return (
        <div style={{ display: 'flex', margin: 'auto' }}>
            { rankInStars.map((star, i) => {
                if(star === 1) return <StarIcon key={i} style={{ width: '.8rem', fill: color }} />
                if(star === 0) return <StarHalfIcon key={i} style={{ width: '.8rem', fill: color }} />
            })}
        </div>
    )
}

class WUCardTypeImage extends PureComponent {
    handleClick = () => {
        this.props.toggle(this.props.id)
    }

    render() {
        const icons = [
            'objective-icon',
            'ploy-icon',
            'upgrade-icon',
            'gambit spell-icon',
        ]
        const {
            type,
            prefix,
            // addButton,
            // inTheDeck,
            isRestricted,
            // notInTheDeck,
            isAlter,
            rank,
            // readonly,
            restrictedCardsCount,
        } = this.props
        return (
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative', display: 'flex', flexFlow: 'column nowrap', width: '4rem', alignItems: 'center'}}>
                        <img
                            src={`/assets/icons/${icons[type]}.png`}
                            alt={icons[type]}
                            style={{ width: '2.5rem', height: '2.5rem' }}
                        />
                        <Rank color={rank >= 10000 ? factionColorsTable[prefix] : '#3B9979'} value={rank} />

                        {/* {
                            isRestricted && (
                                <div style={{ display: 'flex', width: '3rem', height: '3rem', position: 'absolute', top: 0, left: 0 }}>
                                    <LockIcon style={{ fill: 'goldenrod', width: '2rem', height: '2rem', margin: 'auto' }} />
                                </div>
                            )
                        } */}
                    </div>
                    {/* <div style={{ 
                        position: 'absolute', 
                        width: this.props.rank >= 10000 ? '2.7rem' : '2.5rem', 
                        height: this.props.rank >= 10000 ? '2.7rem' : '2.5rem', 
                        bottom: -15, 
                        left: -15, display: 'flex', alignItem: 'center', zIndex: 2}}>
                        <Typography style={{color: this.props.rank >= 10000 ? factionColorsTable[prefix] : '#3B9979', margin: 'auto', fontSize: '.8rem' }}>{this.props.rank >= 10000 ? this.props.rank / 10000 : this.props.rank}</Typography>
                    </div> */}
                    {/* <Ranking style={{ 
                        fill: this.props.rank >= 10000 ? factionColorsTable[prefix] : '#3B9979', 
                        width: this.props.rank >= 10000 ? '2.7rem' : '2.5rem', 
                        height: this.props.rank >= 10000 ? '2.7rem' : '2.5rem', position: 'absolute', bottom: -15, left: -15, }} /> */}
                    {/* <div style={{ position: 'absolute', bottom: -13, left: -7, width: '4rem', display: 'flex', justifyContent: 'center' }}>
                    </div> */}
                    {/* {isRestricted && (
                        <div
                            style={{
                                width: '2rem',
                                height: '2rem',
                                stroke: 'white',
                                fill: 'Goldenrod',
                                top: '0',
                                right: '-.1rem',
                                position: 'absolute',
                            }}
                        >
                            {restrictedCardsCount > 0 && (
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        style={{
                                            width: '2rem',
                                            height: '2rem',
                                            stroke: 'white',
                                            fill: 'Goldenrod',
                                            top: '-.6rem',
                                            right: '-.8rem',
                                            position: 'absolute',
                                        }}
                                    >
                                        <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3z" />
                                    </svg>
                                    <div
                                        style={{
                                            width: '2rem',
                                            height: '2rem',
                                            stroke: 'white',
                                            top: '-.6rem',
                                            right: '-.8rem',
                                            position: 'absolute',
                                            display: 'flex',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            style={{
                                                margin: 'auto',
                                                color: 'white',
                                            }}
                                        >
                                            {restrictedCardsCount}
                                        </Typography>
                                    </div>
                                </div>
                            )}
                            {restrictedCardsCount === 0 && (
                                <ReportIcon
                                    style={{
                                        width: '2rem',
                                        height: '2rem',
                                        stroke: 'white',
                                        fill: 'Goldenrod',
                                        top: '-.6rem',
                                        right: '-.8rem',
                                        position: 'absolute',
                                    }}
                                />
                            )}
                        </div>
                    )} */}
                    {/* {!readonly && (
                        <ButtonBase
                            className={classnames(addButton, inTheDeck, {
                                [notInTheDeck]: this.props.inDeck,
                            })}
                            style={{
                                border: `.1rem solid ${
                                    isAlter ? '#E0F3EC' : 'white'
                                }`,
                            }}
                            onClick={this.handleClick}
                        >
                            <AddIcon
                                style={{ width: '1.2rem', margin: 'auto' }}
                            />
                        </ButtonBase>
                    )}*/}
                </div> 
            </div>
        )
    }
}

class WUCardInfo extends PureComponent {
    render() {
        const {
            isRestricted,
            isBanned,
            set,
            name,
            scoreType,
            type,
            id,
            pickColor,
            glory,
            onClick
        } = this.props
        return (
            <div style={{ marginLeft: '1rem' }} onClick={onClick}>
                <div style={{ display: 'flex', alignItem: 'center' }}>
                    {
                        isRestricted && (
                            <LockIcon style={{ width: '1rem', height: '1rem', margin: '.2rem .3rem 0 0', fill: 'goldenrod'}} />
                        )
                    }
                    <Typography
                        variant="body2"
                        style={{
                            color: colorsTable[set],
                            textDecoration: 'underline',
                        }}
                    >
                        {name}
                    </Typography>
                    {glory > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '.5rem',
                            }}
                        >
                            <svg
                                style={{
                                    fill: '#D38E36',
                                    width: '.8rem',
                                    height: '.8rem',
                                }}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    xmlns="http://www.w3.org/2000/svg"
                                    d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 6z"
                                />
                            </svg>
                            <Typography
                                style={{ color: 'black', fontSize: '.8rem' }}
                            >
                                {glory}
                            </Typography>
                        </div>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        alignItems: 'flex-start',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            alignItems: 'flex-start',
                            margin: '0 .2rem 0 0',
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: '.75rem',
                                color: 'gray'
                            }}
                        >
                            {`${cardType[type]}`}
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: 'gray',
                            }}
                        >
                            {scoreType >= 0 && (
                                <ObjectiveScoreTypeIcon
                                    type={scoreType}
                                    style={{
                                        width: '.8rem',
                                        height: '.8rem',
                                        margin: '.3rem 0 0 .2rem',
                                    }}
                                />
                            )}
                        </Typography>
                    </div>

                    <Typography
                        variant="body2"
                        style={{
                            fontSize: '.75rem',
                            margin: '0 .2rem 0 0',
                            color: 'gray',
                        }}
                    >
                        |
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            alignItems: 'center',
                            margin: '0 .2rem 0 0',
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: '.75rem',
                                color: 'gray'
                            }}
                        >
                            {` Set: `}
                        </Typography>
                        <img
                            alt={`${setsIndex[set]}`}
                            style={{
                                width: '.8rem',
                                height: '.8rem',
                                marginLeft: '.2rem',
                            }}
                            src={`/assets/icons/${setsIndex[set]}-icon.png`}
                        />
                    </div>
                    <Typography
                        variant="body2"
                        style={{
                            fontSize: '.75rem',
                            margin: '0 .2rem 0 0',
                            color: 'gray',
                        }}
                    >
                        |
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: '.75rem',
                                color: 'gray',
                            }}
                        >
                            {`${id.slice(-3)}/${
                                totalCardsPerWave[parseInt(id.slice(0, 2), 10)]
                            }`}
                        </Typography>
                        <img
                            alt={`wave-${id.slice(0, 2)}`}
                            style={{
                                width: '.8rem',
                                height: '.8rem',
                                marginLeft: '.2rem',
                            }}
                            src={`/assets/icons/wave-${id.slice(
                                0,
                                2
                            )}-icon.png`}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class WUCardAtom extends Component {
    state = {
        color: 0,
        useTextFallback: false,
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate =
            nextProps.id !== this.props.id ||
            nextProps.type !== this.props.type ||
            nextProps.scoreType !== this.props.scoreType ||
            nextProps.name !== this.props.name ||
            nextProps.isAlter !== this.props.isAlter ||
            nextProps.inDeck !== this.props.inDeck ||
            nextProps.expanded !== this.props.expanded ||
            new Set(nextProps.createModeCurrentDeck).count() !==
                new Set(this.props.createModeCurrentDeck).count() ||
            new Set(nextProps.editModeCurrentDeck).count() !==
                new Set(this.props.editModeCurrentDeck).count() ||
            nextProps.createModeRestrictedCardsCount !==
                this.props.createModeRestrictedCardsCount ||
            nextProps.editModeRestrictedCardsCount !==
                this.props.editModeRestrictedCardsCount ||
            nextState.useTextFallback !== this.state.useTextFallback

        return shouldUpdate
    }

    handleToggleCardInDeck = id => () => {
        if (this.props.editMode) {
            this.handleToggleCardInEditMode(id)
        } else {
            this.handleToggleCardInCreateMode(id)
        }
    }

    handleToggleCardInCreateMode = id => {
        if (this.props.createModeCurrentDeck.includes(id)) {
            this.props.removeCard(id)
        } else {
            this.props.addCard(id)
        }
    }

    handleToggleCardInEditMode = id => {
        if (this.props.editModeCurrentDeck.includes(id)) {
            this.props.editRemoveCard(id)
        } else {
            this.props.editAddCard(id)
        }
    }

    pickBackgroundColor = (isRestricted, isBanned) => {
        if (isRestricted) {
            return 'Goldenrod'
        }

        if (isBanned) {
            return 'DarkRed'
        }

        return this.props.isAlter ? 'rgb(224, 243, 236)' : 'White'
    }

    pickForegroundColor = (isRestricted, isBanned, defaultColor) => {
        if (isBanned || isRestricted) {
            return 'white'
        }

        return defaultColor
    }

    render() {
        const {
            classes,
            type,
            id,
            scoreType,
            glory,
            name,
            set,
            rule,
            isAlter,
            isRestricted,
            withAnimation,
        } = this.props
        const isBanned = Boolean(bannedCards[id])
        const factionPrefix = factionIdPrefix[this.props.editMode ? this.props.editModeFaction : this.props.createModeFaction];
        const height = this.props.expanded ? 'auto' : 0
        const inDeck = this.props.editMode
            ? this.props.editModeCurrentDeck.includes(id)
            : this.props.createModeCurrentDeck.includes(id)
        const restrictedCardsCount = this.props.editMode
            ? this.props.editModeRestrictedCardsCount
            : this.props.createModeRestrictedCardsCount

        return (
            <div
                style={{
                    backgroundColor: this.pickBackgroundColor(false, false),
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        margin: '0 0 .5rem .5rem',
                        padding: '.5rem 0 0 0',
                    }}
                >
                    <WUCardTypeImage
                        {...classes}
                        id={id}
                        prefix={factionPrefix}
                        restrictedCardsCount={restrictedCardsCount}
                        isRestricted={isRestricted}
                        type={type}
                        inDeck={inDeck}
                        isAlter={isAlter}
                        toggle={this.handleToggleCardInDeck}
                        rank={this.props.ranking}
                    />
                    <WUCardInfo
                        pickColor={this.pickForegroundColor}
                        isRestricted={isRestricted}
                        isBanned={false}
                        set={set}
                        name={name}
                        scoreType={scoreType}
                        type={type}
                        id={id}
                        glory={glory}
                        onClick={this.props.onExpandChange}
                    />
                    <ButtonBase className={classes.expand} style={{ width: '3rem', height: '3rem', color: 'white', backgroundColor: !inDeck ? '#3B9979' : '#8A1C1C', marginRight: '.3rem'}}
                        onClick={this.handleToggleCardInDeck(id)}>
                        <AddIcon className={classnames(classes.inTheDeck, {
                                [classes.notInTheDeck]: inDeck,
                            })} />
                    </ButtonBase>
                </div>
                <AnimateHeight
                    duration={withAnimation ? 250 : 0}
                    height={height} // see props documentation bellow
                    easing="ease-out"
                >
                    {!this.state.useTextFallback && (
                        <img
                            onError={this.handleImageError}
                            onLoad={this.handleImageLoaded}
                            className={classes.cardImg}
                            alt={id.slice(-3)}
                            src={`/assets/cards/${id}.png`}
                        />
                    )}
                    {this.state.useTextFallback && <CardRule rule={rule} />}
                </AnimateHeight>
            </div>
        )
    }

    handleImageLoaded = () => {
        this.setState({ useTextFallback: false })
    }

    handleImageError = () => {
        this.setState({ useTextFallback: true })
    }
}

const mapStateToProps = state => {
    return {
        createModeFaction: state.deckUnderBuild.faction,
        createModeCurrentDeck: state.deckUnderBuild.deck,
        createModeRestrictedCardsCount:
            state.deckUnderBuild.restrictedCardsCount,

        editModeCurrentDeck: state.deckUnderEdit.deck,
        editModeRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
        editModeFaction: state.deckUnderBuild.faction,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),

        editAddCard: card => dispatch({ type: EDIT_ADD_CARD, card: card }),
        editRemoveCard: card =>
            dispatch({ type: EDIT_REMOVE_CARD, card: card }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(WUCardAtom))
