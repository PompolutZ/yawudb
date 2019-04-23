import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from '../firebase/index';
import { connect } from 'react-redux';
import { SET_DECKS_META } from '../reducers/decksMeta';

function DeckCount({ classes, prefix, firebase, decksMeta, addDecksMeta }) {
    const [count, setCount] = React.useState(decksMeta[prefix].count);

    React.useEffect(() => {
        const ref = firebase.realdb.ref(`/decks_meta/${prefix}`);
        ref.on('value', snapshot => {
            const currentMeta = snapshot.val();
            console.log(currentMeta);
            setCount(currentMeta.count);
            addDecksMeta(prefix, currentMeta);
        });

        return () => ref.off();
    }, [decksMeta[prefix].count])

    return (
        <div className={classes.root}>
            <div>{prefix}</div>
            <div>{count}</div>
        </div>
    )
}

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

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


export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(withStyles(styles)(DeckCount)));