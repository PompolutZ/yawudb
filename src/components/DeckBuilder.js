import React, { Component } from 'react';
import "./DeckBuilder.css";
import { OrderedSet, Set } from 'immutable';

import Deck from '../components/Deck';
import { cardsDb, factionIdPrefix } from '../data/index';
import firebase, { db, realdb } from '../firebase';

import FloatingActionButton from '../components/FloatingActionButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SimpleSnackbar from './SimpleSnackbar';
import CardLibraryFilters from './DeckBuiilder/components/CardLibraryFilters';
import CardsLibrary from './DeckBuiilder/components/CardsLibrary';
import { AddCardSVG, DeckSVG } from '../atoms/SVGs';

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
                            <DeckSVG />
                        )
                    }
                    {
                        this.state.isMobileDeckVisible && (
                            <AddCardSVG />
                        )
                    }
                </FloatingActionButton>
            </div>
            );
    }

    _handleShowDeckMobile = () => {
        this.setState(state => ({isMobileDeckVisible: !state.isMobileDeckVisible}));
    }

    _updateCurrentDeck = async () => {
        try {
            const faction = this.props.selectedFaction.startsWith('n_') ? this.props.selectedFaction.slice(2) : this.props.selectedFaction;
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
                created: Date(),
                author: this.props.userInfo.uid,
                authorDisplayName: this.props.isAuth ? this.props.userInfo.displayName : 'Anonymous',
            }

            await realdb.ref('decks/' + this.props.match.params.id).set(deckPayload);
            await realdb.ref('lastDeck').transaction(lastDeck => {
                if(lastDeck) {
                    lastDeck.id = this.props.match.params.id;
                }

                return lastDeck;
            });

            await this.moveIdToFront(realdb.ref('/decks_meta/all'), this.props.match.params.id);
            await this.moveIdToFront(realdb.ref(`/decks_meta/${factionIdPrefix[faction]}`), this.props.match.params.id);

            this._resetAndGoBack();
        } catch(err) {
            console.error('ERROR updating deck: ', err);
        }
    }

    moveIdToFront = (ref, id) => {
        return ref.transaction(meta => {
            if(meta) {
                const diff = meta.ids.filter(x => x !== id);
                console.log(diff);
                meta.ids = [id, ...diff];
                console.log(meta.ids);
            }

            return meta;
        });
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

    _saveCurrentDeck = async () => {
        try {
            const faction = this.props.selectedFaction.startsWith('n_') ? this.props.selectedFaction.slice(2) : this.props.selectedFaction;
            const deckId = `${factionIdPrefix[faction]}-${uuid4().slice(-12)}`;
            const objectiveScoringSummary = this.props.currentDeck.map(x => {
                const { type, scoreType } = cardsDb[x];
                
                if(type === 0) {
                    console.log(cardsDb[x], scoreType);
                    return scoreType;
                }
    
                return -1;
            }).reduce((acc, x) => {
                if(x < 0) return acc;
                acc[x] += 1;
                return acc;
            }, [0, 0, 0, 0]);
            
            console.log(objectiveScoringSummary);
    
            const deckPayload = {
                name: this.props.currentDeckName,
                source: '',
                desc: this.props.currentDeckDescription,
                cards: new OrderedSet(this.props.currentDeck).toJS(),
                sets: new OrderedSet(this.props.currentDeck.map(c => cardsDb[c].set)).toJS(),
                scoringSummary: objectiveScoringSummary,
                tags: [],
                created: Date(),
                author: this.props.isAuth ? this.props.userInfo.uid : 'Anonymous',
                authorDisplayName: this.props.isAuth ? this.props.userInfo.displayName : 'Anonymous',
            }

            console.log(deckPayload);
    
            if(this.props.isAuth) {
                await db.collection('users').doc(this.props.userInfo.uid).update({
                    mydecks: firebase.firestore.FieldValue.arrayUnion(deckId)
                });
            }

            await realdb.ref('decks/' + deckId).set(deckPayload);
            await realdb.ref('lastDeck').transaction(lastDeck => {
                if(lastDeck) {
                    lastDeck.id = deckId;
                }

                return lastDeck;
            });

            await realdb.ref('/decks_meta/all').transaction(meta => this._updateMetaCountAndIds(meta, deckId));
            await realdb.ref(`/decks_meta/${factionIdPrefix[faction]}`).transaction(meta => this._updateMetaCountAndIds(meta, deckId));

            this.props.resetDeck();
            this.props.resetSearchText();
            this.setState({showNotification: true});
            this.props.history.push(`/view/deck/${deckId}`);

        } catch(err) {
            console.error('ERROR saving new deck: ', err);
        }
    }

    _updateMetaCountAndIds = (meta, deckId) => {
        if(meta) {
            meta.count += 1;
            if(meta.ids) {
                meta.ids = [deckId, ...meta.ids];
            } else {
                meta.ids = [deckId];
            }
        }

        return meta;
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth !== null,
        userInfo: state.auth
    }
}

export default connect(mapStateToProps, null)(withRouter(DeckBuilder));