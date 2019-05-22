import React, { useState, useContext, useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { bannedCards, restrictedCards, cardsDb } from '../../data';
import { connect } from 'react-redux';
import { SET_FACTIONS_FILTER } from '../../reducers/decksFilters';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import DeckThumbnail from '../../atoms/DeckThumbnail';
import { withFirebase, FirebaseContext } from '../../firebase';
import useStateWithLocalStorage from '../../hooks/useStateWithLocalStorage';
import VirtualizedDecksList from './VirtualizedDecksList';

class DecksListContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.containerRef = React.createRef();
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%'}} ref={this.containerRef}>
                <VirtualizedDecksList containerRef={this.containerRef.current} source={this.props.source} />
            </div>
        )
    }
}

const filterDeckIds = (deckIds, faction) => () => deckIds.filter(id => {
    switch(faction) {
        case 'all': return true;
        default: return id.startsWith(faction);
    }
})

function Decks({ classes, match }) {
    const firebase = useContext(FirebaseContext);
    const [deckIds, setDeckIds] = useState(JSON.parse(localStorage.getItem('yawudb_deck_ids')) || []);
    const [filteredDeckIds, setFilteredDeckIds] = useState(filterDeckIds(deckIds, match.params.faction));

    console.log(deckIds);
    //const list = JSON.parse(deckIds);
    
    useEffect(() => {
        console.log('Subscribe on all decks');
        firebase.decksMetaIds('all').on('value', snapshot => {
            setDeckIds(snapshot.val());
            localStorage.setItem('yawudb_deck_ids', JSON.stringify(snapshot.val()));
        });

        return () => {
            console.log('Ubsubscribe from all decks');
            firebase.decksMetaIds(match.params.faction).off();
        };
    }, []);

    useEffect(() => {
        console.log('New Faction: ', match.params.faction);
        setFilteredDeckIds(filterDeckIds(deckIds, match.params.faction));
    }, [match.params.faction]);

    return (
        <div className={classes.root}>
            <VirtualizedDecksList source={filteredDeckIds} />
        </div>
    )
}

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%'
    }
});

export default withStyles(styles)(Decks);