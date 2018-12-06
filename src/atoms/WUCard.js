import React, { PureComponent, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportIcon from '@material-ui/icons/Report';
import AddIcon from '@material-ui/icons/Add';
import AnimateHeight from 'react-animate-height';
import { cardType, totalCardsPerWave, setsIndex, bannedCards, restrictedCards } from '../data/index';
import ObjectiveScoreTypeIcon from '../components/ObjectiveScoreTypeIcon';
import { connect } from 'react-redux';
import { ADD_CARD, REMOVE_CARD } from '../reducers/deckUnderBuild';
import { Set } from 'immutable';
import { EDIT_ADD_CARD, EDIT_REMOVE_CARD } from '../reducers/deckUnderEdit';

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
        width: "2rem", 
        height:'2rem', 
        borderRadius:'1rem',
        color: 'white',
        display: 'flex'
    },

    inTheDeck: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        backgroundColor: '#3B9979',
    },

    notInTheDeck: {
        backgroundColor: '#8A1C1C',
        transform: 'rotate(45deg)',
    },

    cardImg: {
        width: 'calc(100% - 2rem)',
        margin: '0 1rem',
        [theme.breakpoints.up('md')]: {
            maxWidth: '20rem',
            margin: 'auto'
        }
    }
});

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

class WUCardTypeImage extends PureComponent {
    handleClick = () => {
        this.props.toggle(this.props.id);
    }

    render() {
        const icons = ['objective-icon', 'ploy-icon', 'upgrade-icon', 'gambit spell-icon'];
        const { type, addButton, inTheDeck, isRestricted, notInTheDeck, isAlter, readonly, restrictedCardsCount } = this.props;

        return (
            <div style={{position: 'relative'}}>
                <div style={{position: 'relative'}}>
                    <img src={`/assets/icons/${icons[type]}.png`} alt={icons[type]}
                        style={{ width: '3rem', height: '3rem'}} />
                    {
                        isRestricted && (
                            <div style={{ width: '2rem', height: '2rem', stroke: 'white', fill: 'Goldenrod', top: '0', right: '-.1rem', position: 'absolute' }}>
                                {
                                    restrictedCardsCount > 0 && (
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                                style={{ width: '2rem', height: '2rem', stroke: 'white', fill: 'Goldenrod', top: '-.6rem', right: '-.8rem', position: 'absolute' }}>
                                                <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3z"/>
                                            </svg>                                      
                                            <div style={{ width: '2rem', height: '2rem', stroke: 'white', top: '-.6rem', right: '-.8rem', position: 'absolute', display: 'flex'}}>
                                                <Typography variant="body2" style={{ margin: 'auto', color: 'white'}}>
                                                    {restrictedCardsCount}
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    restrictedCardsCount === 0 && (
                                        <ReportIcon style={{ width: '2rem', height: '2rem', stroke: 'white', fill: 'Goldenrod', top: '-.6rem', right: '-.8rem', position: 'absolute'}} />
                                    )
                                }
                            </div>
                        )
                    }           
                    {
                        !readonly &&
                        <ButtonBase className={classnames(addButton, inTheDeck, {[notInTheDeck]: this.props.inDeck})} 
                                    style={{ border:`.1rem solid ${isAlter ? '#E0F3EC' : 'white'}` }}
                                    onClick={this.handleClick}>
                            <AddIcon style={{width: '1.2rem', margin: 'auto'}} />
                        </ButtonBase>
                    }
                </div>
            </div>
        );
    }
}

class WUCardInfo extends PureComponent {
    render() {
        const { isRestricted, isBanned, set, name, scoreType, type, id, pickColor, glory } = this.props;
        return (
            <div style={{ marginLeft: '1rem'}}>
                <div style={{ display: 'flex'}}>
                    <Typography variant="body2" style={{color: pickColor(isRestricted, isBanned, colorsTable[set])}}>{name}</Typography>
                    {
                        glory > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '.5rem'}}>
                                <svg style={{fill: '#D38E36', width: '.8rem', height: '.8rem' }} viewBox="0 0 24 24">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 6z"/>
                                </svg>
                                <Typography style={{ color: 'black', fontSize: '.8rem'}}>{glory}</Typography>
                            </div>
                        )
                    }
                </div>
                <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
                    <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start', margin: '0 .2rem 0 0'}}>
                        <Typography variant="body2" style={{fontSize: '.75rem', color: pickColor(isRestricted, isBanned, 'gray')}}>
                            {`${cardType[type]}`}
                        </Typography>
                        <Typography variant="body2" style={{color: pickColor(isRestricted, isBanned, 'gray')}}>
                            { scoreType >= 0 && <ObjectiveScoreTypeIcon type={scoreType} style={{ width: '.8rem', height: '.8rem', margin: '.3rem 0 0 .2rem'}} /> }
                        </Typography>
                    </div>

