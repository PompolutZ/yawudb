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
import FactionFilter from './FactionFilter';

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

function Decks({ classes, history, match }) {
    const firebase = useContext(FirebaseContext);
    const [deckIds, setDeckIds] = useState(JSON.parse(localStorage.getItem('yawudb_deck_ids')) || []);
    const [filteredDeckIds, setFilteredDeckIds] = useState(filterDeckIds(deckIds, match.params.faction));

    console.log(deckIds);
    //const list = JSON.parse(deckIds);

    const handleSelect = prefix => () => {
        console.log('Main', prefix);
        history.replace(`/decks/${prefix === match.params.faction ? 'all' : prefix}`);
    }
    
    useEffect(() => {
        console.log('Subscribe on all decks');
        firebase.decksMetaIds('all').on('value', snapshot => {
            setDeckIds(snapshot.val());
            console.log('New Deck Incoming');
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
    }, [match.params.faction, deckIds]);

    return (
        <div className={classes.root}>
            <div className={classes.filterContainer}>
                <FactionFilter selectedFaction={match.params.faction} onSelect={handleSelect} />
            </div>
            <div id="yawudb_decks_container" className={classes.decksContainer}>
                <VirtualizedDecksList source={filteredDeckIds} />
            </div>
        </div>
    )
}

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row nowrap',
        }
    },

    decksContainer: {
        // height: '80%',
        // width: '100%',
        flex: '1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '1 1',
        }
    },

    filterContainer: {
        //flex: '1 auto',
        [theme.breakpoints.up('md')]: {
            flex: '0 1',
        }
    }
});

export default withStyles(styles)(Decks);