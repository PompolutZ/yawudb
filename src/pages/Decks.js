import React, { Component, PureComponent } from 'react';
import firebase, { db } from '../firebase';
import { List } from 'immutable';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { filterFactionByIdRange, bannedCards, restrictedCards, cardsDb } from '../data/index';
import { connect } from 'react-redux';
import { SET_FACTIONS_FILTER } from '../reducers/decksFilters';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Subject, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import DeckThumbnail from '../atoms/DeckThumbnail';

const uuid4 = require('uuid/v4');

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
        flexFlow: 'column nowrap',
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

const pagesFromTotalPages = totalPages => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return pages;
}

class PaginationButton extends PureComponent {
    render() {
        return (
            <ButtonBase 
                style={{ 
                    width: '3rem', 
                    backgroundColor: this.props.selected ? '#3B9979' : '#8FC6B3',
                    padding: '.5rem',
                    borderRadius: '.2rem',
                    margin: '0 0 .2rem .3rem'}}
                onClick={this.handleClick}>
                <Typography variant="button" style={{ color: 'white' }}>{this.props.pageNumber}</Typography>        
            </ButtonBase>            
        );
    }

    handleClick = () => {
        this.props.onPageNumberClick(this.props.pageNumber);
    }
}

class Pagination extends PureComponent {
    state = {
        currentPage: this.props.currentPage,
        totalPages: pagesFromTotalPages(this.props.totalPages)
    }

    render() {
        return (
            <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '1rem' }}>
            {
                this.state.totalPages.map(p => 
                    <PaginationButton key={p} pageNumber={p} selected={p === this.state.currentPage} onPageNumberClick={this.selectPage} />)
            }
            </div>
        );
    }

    selectPage = page => {
        this.setState({ currentPage: page });
        this.props.onCurrentPageChange(page);
    }
}

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
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const totalAmountOfDecks = await this.getTotalDecksCount();
        console.log(totalAmountOfDecks);
        const pages = this.preparePagesMeta(totalAmountOfDecks);
        console.log(pages);
        const firstPageMeta = await this.loadPage(1, null);
        console.log(firstPageMeta);
        const firstPage = {...pages[1], ...firstPageMeta};
        
        this.setState({
            loading: false,
            pages: {...pages, 1: firstPage },
            totalDecks: totalAmountOfDecks,
            currentPage: 1
        });
    }

    getTotalDecksCount = async () => {
        try {
            const decksMeta = await db.collection('meta').doc('decks_meta').get();
            return decksMeta.data().total;
        } catch(error) {
            console.log(error);
        }
    }

    preparePagesMeta = totalAmountOfDecks => {
        const maxDecksPerPage = 10;
        const totalPagesCount = Math.ceil(totalAmountOfDecks / 10);
        const pages = {};
        let decksFrom = 1;
        let decksUntil = totalAmountOfDecks > maxDecksPerPage ? maxDecksPerPage : totalAmountOfDecks;
        for(let i = 0; i < totalPagesCount; i += 1) {
            pages[i + 1] = {
                decksFrom: decksFrom,
                decksUntil: decksUntil,
                decks: [],
                lastItemOnPage: null
            };

            decksFrom = decksUntil + 1;
            decksUntil = decksUntil + maxDecksPerPage > totalAmountOfDecks ? totalAmountOfDecks : decksUntil + maxDecksPerPage;
        }

        return pages;
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

            // const pageMeta = {...this.state.pages[pageNumber], lastItemOnPage: lastItem, decks: ds};

            // return pageMeta;


            // this.setState(state => ({ 
            //     loading: false,
            //     currentPage: page,
            //     totalDecks: totalDecks,
            //     shownAmountOfDecks: snapshot.size,
            //     decksFrom: state.shownAmountOfDecks + 1,
            //     decksTo: state.shownAmountOfDecks + snapshot.size,
            //     shownAmountOfDecks: state.shownAmountOfDecks + snapshot.size,
            //     decks: ds,
            //     firstItemOnPage: {...state.firstItemOnPage, [page + 1]: lastItem }
            // }));
        }
        catch(error) {
            console.error(error);
        }
    }

    _reloadWithFilters = async () => {
        this.setState({ loading: true, decks: new List() });
        const decksRef = db.collection('decks');
        const id = firebase.firestore.FieldPath.documentId;
        const queries = this.props.selectedFactions.map(faction => {
            const { start, end } = filterFactionByIdRange[faction];
            if(start && end) {
                return decksRef.where(id(), ">=", start).where(id(), "<", end);
            } else {
                return decksRef.where(id(), ">=", start);
            }
        });

        const observables = [];
        for(let q of queries) {
            const observable = new Subject();
            q.onSnapshot(qs => {
                const data = qs.docs.map(d => ({id: d.id, ...d.data()}));
                observable.next(data);
            });
            observables.push(observable);
        }

        const combined = combineLatest(...observables);
        const mapped = combined.pipe(switchMap(values => {
            const reduced = values.reduce((acc, v) => [...acc, ...v], []);
            return of(reduced);
        }));
        
        this.subscription = mapped.subscribe(async result => {
            const decks = [];
            for(let r of result) {
                const created = r.created.toDate();
                if(r.author !== 'Anonymous') {
                    const userProfileRef = await db.collection('users').doc(r.author).get();
                    decks.push({ ...r, created: created, author: userProfileRef.data().displayName });
                } else {
                    decks.push({ ...r, created: created});
                }
            }

            this.setState({ 
                loading: false, 
                currentPage: 1, 
                totalPages: Math.ceil(result.length / 10), 
                decks: decks.sort((d1, d2) => d2.created - d1.created), 
                pageStart: 0 });
        });
    }

    componentWillUnmount = () => {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    render() {
        const { classes, history } = this.props;
        console.log('RENDER', this.state.pages);
        return (
            <div className={classes.root}>
                {/* <div className={classnames(classes.filters)}>
                    <Typography variant="body2" style={{marginBottom: '.5rem'}}>Show decks for selected factions:</Typography>
                    <FactionsFilterToggle isVertical={window.matchMedia('(min-width: 800px)').matches} onFactionsChange={this.props.onFactionsChange} selectedFactions={this.props.selectedFactions} />
                    <Button style={{backgroundColor: '#3B9979', color: 'white', alignSelf:'flex-end', marginTop: '1rem'}}
                            onClick={this._reloadWithFilters}>
                        Reload
                    </Button>
                </div> */}
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
                                            author={deck.author} 
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
        const prevPageMeta = await this.loadPage(prevPageNumber, prevPageNumber === 1 ? null : this.state.pages[prevPageNumber - 1].lastItemOnPage);
        const prevPage = {...this.state.pages[prevPageNumber], ...prevPageMeta};
        
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
        const nextPageMeta = await this.loadPage(this.state.currentPage + 1, this.state.pages[this.state.currentPage].lastItemOnPage);
        const nextPage = {...this.state.pages[this.state.currentPage + 1], ...nextPageMeta};
        
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