                    <Typography variant="body2" style={{fontSize: '.75rem', margin: '0 .2rem 0 0', color: pickColor(isRestricted, isBanned, 'gray')}}>
                        |
                    </Typography>
                    <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 .2rem 0 0'}}>
                        <Typography variant="body2" style={{fontSize: '.75rem', color: pickColor(isRestricted, isBanned, 'gray')}}>
                            {` Set: `}
                        </Typography>
                        <img alt={`${setsIndex[set]}`} style={{width: '.8rem', height: '.8rem', marginLeft: '.2rem'}} src={`/assets/icons/${setsIndex[set]}-icon.png`} />
                    </div>
                    <Typography variant="body2" style={{fontSize: '.75rem', margin: '0 .2rem 0 0', color: pickColor(isRestricted, isBanned, 'gray')}}>
                        |
                    </Typography>
                    <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
                        <Typography variant="body2" style={{fontSize: '.75rem', color: pickColor(isRestricted, isBanned, 'gray')}}>
                            {`${id.slice(-3)}/${totalCardsPerWave[parseInt(id.slice(0,2), 10)]}`}
                        </Typography>
                        <img alt={`wave-${id.slice(0,2)}`} style={{width: '.8rem', height: '.8rem', marginLeft: '.2rem'}} src={`/assets/icons/wave-${id.slice(0,2)}-icon.png`} />
                    </div>
                </div>
            </div>
        );
    }
}

class WUCardAtom extends Component {
    state = { 
        color: 0, 
    };

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = nextProps.id !== this.props.id ||
            nextProps.type !== this.props.type ||
            nextProps.scoreType !== this.props.scoreType ||
            nextProps.name !== this.props.name ||
            nextProps.isAlter !== this.props.isAlter ||
            nextProps.inDeck !== this.props.inDeck ||
            nextProps.expanded !== this.props.expanded ||
            new Set(nextProps.createModeCurrentDeck).count() !== new Set(this.props.createModeCurrentDeck).count() ||
            new Set(nextProps.editModeCurrentDeck).count() !== new Set(this.props.editModeCurrentDeck).count() ||
            nextProps.createModeRestrictedCardsCount !== this.props.createModeRestrictedCardsCount ||
            nextProps.editModeRestrictedCardsCount !== this.props.editModeRestrictedCardsCount;
        
        return shouldUpdate;            
    }

    handleToggleCardInDeck = id => {
        if(this.props.editMode) {
            this.handleToggleCardInEditMode(id);
        } else {
            this.handleToggleCardInCreateMode(id);
        }
    }

    handleToggleCardInCreateMode = id => {
        if(this.props.createModeCurrentDeck.includes(id)) {
            this.props.removeCard(id);
        } else {
            this.props.addCard(id)
        }
    }

    handleToggleCardInEditMode = id => {
        if(this.props.editModeCurrentDeck.includes(id)) {
            this.props.editRemoveCard(id);
        } else {
            this.props.editAddCard(id)
        }
    }

    pickBackgroundColor = (isRestricted, isBanned) => {
        if(isRestricted) {
            return 'Goldenrod';
        }
            
        if(isBanned) {
            return 'DarkRed';
        }

        return this.props.isAlter ? 'rgb(224, 243, 236)' : 'White';
    }

    pickForegroundColor = (isRestricted, isBanned, defaultColor) => {
        if(isBanned || isRestricted) {
            return 'white';
        }
        
        return defaultColor;
    }

    render() {
        const { classes, type, id, scoreType, glory, name, set, isAlter, isRestricted, withAnimation } = this.props;
        const isBanned = Boolean(bannedCards[id]);
        const height = this.props.expanded ? 'auto' : 0;
        const inDeck = this.props.editMode ? this.props.editModeCurrentDeck.includes(id) : this.props.createModeCurrentDeck.includes(id);
        const restrictedCardsCount = this.props.editMode ? this.props.editModeRestrictedCardsCount : this.props.createModeRestrictedCardsCount;

        return (
            <div style={{ backgroundColor: this.pickBackgroundColor(false, false)}}>
                <div style={{ display: 'flex', margin: '0 0 .5rem .5rem', padding: '.5rem 0 0 0'}}>
                    <WUCardTypeImage {...classes} id={id} restrictedCardsCount={restrictedCardsCount} isRestricted={isRestricted} type={type} inDeck={inDeck} isAlter={isAlter} toggle={this.handleToggleCardInDeck} />
                    <WUCardInfo pickColor={this.pickForegroundColor} 
                        isRestricted={false} 
                        isBanned={false} 
                        set={set} 
                        name={name} 
                        scoreType={scoreType} 
                        type={type} 
                        id={id}
                        glory={glory} />
                    <IconButton
                        className={classnames(classes.expand, {[classes.expandOpen]: this.props.expanded, })}
                        style={{ color: this.pickForegroundColor(isRestricted, isBanned, 'gray')}}
                        onClick={this.props.onExpandChange}>
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
                <AnimateHeight 
                    duration={ withAnimation ? 250 : 0 }
                    height={ height } // see props documentation bellow
                    easing="ease-out">
                    <img className={classes.cardImg} alt={id.slice(-3)} src={`/assets/cards/${id}.png`} />
                </AnimateHeight>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        createModeCurrentDeck: state.deckUnderBuild.deck,
        createModeRestrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,

        editModeCurrentDeck: state.deckUnderEdit.deck,
        editModeRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),

        editAddCard: card => dispatch({ type: EDIT_ADD_CARD, card: card }),
        editRemoveCard: card => dispatch({ type: EDIT_REMOVE_CARD, card: card }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WUCardAtom));
