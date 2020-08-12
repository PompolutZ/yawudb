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
        const unsubscribe = firebase.decksMetaDb().doc(prefix).onSnapshot(doc => {
            const metadata = doc.data();
            if(metadata && metadata.ids) {
                setCount(metadata.ids.length);
                addDecksMeta(prefix, ({count: metadata.ids.length, ids: metadata.ids }))
            } else {
                setCount(0);
                addDecksMeta(prefix, ({count: 0, ids: [] }))
            }
        });

        return () => unsubscribe();
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
        flex: "1 0 25%",
        display: 'flex', 
        alignItems: 'center', 
        minWidth: "160px",
        padding: "1rem",
        // margin: '.5rem',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(withStyles(styles)(DeckMetaSummary)));