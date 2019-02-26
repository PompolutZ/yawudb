import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import LockIcon from '@material-ui/icons/Lock';

class CardsTab extends PureComponent {
    render() {
        const { classes, editMode } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="subheading" className={classes.header}>cards</Typography>
                <div className={classes.subhead}>
                    <img src={`/assets/icons/objective-icon.png`} alt="objective" className={classes.icon} />
                    <Typography className={classes.item}>{editMode ? this.props.editObjectivesCount : this.props.objectivesCount}</Typography>
                    <div style={{ display: 'flex', position: 'relative', marginRight: '.5rem' }}>
                        <img src={`/assets/icons/gambit spell-icon.png`} alt="ploy" className={classes.icon} />
                        <img src={`/assets/icons/ploy-icon.png`} alt="spell" className={classnames(classes.icon, classes.fixedIcon)} />
                    </div>
                    <Typography className={classes.item}>{editMode ? this.props.editGambitsCount : this.props.gambitsCount}</Typography>
                    <img src={`/assets/icons/upgrade-icon.png`} alt="upgrade" className={classes.icon} />
                    <Typography className={classes.item}>{editMode ? this.props.editUpgradesCount : this.props.upgradesCount}</Typography>
                    <LockIcon className={classes.icon} />
                    <Typography className={classes.item}>{editMode ? this.props.editRestrictedCardsCount : this.props.restrictedCardsCount}</Typography>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
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
        margin: '0 .8rem 0 .2rem'
    }
});

const mapStateToProps = state => ({
    restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,
    objectivesCount: state.deckUnderBuild.objectivesCount,
    gambitsCount: state.deckUnderBuild.gambitsCount,
    upgradesCount: state.deckUnderBuild.upgradesCount,

    editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
    editObjectivesCount: state.deckUnderEdit.objectivesCount,
    editGambitsCount: state.deckUnderEdit.gambitsCount,
    editUpgradesCount: state.deckUnderEdit.upgradesCount,
})

export default connect(mapStateToProps, null)(withStyles(styles)(CardsTab));