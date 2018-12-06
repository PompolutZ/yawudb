import React, { Component, Suspense, lazy } from 'react';
import { db } from '../../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrUpdateMyDeck, removeMyDecks } from '../../reducers/mydecks';
import isEqual from 'lodash/isEqual';
import DeckThumbnail from '../../atoms/DeckThumbnail';
import { cardsDb, bannedCards, restrictedCards, setInfos, getDbIndexByWaveAndCard, setsIndex } from '../../data/index';
import { withStyles } from '@material-ui/core/styles';
import Switch from '../../atoms/Switch';

const DeckConflictsAndWarnings = lazy(() => import('./atoms/DeckConflictsAndWarnings'));

const styles = theme => ({
    header: {
        margin: '0 1rem',
        borderBottom: '1px solid lightgray',
    },

    headerItem : {
        fontSize: '.7rem'
    },

    item: {
        borderBottom: '1px solid lightgray',
        margin: '1rem',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        },
    }
})

class MyDecks extends Component {
    state = {
        loading: this.props.decks.length === 0,
        showNotification: false,
        showConflicts: false,
        conflicts: {},
        warnings: {}
    }

    async componentDidMount() {
        try {
            const userDataRef = await db.collection('users').doc(this.props.userInfo.uid).get();
            const userData = userDataRef.data();
            if(!userData) {
                this.setState({loading: false});
                return;
            }

            const ids = [];

            for(let deckId of userData.mydecks) {
                const deckRef = await db.collection('decks').doc(deckId).get();
                const data = deckRef.data();
                const created = data.created.toDate();
                this.props.addOrUpdate(deckId, data.created, {...data, id: deckId, created: created, author:this.props.userInfo.displayName, authorId: this.props.userInfo.uid});
                ids.push(deckId);
            }

            this.props.removeMissingDecks(ids);
            this.checkForConflictsOrWarnings();

            if(this.state.loading) {
                this.setState({loading: false});
            }
        } catch(error) {
            console.log(error);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
            return false;
        }

        return true;
    }

