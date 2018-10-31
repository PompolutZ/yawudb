import React, { Component, PureComponent } from 'react';
import firebase, { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import FactionsFilterToggle from '../components/FactionsFilterToggle';
import { Typography, Button, ButtonBase } from '@material-ui/core';
import { filterFactionByIdRange } from '../data/index';
import { connect } from 'react-redux';
import { SET_FACTIONS_FILTER } from '../reducers/decksFilters';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Subject, Observable, combineLatest, merge, of } from 'rxjs';
import { switchMap, mergeAll, take } from 'rxjs/operators';

const uuid4 = require('uuid/v4');

const styles = theme => ({
    root : {
        display: 'flex',
        flexFlow: 'row wrap',
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
                    margin: '0 0 0 .3rem'}}
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

    componentDidUpdate = prevProps => {
        if(this.props.totalPages !== prevProps.totalPages) {
            this.setState({ totalPages: pagesFromTotalPages(this.props.totalPages) });
        }
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

class Decks extends Component {
    state = {
        decks: [],
        loading: false,
        currentPage: 0,
        pageStart: 0,
        pageLength: 10,
        totalPages: 0
    }

    componentDidMount = async () => {
        await this._reloadWithFilters();
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

            this.setState({ loading: false, currentPage: 1, totalPages: Math.ceil(result.length / 10), decks: decks, pageStart: 0 });
        });
    }

    componentWillUnmount = () => {
        this.subscription.unsubscribe();
    }

    render() {
        const { classes, history } = this.props;
        return (
            <div className={classes.root}>
                <div className={classnames(classes.filters)}>
                    <Typography variant="body2" style={{marginBottom: '.5rem'}}>Show decks for selected factions:</Typography>
                    <FactionsFilterToggle isVertical={window.matchMedia('(min-width: 800px)').matches} onFactionsChange={this.props.onFactionsChange} selectedFactions={this.props.selectedFactions} />
                    <Button style={{backgroundColor: '#3B9979', color: 'white', alignSelf:'flex-end', marginTop: '1rem'}}
                            onClick={this._reloadWithFilters}>
                        Reload
                    </Button>
                </div>
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
                        this.state.totalPages > 1 && (
                            <Pagination currentPage={this.state.currentPage} 
                                totalPages={this.state.totalPages} 
                                onCurrentPageChange={this.updateCurrentPage} />
                        )
                    }
                    {
                        this.state.decks.slice(this.state.pageStart, this.state.pageStart + this.state.pageLength).map(d => (
                            <DeckOverview key={uuid4()} isEditable={false} {...d} />
                        ))
                    }
                </div>
                <FloatingActionButton isEnabled onClick={() => history.push('/newdeck')}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
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