import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddNewDeckButton from '../atoms/AddNewDeckButton';
import { idPrefixToFaction } from '../data/index';
import { withFirebase } from '../firebase';
import { SET_DECKS_META } from '../reducers/decksMeta';
import { Link } from 'react-router-dom';

function DeckIconPicture({ faction, ...props }) {
    return (
        <picture>
            <source type="image/webp" srcSet={`/assets/icons/${faction}-deck.webp`} />
            <img src={`/assets/icons/${faction}-deck-64.png`} className={props.className} style={{ top: '-10%', left: '-10%', filter: 'drop-shadow(0px 0px 4px black)'}} />
        </picture>
    )
}

const DecksCount = ({ count, ...props }) => (
    <span className={props.className}>
        {count}
    </span>
)

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
            <Link className="relative text-center bg-accent3-500 rounded w-full h-32 lg:w-32 text-6xl flex justify-end items-end p-2" to={`/decks/${prefix}`}>
                <DeckIconPicture className="w-24 h-24 absolute inset-0" faction={idPrefixToFaction[prefix]} />
                <DecksCount className="text-white text-2xl font-bold" count={count} />
            </Link>
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
        flex: "1 0 33%",
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        minWidth: "160px",
        padding: "1rem",
        cursor: 'pointer',
        flexDirection: 'column',
        "&:hover": {
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 3px 3px rgba(0,0,0, .5))',
            transition: 'all .175s ease-out'
        }
        // margin: '.5rem',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(withStyles(styles)(DeckMetaSummary)));