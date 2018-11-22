import React, { PureComponent, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import AnimateHeight from 'react-animate-height';
import { cardType, totalCardsPerWave, setsIndex, bannedCards, restrictedCards } from '../data/index';
import ObjectiveScoreTypeIcon from '../components/ObjectiveScoreTypeIcon';

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
    render() {
        const icons = ['objective-icon', 'ploy-icon', 'upgrade-icon', 'gambit spell-icon'];
        const { type, addButton, inTheDeck, notInTheDeck, toggle, isAlter, inDeck, readonly } = this.props;
        return (
            <div style={{position: 'relative'}}>
                <div style={{position: 'relative'}}>
                    <img src={`/assets/icons/${icons[type]}.png`} alt={icons[type]}
                        style={{ width: '3rem', height: '3rem'}} />
                    {
                        !readonly &&
                        <ButtonBase className={classnames(addButton, inTheDeck, {[notInTheDeck]: inDeck})} 
                                    style={{ border:`.1rem solid ${isAlter ? '#E0F3EC' : 'white'}` }}
                                    onClick={toggle}>
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
        const { isRestricted, isBanned, set, name, scoreType, type, id, pickColor } = this.props;
        return (
            <div style={{ marginLeft: '1rem'}}>
                <Typography variant="body2" style={{color: pickColor(isRestricted, isBanned, colorsTable[set])}}>{name}</Typography>
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
        expanded: false, 
        color: 0, 
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.id !== this.props.id ||
            nextProps.type !== this.props.type ||
            nextProps.scoreType !== this.props.scoreType ||
            nextProps.name !== this.props.name ||
            nextProps.isAlter !== this.props.isAlter ||
            nextProps.inDeck !== this.props.inDeck ||
            nextState.expanded !== this.state.expanded;
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded, color: state.color + 1 === colorsTable.length ? 0 : state.color + 1 }));
    };

    handleToggleCardInDeck = () => {
        this.props.toggleCardInDeck(this.props.id);
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
        const { classes, type, id, scoreType, name, set, isAlter, inDeck } = this.props;
        const isRestricted = Boolean(restrictedCards[id]);
        const isBanned = Boolean(bannedCards[id]);
        const height = this.state.expanded ? 'auto' : 0;
        
        return (
            <div style={{ backgroundColor: this.pickBackgroundColor(isRestricted, isBanned)}}>
                <div style={{ display: 'flex', margin: '0 0 .5rem .5rem', padding: '.5rem 0 0 0'}}>
                    <WUCardTypeImage {...classes} type={type} inDeck={inDeck} isAlter={isAlter} toggle={this.handleToggleCardInDeck} />
                    <WUCardInfo pickColor={this.pickForegroundColor} isRestricted={isRestricted} isBanned={isBanned} set={set} name={name} scoreType={scoreType} type={type} id={id} />
                    <IconButton
                        className={classnames(classes.expand, {[classes.expandOpen]: this.state.expanded, })}
                        style={{ color: this.pickForegroundColor(isRestricted, isBanned, 'gray')}}
                        onClick={this.handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
                <AnimateHeight 
                    duration={ 250 }
                    height={ height } // see props documentation bellow
                    easing="ease-out">
                    <img className="cardImg" alt={id.slice(-3)} src={`/assets/cards/${id}.png`} />
                </AnimateHeight>
            </div>
        );
    }
}

export default withStyles(styles)(WUCardAtom);
