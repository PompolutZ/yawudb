import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import LockIcon from '@material-ui/icons/Lock';
import { SET_VISIBLE_CARD_TYPES } from '../../../reducers/cardLibraryFilters';
import { Set } from 'immutable';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
    },

    header: {
        fontSize: '.8rem'
    },

    subhead: {
        display: 'flex',
        padding: 'auto 1rem',
        alignItems: 'center',
    },

    icon: {
        width: '1rem',
        height: '1rem',
        color: 'goldenrod',
        [theme.breakpoints.up('md')] : {
            width: '1.5rem',
            height: '1.5rem',
        }
    },

    fixedIcon: {
        position: 'absolute',
        left: '.5rem',
        top: '0',
        zIndex: '1',
    },

    item: {
        fontSize: '1rem',
        [theme.breakpoints.up('md')] : {
            fontSize: '1.5rem',
        },
        margin: '0 .5rem 0 .2rem'
    }
}));

function ToggleBox({ children, isVisible, onToggle }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            opacity: isVisible ? 1 : '.4',
        }} onClick={onToggle}>
            { children }
        </div>
    )
}

function CardsTab(props) {
    const classes = useStyles();
    const { editMode, isSelected } = props;
    const visibleCardTypes = new Set(props.types);

    const toggleTypeAtIndex = index => () => {
        if(!isSelected) return; 

        if(visibleCardTypes.includes(index)) {
            props.onTypesChanged(visibleCardTypes.delete(index).toJS())
        } else {
            props.onTypesChanged(visibleCardTypes.add(index).toJS())
        }
    }

    const toggleTypeAtIndexesOneAndThree = () => {
        if(!isSelected) return; 

        if(visibleCardTypes.includes(1) || visibleCardTypes.includes(3)) {
            props.onTypesChanged(visibleCardTypes.delete(1).delete(3).toJS());
        } else {
            props.onTypesChanged(visibleCardTypes.add(1).add(3).toJS());
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant="subtitle2" className={classes.header}>cards</Typography>
            <div className={classes.subhead}>
                <ToggleBox isVisible={visibleCardTypes.includes(0)} onToggle={toggleTypeAtIndex(0)}>
                    <React.Fragment>
                        <img src={`/assets/icons/objective-icon.png`} alt="objective" className={classes.icon} />
                        <Typography className={classes.item}>{editMode ? props.editObjectivesCount : props.objectivesCount}</Typography>
                    </React.Fragment>
                </ToggleBox>

                <ToggleBox isVisible={visibleCardTypes.includes(1) || visibleCardTypes.includes(3)} onToggle={toggleTypeAtIndexesOneAndThree}>
                    <React.Fragment>
                        <div style={{ display: 'flex', position: 'relative', marginRight: '.5rem' }}>
                            <img src={`/assets/icons/gambit spell-icon.png`} alt="ploy" className={classes.icon} />
                            <img src={`/assets/icons/ploy-icon.png`} alt="spell" className={classnames(classes.icon, classes.fixedIcon)} />
                        </div>
                        <Typography className={classes.item}>{editMode ? props.editGambitsCount : props.gambitsCount}</Typography>
                    </React.Fragment>
                </ToggleBox>

                <ToggleBox isVisible={visibleCardTypes.includes(2)} onToggle={toggleTypeAtIndex(2)}>
                    <React.Fragment>
                        <img src={`/assets/icons/upgrade-icon.png`} alt="upgrade" className={classes.icon} />
                        <Typography className={classes.item}>{editMode ? props.editUpgradesCount : props.upgradesCount}</Typography>
                    </React.Fragment>
                </ToggleBox>

                <LockIcon className={classes.icon} />
                <Typography className={classes.item}>{editMode ? props.editRestrictedCardsCount : props.restrictedCardsCount}/5</Typography>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    types: state.cardLibraryFilters.visibleCardTypes,

    restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,
    objectivesCount: state.deckUnderBuild.objectivesCount,
    gambitsCount: state.deckUnderBuild.gambitsCount,
    upgradesCount: state.deckUnderBuild.upgradesCount,

    editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
    editObjectivesCount: state.deckUnderEdit.objectivesCount,
    editGambitsCount: state.deckUnderEdit.gambitsCount,
    editUpgradesCount: state.deckUnderEdit.upgradesCount,
})

const mapDispatchToProps = dispatch => {
    return {
        onTypesChanged: value => dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsTab);