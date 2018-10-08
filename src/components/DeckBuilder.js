import React, { Component } from 'react';
import "./DeckBuilder.css";
import { OrderedSet, Set } from 'immutable';

import { getWUCardByIdFromDB } from '../components/WUCard';
import Deck from '../components/Deck';
import { cardsDb, factions, getCardsByFactionAndSets, factionIdPrefix } from '../data/index';
import firebase, { db } from '../firebase';

import ExpansionsToggle from '../components/ExpansionsToggle';
import CardTypeToggle from '../components/CardTypeToggle';
import FloatingActionButton from '../components/FloatingActionButton';
import DelayedSearch from '../components/DelayedSearch';
import ReorderIcon from '@material-ui/icons/Reorder';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import AnimateHeight from 'react-animate-height';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SimpleSnackbar from './SimpleSnackbar';
import CardLibraryFilters from './DeckBuiilder/components/CardLibraryFilters';
import CardsLibrary from './DeckBuiilder/components/CardsLibrary';

const uuid4 = require('uuid/v4');

class DeckBuilder extends Component {
    state = {
        cards: new Set(),
        selectedSets: this.props.selectedSets,
        factionCards: new OrderedSet(),
        universalCards: new OrderedSet(),
        deck: new OrderedSet(),
        isMobileDeckVisible: false,
        searchText: "",
        filtersVisible: false,
        visibleCardTypes: [0, 1, 2, 3],
        showNotification: false
    };

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <CardLibraryFilters />
                <CardsLibrary />
                <div className="sideDeck" style={{flex: '1 1 auto'}}>
                    <Deck faction={this.props.selectedFaction} 
                        currentName={this.props.currentDeckName}
                        currentSource={this.props.currentDeckSource}
                        currentDescription={this.props.currentDeckDescription}
                        changeName={this.props.changeName}
                        changeSource={this.props.changeSource}
                        changeDescription={this.props.changeDescription}
                        selectedCards={this.props.currentDeck}
                        addCard={this.props.addCard} 
                        removeCard={this.props.removeCard}
                        onSave={this._saveCurrentDeck}
                        onRemoveAll={this.props.clearDeck} />
                </div>
                <div className="fullscreenDeck" style={{visibility: this.state.isMobileDeckVisible ? 'visible' : 'hidden', opacity: 1, transition: 'opacity 0.5s ease'}}>
                    <Deck faction={this.props.selectedFaction} 
                            currentName={this.props.currentDeckName}
                            currentSource={this.props.currentDeckSource}
                            currentDescription={this.props.currentDeckDescription}
                            changeName={this.props.changeName}
                            changeSource={this.props.changeSource}
                            changeDescription={this.props.changeDescription}
                            selectedCards={this.props.currentDeck} 
                            addCard={this.props.addCard} 
                            removeCard={this.props.removeCard}
                            onSave={this._saveCurrentDeck}
                            onRemoveAll={this.props.clearDeck} />
                </div>
                { this.state.showNotification && <SimpleSnackbar position="center" message="Save was successful!" /> }
                <FloatingActionButton isEnabled onClick={this._handleShowDeckMobile}>
                    <ReorderIcon />
                </FloatingActionButton>
            </div>
            );
    }

    _handleShowDeckMobile = () => {
        this.setState(state => ({isMobileDeckVisible: !state.isMobileDeckVisible}));
    }

    _saveCurrentDeck = () => {
        const deckId = `${factionIdPrefix[this.props.selectedFaction]}-${uuid4().slice(-12)}`;
        const currentDeck = this.props.currentDeck.map(c => c.id).toJS();
        const objectiveScoringSummary = currentDeck.map(x => {
            const { type, scoreType } = cardsDb[x];
            if(type === 0) {
                return scoreType;
            }

            return -1;
        }).reduce((acc, x) => {
            if(x < 0) return acc;
            acc[x] += 1;
            return acc;
        }, [0, 0, 0, 0]);


        const deckPayload = {
            name: this.props.currentDeckName,
            source: '',
            desc: this.props.currentDeckDescription,
            cards: currentDeck,
            sets: new OrderedSet(this.props.currentDeck.map(c => c.set)).toJS(),
            scoringSummary: objectiveScoringSummary,
            tags: [],
            created: new Date(),
            author: this.props.isAuth ? this.props.userInfo.uid : 'Anonymous'
        }

        if(this.props.isAuth) {
            const batch = db.batch();
            const userRef = db.collection('users').doc(this.props.userInfo.uid);
            const deckRef = db.collection('decks').doc(deckId);
            batch.set(deckRef, deckPayload);
            batch.update(userRef, {
                mydecks: firebase.firestore.FieldValue.arrayUnion(deckId)
            });

            batch.commit()
                .then(() => {
                    console.log('SAVED DECK', deckId);
                    this.props.resetDeck();
                    this.setState({showNotification: true});
                    this.props.history.push('/mydecks');
                })
                .catch(error => {
                    const otherBatch = db.batch();
                    const userRef = db.collection('users').doc(this.props.userInfo.uid);
                    const deckRef = db.collection('decks').doc(deckId);
                    otherBatch.set(deckRef, deckPayload);
                    otherBatch.set(userRef, {
                        mydecks: [deckId]
                    });
                    otherBatch.commit()
                            .then(() => {
                                console.log('SAVED DECK AFTER ERROR', deckId);
                                this.props.resetDeck();
                                this.setState({showNotification: true});
                                this.props.history.push('/mydecks');
                            })
                            .catch(error => console.log(error));    
                });
        } else {
            db.collection('decks')
                .doc(deckId)
                .set(deckPayload)
                .then(() => {
                    this.props.resetDeck();
                    this.setState({showNotification: true});
                    this.props.history.push('/');
                })
                .catch(error => console.log('ERROR', error));    
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth !== null,
        userInfo: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(DeckBuilder));