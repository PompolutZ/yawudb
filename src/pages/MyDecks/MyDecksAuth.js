import React, { Component, Suspense, lazy } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrUpdateMyDeck, removeMyDecks } from '../../reducers/mydecks';
import isEqual from 'lodash/isEqual';
import DeckThumbnail from '../../atoms/DeckThumbnail';
import { cardsDb, bannedCards, restrictedCards, setInfos, getDbIndexByWaveAndCard } from '../../data/index';
import { withStyles } from '@material-ui/core/styles';
import Switch from '../../atoms/Switch';
import toPairs from 'lodash/toPairs';
import { withFirebase } from '../../firebase';
import useAuthUser from '../../hooks/useAuthUser';
import FluidDeckThumbnail from '../../atoms/FluidDeckThumbnail';

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
        // borderBottom: '1px solid lightgray',
        // margin: '1rem',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        },
    }
})

class MyDecksAuth extends Component {
    state = {
        loading: this.props.decks.length === 0,
        showNotification: false,
        showConflicts: false,
        conflicts: {},
        warnings: {},
    }

    async componentDidMount() {
        console.log(this.props.userInfo);
        const userDataRef = await this.props.firebase.db.collection('users').doc(this.props.userInfo.uid).get();
        const userData = userDataRef.data();

        const cache = JSON.parse(localStorage.getItem('yawudb_decks')) || {};
        const anonDeckIds = JSON.parse(localStorage.getItem('yawudb_anon_deck_ids')) || [];
        const { uid, displayName } = this.props.userInfo;
        const ids = [];

        for(let id of userData.mydecks) {
            let data = cache[id];
            
            if(!data) {
                const refetched = await this.props.firebase.deck(id).once('value');
                data = refetched.val();
                localStorage.setItem('yawudb_decks', JSON.stringify({...cache, [id]: data }))
                continue;
            }

            let created = new Date(0);
            if(data.created && data.created.seconds) {
                created.setSeconds(data.created.seconds);
            } else {
                created = new Date(data.created);
            }

            // change anon deck author
            if(data.author === "Anonymous") {
                const updatedData = {
                    ...data,
                    author: uid,
                    authorDisplayName: displayName
                };

                await this.props.firebase.deck(id).update(updatedData);

                const updatedAnonIds = anonDeckIds.filter(anonDeckId => anonDeckId !== id);
                localStorage.setItem('yawudb_anon_deck_ids', JSON.stringify(updatedAnonIds));
                localStorage.setItem('yawudb_decks', JSON.stringify({...cache, [id]: updatedData }));

                this.props.addOrUpdate(id, created, { ...updatedData, id: id, created: created });
                console.log('PUSH UPDATED')
                ids.push(id);
            } else {
                console.log('JUST PUSH')
                this.props.addOrUpdate(id, created, { ...data, id: id, created: created });
                ids.push(id);
            }
        }

        this.props.removeMissingDecks(ids);
        this.checkForConflictsOrWarnings();

        if(this.state.loading) {
            this.setState({loading: false});
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
        const cache = JSON.parse(localStorage.getItem('yawudb_decks')) || {};

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
                                        console.log(id)
                                        const cards = deck.cards ? deck.cards.map(c => ({ id: c, ...cardsDb[c]})) : [];
                                        const counts = cards.reduce((acc, el) => {
                                            switch(el.type) {
                                                case 0: 
                                                    acc.objectives += 1;
                                                    return acc;

                                                case 2: 
                                                    acc.upgrades += 1;
                                                    return acc;

                                                default: 
                                                    acc.gambits += 1;
                                                    return acc;
                                            }
                                        }, {
                                            objectives: 0,
                                            gambits: 0,
                                            upgrades: 0
                                        });

                                        const isDraft = counts.objectives < 12 || (counts.upgrades + counts.gambits < 20) || (counts.gambits > counts.upgrades);

                                        return (
                                            <div key={id} className={classes.item}>
                                                            <FluidDeckThumbnail
                                                                deckId={id}
                                                                deck={cache[id]}
                                                                canUpdateOrDelete
                                                                isDraft={isDraft}
                                                            />
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

    checkForConflictsOrWarnings = () => {
        const cardsInDecks = this.props.decks.reduce((acc, [id, deck]) => {
            const inverted = deck.cards ? deck.cards.reduce((iacc, c) => ({...iacc, ...{[c]: [id]}}), {}) : {};
            for(let k in inverted) {
                if(acc[k]) {
                    acc[k] = [...acc[k], ...inverted[k]];
                } else {
                    acc[k] = [...inverted[k]];
                }
            }

            return acc;
        }, {});
        
        const conflictCandidates = toPairs(cardsInDecks).filter(([k, v]) => v.length > 1);

        // convert ownSetsToCards
        const ownCards = toPairs(this.props.ownSets).reduce((acc, [set, copies]) => {
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
        decks: toPairs(state.mydecks),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrUpdate: (id, timestamp, data) => dispatch(addOrUpdateMyDeck(id, timestamp, data)),
        removeMissingDecks: ids => dispatch(removeMyDecks(ids)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(withRouter(withStyles(styles)(MyDecksAuth))));