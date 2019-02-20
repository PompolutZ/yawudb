import React, { Component, PureComponent } from 'react';
import firebase, { db, realdb } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { bannedCards, restrictedCards, cardsDb } from '../data/index';
import { connect } from 'react-redux';
import { SET_FACTIONS_FILTER } from '../reducers/decksFilters';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import DeckThumbnail from '../atoms/DeckThumbnail';

const styles = theme => ({
    root : {
        display: 'flex',
        flexFlow: 'row wrap',
    },

    item: {
        paddingBottom: '1rem',
        borderBottom: '1px solid lightgray',
        margin: '1rem',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        },
    },

    filters : {
        margin: '1rem',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: '0 1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '0 1 auto'
        }
    },

    decksList : {
        flex: '0 1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '1 1 auto'
        }
    },
});

class Navigator extends PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
                <ButtonBase 
                    style={{ 
                        width: '3rem', 
                        backgroundColor: '#3B9979',
                        padding: '.5rem',
                        borderRadius: '.2rem',
                        margin: '0 0 .2rem 1rem'}}
                    onClick={this.props.onNavigatePrev}>
                    <Typography variant="button" style={{ color: 'white' }}>prev</Typography>        
                </ButtonBase>            

                <div style={{ flex: '1 1 auto', textAlign: 'center'}}>
                    <Typography variant="subheading">
                        { `Decks ${this.props.decksFrom} - ${this.props.decksTo} out of ${this.props.totalDecks}` }
                    </Typography>
                </div>        

                <ButtonBase 
                    style={{ 
                        width: '3rem', 
                        backgroundColor: '#3B9979',
                        padding: '.5rem',
                        borderRadius: '.2rem',
                        margin: '0 1rem .2rem 0'}}
                    onClick={this.props.onNavigateNext}>
                    <Typography variant="button" style={{ color: 'white' }}>next</Typography>        
                </ButtonBase>            
            </div>            
        );
    }
}

class Decks extends Component {
    state = {
        loading: false,
        currentPage: 0,
        totalDecks: 0,
        // factionDecksCount: []
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        // const factionDecksCount = [];
        // for(let f of factionIndexes.slice(1)) {
        //     const decksCountSnap = await realdb.ref(`/decks_meta/${factionIdPrefix[f]}/count`).once('value');
        //     factionDecksCount.push({faction: f, count: decksCountSnap.val()});
        // }

        const decksIds = await this.getDecksIds();
        const pages = this.preparePagesMeta(decksIds);
        const firstPageDecks = await this.loadPageData(pages[1].ids);
        const firstPage = { ...pages[1], decks: firstPageDecks };
        
        this.setState({
            loading: false,
            pages: {...pages, 1: firstPage },
            totalDecks: decksIds.length,
            currentPage: 1,
            // factionDecksCount: factionDecksCount
        });
    }

    getDecksIds = async () => {
        try {
            const idsSnap = await realdb.ref(`/decks_meta/${this.props.match.params.faction}/ids`).once('value');
            return idsSnap.val();
        } catch(error) {
            console.log(error);
        }
    }

    preparePagesMeta = ids => {
        const maxDecksPerPage = 10;
        const paginatedIds = ids.reduce((acc, el, index, arr) => {
            if(index % maxDecksPerPage === 0) {
                acc.push(arr.slice(index, index + maxDecksPerPage));
            }

            return acc;
        }, []);

        const meta = paginatedIds.reduce((acc, el, index, arr) => {
            const from = arr.slice(0, index).reduce((total, el) => total += el.length, 0);
            const until = from + el.length;
            acc[index + 1] = {
                ids: el,
                decksFrom: from + 1,
                decksUntil: until
            };

            return acc;
        }, {})

        return meta;
    }

    loadPageData = async (ids) => {
        try {
            let page = [];
            for(let id of ids) {
                //const deckDataRef = await db.collection('decks').doc(id).get();
                const snapshot = await firebase.database().ref('/decks/' + id).once('value');
                //const deck = deckDataRef.data();
                const deck = snapshot.val();
                console.log(id, deck);

                let created;
                if(deck.created.seconds) {
                    created = new Date(0);
                    created.setSeconds(deck.created.seconds);
                } else {
                    created = deck.created;
                }

                page.push({...deck, id: id, created: created});
            }

            return page;
        } catch(err) {
            console.error(err);
        } 
    }

