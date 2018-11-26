import React, { Component } from 'react';
import "./DeckBuilder.css";
import { OrderedSet, Set } from 'immutable';

import Deck from '../components/Deck';
import { cardsDb, factionIdPrefix } from '../data/index';
import firebase, { db } from '../firebase';

import FloatingActionButton from '../components/FloatingActionButton';
import ReorderIcon from '@material-ui/icons/Reorder';

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
        isMobileDeckVisible: this.props.editMode,
        searchText: "",
        filtersVisible: false,
        visibleCardTypes: [0, 1, 2, 3],
        showNotification: false
    };

    render() {
        return (
            <div className="wrapper" style={{display: 'flex', flexFlow: 'row wrap'}}>
                <div className="filters">
                    <CardLibraryFilters />
                    <CardsLibrary />
                </div>
                <div className="sideDeck">
                    <Deck faction={this.props.selectedFaction}
                        editMode={this.props.editMode} 
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
                        onUpdate={this._updateCurrentDeck}
                        onCancel={this._cancelUpdate}
                        onRemoveAll={this.props.clearDeck} />
                </div>
                <div className="fullscreenDeck" style={{visibility: (this.state.isMobileDeckVisible && window.matchMedia('(max-width: 800px)').matches) ? 'visible' : 'hidden', opacity: 1, transition: 'opacity 0.5s ease'}}>
                    <Deck faction={this.props.selectedFaction} 
                        editMode={this.props.editMode} 
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
                        onUpdate={this._updateCurrentDeck}
                        onCancel={this._cancelUpdate}
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

    _updateCurrentDeck = () => {
        const objectiveScoringSummary = this.props.currentDeck.map(x => {
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
            cards: new OrderedSet(this.props.currentDeck).toJS(),
            sets: new OrderedSet(this.props.currentDeck.map(c => cardsDb[c].set)).toJS(),
            scoringSummary: objectiveScoringSummary,
            tags: [],
            created: new Date(),
            author: this.props.userInfo.uid
        }

        const deckRef = db.collection('decks').doc(this.props.match.params.id);
        deckRef.update(deckPayload)
            .then(() => this._resetAndGoBack())
            .catch(err => console.log(err));
    }

    _cancelUpdate = () => {
        this._resetAndGoBack();
    }

    _resetAndGoBack = () => {
        this.props.history.goBack();
        setTimeout(() => this.props.resetDeck(), 300);
    }

    _saveCurrentDeck = () => {
        const faction = this.props.selectedFaction.startsWith('n_') ? this.props.selectedFaction.slice(2) : this.props.selectedFaction;
        const deckId = `${factionIdPrefix[faction]}-${uuid4().slice(-12)}`;
        const objectiveScoringSummary = this.props.currentDeck.map(x => {
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
            cards: new OrderedSet(this.props.currentDeck).toJS(),
            sets: new OrderedSet(this.props.currentDeck.map(c => cardsDb[c].set)).toJS(),
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
                    this.props.resetDeck();
                    this.setState({showNotification: true});
                    this.props.history.push(`/view/deck/${deckId}`);
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
                                this.props.resetDeck();
                                this.setState({showNotification: true});
                                this.props.history.push(`/view/deck/${deckId}`);
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
                    this.props.history.push(`/view/deck/${deckId}`);
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

export default connect(mapStateToProps, null)(withRouter(DeckBuilder));