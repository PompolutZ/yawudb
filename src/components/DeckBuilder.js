import React, { Component } from 'react';
import "./DeckBuilder.css";
import { OrderedSet, Set } from 'immutable';

import { getWUCardByIdFromDB } from '../components/WUCard';
import Deck from '../components/Deck';
import { cardsDb, factions, getCardsByFactionAndSets } from '../data/index';
import { db } from '../firebase';

import ExpansionsToggle from '../components/ExpansionsToggle';
import CardTypeToggle from '../components/CardTypeToggle';
import FloatingActionButton from '../components/FloatingActionButton';
import DelayedSearch from '../components/DelayedSearch';
import ReorderIcon from '@material-ui/icons/Reorder';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import AnimateHeight from 'react-animate-height';

const uuid4 = require('uuid/v4');

class DeckBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: new Set(),
            selectedSets: [],
            factionCards: new OrderedSet(),
            universalCards: new OrderedSet(),
            deck: new OrderedSet(),
            isMobileDeckVisible: false,
            searchText: "",
            filtersVisible: false,
            visibleCardTypes: [0, 1, 2]
        };
        
        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.toggleCardInDeck = this.toggleCardInDeck.bind(this);
        this.toggleFiltersAreaVisibility = this.toggleFiltersAreaVisibility.bind(this);
        this.handleShowDeckMobile = this.handleShowDeckMobile.bind(this);
        this.saveCurrentDeck = this.saveCurrentDeck.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleCardTypes = this.toggleCardTypes.bind(this);
    }

    toggleExpansion(expansions) {
        const factionCards = getCardsByFactionAndSets(this.props.faction, expansions);
        const universalCards = getCardsByFactionAndSets('universal', expansions);
        this.setState({cards: new Set(factionCards).union(new Set(universalCards))});
    }

    toggleCardTypes(cardTypes) {
        this.setState({visibleCardTypes: cardTypes});
    }

    toggleCardInDeck(id, type, name, set) {
        const card = {id: id, type: type, name: name, set: set};
        const existingCard = this.state.deck.find(v => v.id === id);
        if(existingCard) {
            if(this.state.deck.count() === 1) {
                this.setState(state => ({isMobileDeckVisible: false, deck: state.deck.delete(existingCard)}));
            } else {
                this.setState(state => ({deck: state.deck.delete(existingCard)}));
            }
            
        } else {
            this.setState(state => ({deck: state.deck.add(card)}));
        }
    }

    toggleFiltersAreaVisibility() {
        this.setState(state => ({filtersVisible: !state.filtersVisible}));
    }

    saveCurrentDeck(name) {
        const id = uuid4();
        const deckPayload = {
            name: !name ? `${factions[this.props.faction]} Deck` : name,
            cards: this.state.deck.map(c => c.id).toJS(),
            sets: new OrderedSet(this.state.deck.map(c => c.set)).toJS(),
            created: new Date()
        }

        db.collection('decks')
            .doc(`${this.props.faction}-${id.slice(-12)}`)
            .set(deckPayload)
            .then(() => console.log('Writen!'))
            .catch(error => console.log(error));    
    }

    handleSearch(text) {
        this.setState({searchText: text});
    }

    componentDidMount() {
        console.log('Faction', this.props.faction);
        const cards = getCardsByFactionAndSets(this.props.faction, this.state.selectedSets);
        this.setState({cards: new Set(cards)});
    }

    componentWillUnmount() {
        console.log('Will Unmount');
    }

    handleShowDeckMobile() {
        this.setState(state => ({isMobileDeckVisible: !state.isMobileDeckVisible}));
    }

    render() {
        const filtersAreaHeight = this.state.filtersVisible ? 'auto' : 0;
        const searchText = this.state.searchText.toUpperCase();
        const cards = this.state.cards
            .map(cid => ({id: cid, ...cardsDb[cid]}))
            .filter(({ type }) => this.state.visibleCardTypes.includes(type))
            .filter(c => {
                if(!this.state.searchText) return true;

                return c.name.toUpperCase().includes(searchText) || c.rule.toUpperCase().includes(searchText);
            });

        const content = cards.toJS().sort((c1, c2) => c1.type - c2.type || c1.id - c2.id).map((c, i) => {
            const cardPN = parseInt(c.id.slice(-3), 10);
            return getWUCardByIdFromDB(c.id, cardPN, c, i % 2 === 0, this.toggleCardInDeck, this.state.deck.some(v => v.id === c.id))
        });

        return (
            <div style={{display: 'flex'}}>
                <div style={{flex: '1 1 auto'}}>
                    <div style={{ 
                        paddingBottom: '1rem', 
                        margin: '1rem .5rem 0 .5rem', 
                        display: 'flex', 
                        alignItems: 'center'}}>
                        
                        <DelayedSearch onSearchInputChange={this.handleSearch} />
                        <IconButton style={{color: 'white', backgroundColor: '#3B9979'}} onClick={this.toggleFiltersAreaVisibility}>
                            <FilterListIcon />
                        </IconButton>
                    </div>
                    <AnimateHeight 
                        duration={ 175 }
                        height={ filtersAreaHeight } // see props documentation bellow
                        >
                        <div style={{paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                            <div style={{display: 'flex', position: 'relative', marginBottom: '.5rem'}}>
                                <div>Toggle Sets:</div>
                                <div style={{flex: '1 1 auto', height: '1rem', borderBottom: '1px solid gray', margin: 'auto 1rem 0 .5rem'}}></div> 
                            </div>
                            <ExpansionsToggle onExpansionsChange={this.toggleExpansion} />
                        </div>
                        <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                            <div style={{display: 'flex', position: 'relative', marginBottom: '.5rem'}}>
                                <div>Toggle Types:</div>
                                <div style={{flex: '1 1 auto', height: '1rem', borderBottom: '1px solid gray', margin: 'auto 1rem 0 .5rem'}}></div> 
                            </div>
                            <CardTypeToggle oncardTypesChange={this.toggleCardTypes} />
                        </div>
                    </AnimateHeight>
                    { content }
                </div>
                <div className="sideDeck" style={{flex: '1 1 auto'}}>
                    <Deck faction={this.props.faction} 
                            cards={this.state.deck} 
                            onToggleCardInDeck={this.toggleCardInDeck}
                            onSave={this.saveCurrentDeck} />
                </div>
                <div className="fullscreenDeck" style={{visibility: this.state.isMobileDeckVisible && !this.state.deck.isEmpty() ? 'visible' : 'hidden', opacity: 1, transition: 'opacity 0.5s ease'}}>
                    <Deck faction={this.props.faction} 
                            cards={this.state.deck} 
                            onToggleCardInDeck={this.toggleCardInDeck}
                            onSave={this.saveCurrentDeck} />
                </div>
                <FloatingActionButton isEnabled={!this.state.deck.isEmpty()} onClick={this.handleShowDeckMobile}>
                    <ReorderIcon />
                </FloatingActionButton>
            </div>
            );
    }
}

export default DeckBuilder;