    loadPage = async (pageNumber, lastItemOnPreviousPage) => {
        try {
            let snapshot;
            if(lastItemOnPreviousPage) {
                console.log('HERE');
                snapshot = await db.collection('decks').orderBy('created', 'desc').startAfter(lastItemOnPreviousPage).limit(10).get();
            } else {
                snapshot = await db.collection('decks').orderBy('created', 'desc').limit(10).get();
            }
            
            const lastItem = snapshot.docs[snapshot.docs.length - 1];
            console.log('Last: ', lastItem);
            console.log('Size: ', snapshot.size);
            const ds = await Promise.all(snapshot.docs.map(async d => {
                const deck = d.data();
                if(deck.author !== 'Anonymous') {
                    const userProfileRef = await db.collection('users').doc(deck.author).get();
                    return ({...deck, id: d.id, created: deck.created.toDate(), author: userProfileRef.data().displayName, authorId: deck.author});                        
                } else {
                    return ({...deck, id: d.id, created: deck.created.toDate(), authorId: deck.author });
                }
            }));

            return {
                lastItemOnPage: lastItem,
                decks: ds
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    componentWillUnmount = () => {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    handleDeckCountClick(faction) {
        console.log('Ping!', faction);
        this.props.history.replace(`/decks/${faction}`);
    }

    render() {
        const { classes, history } = this.props;
        console.log('RENDER', this.state.pages);
        return (
            <div className={classes.root}>
                <div className={classnames(classes.decksList)}>
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
                        this.state.currentPage > 0 && (
                            <Navigator decksFrom={this.state.pages[this.state.currentPage].decksFrom}
                                decksTo={this.state.pages[this.state.currentPage].decksUntil}
                                totalDecks={this.state.totalDecks} 
                                onNavigatePrev={this.loadPrevPage} 
                                onNavigateNext={this.loadNextPage}  />
                        )
                    }
                    {
                        this.state.currentPage > 0 && (
                            this.state.pages[this.state.currentPage].decks.map(deck => {
                                const bannedCardsCount = deck.cards.filter(id => Boolean(bannedCards[id])).length;
                                const restrictedCardsCount = deck.cards.filter(id => Boolean(restrictedCards[id])).length;
    
                                return (
                                    <div key={deck.id} className={classes.item}>
                                        <DeckThumbnail onClick={this.handleThumbnailClick.bind(this, deck.id)} 
                                            factionId={deck.id} 
                                            title={deck.name} 
                                            author={deck.authorDisplayName} 
                                            date={deck.created}
                                            sets={deck.sets}
                                            objectives={deck.cards.map(c => ({ id: c, ...cardsDb[c]})).filter(c => c.type === 0)}
                                            banned={bannedCardsCount}
                                            restricted={restrictedCardsCount} />
                                    </div>
                                );
                            })
                        )
                    }
                </div>
                <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }

    handleThumbnailClick = id => {
        this.props.history.push(`/view/deck/${id}`);
    }

    loadPrevPage = async () => {
        if(this.state.currentPage <= 1) {
            return;
        }

        const prevPageNumber = this.state.currentPage - 1;

        this.setState({ loading: true });

        //const totalAmountOfDecks = await this.getTotalDecksCount();
        // const pages = this.preparePagesMeta(totalAmountOfDecks);
        // console.log(pages);
        //const prevPageMeta = await this.loadPage(prevPageNumber, prevPageNumber === 1 ? null : this.state.pages[prevPageNumber - 1].lastItemOnPage);
        const prevPageDecks = await this.loadPageData(this.state.pages[prevPageNumber].ids);
        const prevPage = {...this.state.pages[prevPageNumber], decks: prevPageDecks};
        
        this.setState(state => ({
            loading: false,
            pages: {...state.pages, [state.currentPage - 1]: prevPage },
            currentPage: prevPageNumber
        }));
    }

    loadNextPage = async () => {
        this.setState({ loading: true });

        //const totalAmountOfDecks = await this.getTotalDecksCount();
        // const pages = this.preparePagesMeta(totalAmountOfDecks);
        // console.log(pages);
        // const nextPageMeta = await this.loadPage(this.state.currentPage + 1, this.state.pages[this.state.currentPage].lastItemOnPage);
        const nextPageDecks = await this.loadPageData(this.state.pages[this.state.currentPage + 1].ids);
        const nextPage = {...this.state.pages[this.state.currentPage + 1], decks: nextPageDecks};
        
        this.setState(state => ({
            loading: false,
            pages: {...state.pages, [state.currentPage + 1]: nextPage },
            currentPage: state.currentPage + 1
        }));
    }

    updateCurrentPage = page => {
        this.setState(state => ({ currentPage: page, pageStart: (page - 1) * state.pageLength }));
    }
}

const mapStateToProps = state => {
    return {
        selectedFactions: state.decksFilters.showDecksForFactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFactionsChange: factions => dispatch({ type: SET_FACTIONS_FILTER, payload: factions })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Decks)));