    render() {
        const { history, decks, classes } = this.props;

        return (
            <div>
                {
                    this.state.loading && (
                        <div style={{display: 'flex', height: '100vh'}}>
                            <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                                <CircularProgress style={{color: '#3B9979'}} />
                                <div>Fetching decks...</div>
                            </div>
                        </div>
                    )
                }
                { 
                    !this.state.loading && decks.length === 0 && 
                        <div style={{display: 'flex', height: '80vh', flexFlow: 'column nowrap'}}>
                            <Typography variant="title" style={{margin: 'auto auto 1rem auto'}}>You don't have any decks yet.</Typography>
                            <Typography variant="headline" style={{margin: '0 auto auto auto'}}>Why not to make one?</Typography>
                        </div> 
                }
                {
                    !this.state.loading && decks.length > 0 && (
                        <div>
                            <div className={classes.header}>
                                <Switch isChecked={this.state.showConflicts} onChange={this.handleChangeShowConflicts} label="Show conflicts and warnings" />
                                <Typography variant="subheading" className={classes.headerItem} style={{ marginBottom: '.5rem'}}>
                                    <i>To use this feature mark sets you own in the <span style={{color: '#3B9979', cursor: 'pointer'}} onClick={this.handleProfileLinkClicked}><u>Profile</u></span> page.</i>
                                </Typography>

                                {
                                    this.state.showConflicts && (
                                        <div>
                                            <Typography className={classes.headerItem}>
                                                <span style={{ color: 'crimson'}}>Conflict</span> means that you have only single copy of a card in your collection.
                                            </Typography>
                                            <Typography className={classes.headerItem}>
                                                <span style={{ color: 'orange'}}>Warning</span> means that you have several copies of a card, but used them in more decks than copies.
                                            </Typography>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    decks.map(([id, deck]) => {
                                        const bannedCardsCount = deck.cards.filter(id => Boolean(bannedCards[id])).length;
                                        const restrictedCardsCount = deck.cards.filter(id => Boolean(restrictedCards[id])).length;

                                        return (
                                            <div key={id} className={classes.item}>
                                                <DeckThumbnail onClick={this.handleThumbnailClick.bind(this, id)} 
                                                    factionId={id} 
                                                    title={deck.name} 
                                                    author={deck.author} 
                                                    date={deck.created}
                                                    sets={deck.sets}
                                                    objectives={deck.cards.map(c => ({ id: c, ...cardsDb[c]})).filter(c => c.type === 0)}
                                                    banned={bannedCardsCount}
                                                    restricted={restrictedCardsCount} />
                                                {
                                                    this.state.showConflicts && (
                                                        <Suspense fallback={<CircularProgress style={{color: '#3B9979'}} />}>
                                                            <DeckConflictsAndWarnings 
                                                                conflicts={this.state.conflicts[id]} 
                                                                warnings={this.state.warnings[id]}
                                                                decks={decks} />
                                                        </Suspense>
                                                    )
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                }

                <FloatingActionButton isEnabled onClick={() => this.handleClick(history)}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }

    handleChangeShowConflicts = e => {
        this.setState({ showConflicts: e.target.checked });
    }

    handleProfileLinkClicked = () => {
        this.props.history.push('/profile');
    }

    handleClick = history => {
        history.push('/deck/create');
    }

    handleThumbnailClick = id => {
        this.props.history.push(`/view/deck/${id}`);
    }

    checkForConflictsOrWarnings = () => {
        console.log(this.props.ownSets);
        const cardsInDecks = this.props.decks.reduce((acc, [id, deck]) => {
            const inverted = deck.cards.reduce((iacc, c) => ({...iacc, ...{[c]: [id]}}), {});
            for(let k in inverted) {
                if(acc[k]) {
                    acc[k] = [...acc[k], ...inverted[k]];
                } else {
                    acc[k] = [...inverted[k]];
                }
            }

            return acc;
        }, {});
        
        const conflictCandidates = Object.entries(cardsInDecks).filter(([k, v]) => v.length > 1);
        console.log(conflictCandidates);

        // convert ownSetsToCards
        const ownCards = Object.entries(this.props.ownSets).reduce((acc, [set, copies]) => {
            const s = setInfos[set];
            const { wave } = s;
            const setCards = Object.keys(s).filter(k => k !== 'wave').reduce((acc, k) => [...acc, ...s[k]], []).map(card => getDbIndexByWaveAndCard(wave, card));
            for(let card of setCards) {
                if(acc[card]) {
                    acc[card] += 1 * copies;
                } else {
                    acc[card] = 1 * copies;
                }
            }

            return acc;
        }, {});

        const conflictsOrWarnings = conflictCandidates.map(([k, v]) => ({ id: k, copies: ownCards[k], decks: v}));
        console.log(conflictsOrWarnings);
        const conflicts = conflictsOrWarnings.filter(({copies, decks}) => copies === 1 && decks.length > 1);
        const deckConflicts = this.findConflictsOrWarnings(conflicts); 
        const warnings = conflictsOrWarnings.filter(({ copies, decks}) => copies > 1 && decks.length > copies);
        const deckWarnings = this.findConflictsOrWarnings(warnings);

        this.setState({conflicts: deckConflicts, warnings: deckWarnings});
    }

    findConflictsOrWarnings = candidates => {
        return candidates.reduce((acc, entry) => {
            for(let deck of entry.decks) {
                if(acc[deck]) {
                    entry.decks.filter(d => d !== deck).reduce((iacc, d) => {
                        if(iacc[d]) {
                            iacc[d] = [...iacc[d], entry.id];
                            return iacc;
                        } else {
                            iacc[d] = [entry.id];
                            return iacc;
                        }
                    }, acc[deck]);
                } else {
                    acc[deck] = entry.decks.filter(d => d !== deck).reduce((iacc, d) => {
                        iacc[d] = [entry.id]
                        return iacc;
                    }, {}); 
                }
            }

            return acc;
        }, {});        
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth,
        ownSets: state.userExpansions,
        decks: Object.entries(state.mydecks),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrUpdate: (id, timestamp, data) => dispatch(addOrUpdateMyDeck(id, timestamp, data)),
        removeMissingDecks: ids => dispatch(removeMyDecks(ids)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(MyDecks)));