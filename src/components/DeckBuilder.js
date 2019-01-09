import React, { Component } from 'react';
import "./DeckBuilder.css";
import { OrderedSet, Set } from 'immutable';

import Deck from '../components/Deck';
import { cardsDb, factionIdPrefix } from '../data/index';
import firebase, { db } from '../firebase';

import FloatingActionButton from '../components/FloatingActionButton';
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
                    <CardLibraryFilters editMode={this.props.editMode} />
                    <CardsLibrary editMode={this.props.editMode} />
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
                        onSave={this._saveCurrentDeck}
                        onUpdate={this._updateCurrentDeck}
                        onCancel={this._cancelUpdate}
                        onRemoveAll={this.props.clearDeck} />
                </div>
                { this.state.showNotification && <SimpleSnackbar position="center" message="Save was successful!" /> }
                <FloatingActionButton isEnabled onClick={this._handleShowDeckMobile}>
                    {
                        !this.state.isMobileDeckVisible && (
                            <svg width="40" height="31" viewBox="0 0 40 31" fill="none">
                                <path d="M17.4313 0H17.4381L22.9498 0.0106234C22.9529 0.00725778 22.9562 0.00567981 22.9582 0.00389181C22 0.665979 21.2461 1.63413 20.8521 2.80832L14.3475 22.1917C14.3174 22.2795 14.2921 22.3656 14.2666 22.4528L14.3037 3.18717C14.3072 1.4242 15.7077 0 17.4313 0ZM1.0859 15.5037C-0.223877 14.3516 -0.368423 12.3326 0.759228 10.9978L3.83662 7.35364C3.88037 7.49311 3.92567 7.63247 3.97962 7.76846L10.2806 23.6102L1.0859 15.5037ZM11.9874 3.18486L11.952 21.5261L6.12569 6.8774C5.47595 5.24348 6.24367 3.37943 7.84265 2.71388L12.5428 0.762006C12.1929 1.49488 11.9908 2.31673 11.9874 3.18486ZM39.8307 9.4536L33.326 28.8365C32.8816 30.1639 31.6661 31 30.3665 31C30.0299 31 29.6901 30.9432 29.3531 30.8245L18.4817 27.019C16.8489 26.448 15.9768 24.6283 16.5394 22.9587L23.0437 3.57548C23.4881 2.24952 24.7036 1.41505 26.003 1.41505C26.3367 1.41505 26.6798 1.47079 27.0164 1.58912L37.8844 5.39504C39.5207 5.96773 40.3894 7.7835 39.8307 9.4536Z" fill="white">
                                </path>
                            </svg>
                        )
                    }
                    {
                        this.state.isMobileDeckVisible && (
                            <svg version="1.1" id="Layer_1" x="0px" y="0px" width="19.2" height="24.2" viewBox="0 0 19.2 24.2" fill="none">
                                <path d="M17.1,0h-15C1,0,0,1,0,2.1v20c0,1.2,1,2.1,2.1,2.1h15c1.2,0,2.1-1,2.1-2.1v-20C19.2,1,18.3,0,17.1,0z M14.6,12.5c0,0.4-0.3,0.7-0.7,0.7h-2.5v2.5c0,0.4-0.3,0.7-0.7,0.7H9.3c-0.4,0-0.7-0.3-0.7-0.7v-2.5H6.1c-0.4,0-0.7-0.3-0.7-0.7 v-1.4c0-0.4,0.3-0.7,0.7-0.7h2.5V7.8c0-0.4,0.3-0.7,0.7-0.7h1.4c0.4,0,0.7,0.3,0.7,0.7v2.5h2.5c0.4,0,0.7,0.3,0.7,0.7V12.5z" fill="white">
                                </path>
                            </svg>
                        )
                    }
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
        setTimeout(() => {
            this.props.resetDeck();
            this.props.resetSearchText();
        }, 300);
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
                                this.props.resetSearchText();
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
                    this.props.resetSearchText();
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