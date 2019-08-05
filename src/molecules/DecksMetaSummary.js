import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddNewDeckButton from '../atoms/AddNewDeckButton';
import { idPrefixToFaction } from '../data/index';
import { withFirebase } from '../firebase';
import { SET_DECKS_META } from '../reducers/decksMeta';

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

function DeckMetaSummary({ classes, prefix, firebase, decksMeta, addDecksMeta, onAddNewDeckClick, onDecksCountClick }) {
    const initCount = () => decksMeta[prefix] ? decksMeta[prefix].count : 0;
    const [count, setCount] = React.useState(initCount());

    React.useEffect(() => {
        const ref = firebase.realdb.ref(`/decks_meta/${prefix}`);
        console.log(prefix, idPrefixToFaction[prefix]);
        ref.on('value', snapshot => {
            const currentMeta = snapshot.val();
            setCount(currentMeta ? currentMeta.count : 0);
            addDecksMeta(prefix, currentMeta);
        });

        return () => ref.off();
    }, [])

    return (
        <div className={classes.root}>
            <AddNewDeckButton faction={idPrefixToFaction[prefix]} onClickAdd={onAddNewDeckClick} />
            <DecksCount count={count} prefix={prefix} onClick={onDecksCountClick} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        decksMeta: state.decksMeta,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDecksMeta: (key, value) => dispatch({ type: SET_DECKS_META, payload: {key: key, value: value }}),
    }
}

const styles = theme => ({
    root: {
        display: 'flex', 
        alignItems: 'center', 
        margin: '.5rem',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(withStyles(styles)(DeckMetaSummary)));