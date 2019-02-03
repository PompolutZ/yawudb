import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddNewDeckButton from '../atoms/AddNewDeckButton';
import { idPrefixToFaction } from '../data/index';
import toPairs from 'lodash/toPairs';

class DecksCount extends PureComponent {
    render() {
        return(
            <Typography style={{fontSize: '1rem', textDecoration: 'underline', cursor: 'pointer'}} onClick={this.handleClick}>
                {`${this.props.count} decks`}
            </Typography>
       );
    }

    handleClick = () => {
        this.props.onClick(this.props.prefix);
    }
}

class DecksMetaSummary extends PureComponent {
    render() {
        const { classes, decksMeta } = this.props;
        return (
            <div className={classes.root}>
                {
                    toPairs(decksMeta).map(([prefix, meta], i) => {
                        return (
                            <div key={prefix} className={classes.item}>
                                <AddNewDeckButton faction={idPrefixToFaction[prefix]} onClickAdd={this.props.onAddNewDeckClick} />
                                <DecksCount count={meta.count} prefix={prefix} onClick={this.props.onDecksCountClick} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        decksMeta: state.decksMeta,
    }
}

const styles = theme => ({
    root: {
        display: 'flex', 
        flexFlow: 'row wrap', 
        justifyContent: 'space-around',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        }
    },

    item: {
        display: 'flex', alignItems: 'center', margin: '.5rem'
    }
});

export default connect(mapStateToProps, null)(withStyles(styles)(DecksMetaSummary));