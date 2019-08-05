import React, { Component } from 'react'
import FactionToggle from '../components/FactionToggle'
import DeckBuilder from '../components/DeckBuilder'
import {
    SET_FACTION,
    CHANGE_NAME,
    CHANGE_SOURCE,
    ADD_CARD,
    REMOVE_CARD,
    CLEAR_DECK,
    RESET_DECK,
    CHANGE_DESCRIPTION,
} from '../reducers/deckUnderBuild'
import {
    EDIT_RESET_DECK,
    EDIT_FACTION,
    EDIT_DECK_NAME,
    EDIT_DECK_DESCRIPTION,
    EDIT_ADD_CARD,
    EDIT_REMOVE_CARD,
    EDIT_CLEAR_ALL_CARDS_IN_DECK,
    EDIT_DECK_SOURCE,
} from '../reducers/deckUnderEdit'
import { CHANGE_SEARCH_TEXT } from '../reducers/cardLibraryFilters'
import { connect } from 'react-redux'
import FactionToggleDesktopBase from '../atoms/FactionToggleDesktop'
import { Helmet } from 'react-helmet';
import { cardsIdToFactionIndex, factionIndexes, warbandsWithDefaultSet, factionIndexesWithDefaultSet } from '../data/atoms/factions';

const decodeFaction = cards => {
    for (let card of cards) {
        if(!cardsIdToFactionIndex[card]) continue;

        return cardsIdToFactionIndex[card];
    }
}

const decodeUDS = card => {
    if(card.length < 4) return '01' + `000${card}`.slice(-3);
    if(card.startsWith('1')) return '02' + `000${card.slice(1)}`.slice(-3);
    if(card.startsWith('2')) return '03' + `000${card.slice(1)}`.slice(-3);
    if(card.startsWith('3')) return '04' + `000${card.slice(1)}`.slice(-3);
    if(card.startsWith('4')) return '05' + `000${card.slice(1)}`.slice(-3);
    if(card.startsWith('5')) return '06' + `000${card.slice(1)}`.slice(-3);
}

const decodeUDB = card => {
    if(card.toUpperCase().startsWith('L')) return '02' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('N')) return '03' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('P')) return '04' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('D')) return '05' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('B')) return '06' + `000${card.slice(1)}`.slice(-3);
    return '01' + `000${card}`.slice(-3);
}

const getDecodingFunction = encoding => {
    if(encoding === 'udb') return decodeUDB;

    return decodeUDS;
}

class DeckCreator extends Component {
    state = {
        isEdit: this.props.match.params.action === 'edit',
        isTransfer: this.props.match.params.action === 'transfer',
    }

    componentDidMount() {
        const action = this.props.match.params.action;
        if(action !== 'transfer') return;

        const transferData = this.props.match.params.data.split(',');
        console.log(transferData);
        this.props.clearDeck();

        const decode = getDecodingFunction(transferData[0]);
        const decodedCardsIds = transferData.slice(1).map(decode);
        const [decodedFaction, decodedFactionDefaultSet] = factionIndexesWithDefaultSet[decodeFaction(decodedCardsIds)];
        console.log(decodedFaction);
        this.props.setFaction(decodedFaction, decodedFactionDefaultSet);
        console.log(decodedCardsIds);
        decodedCardsIds.forEach(cardId => this.props.addCard(cardId));
    }

    static getDerivedStateFromProps(props, state) {
        const isEdit = props.match.params.action === 'edit';
        if (isEdit !== state.isEdit) {
            return {
                isEdit: isEdit,
            }
        }

        const isTransfer = props.match.params.action === 'transfer';
        if(isTransfer !== state.isTransfer) {
            return {
                isTransfer: isTransfer,
            }
        }

        return null
    }

    render() {
        const selectedFaction = this.state.isEdit
            ? this.props.editSelectedFaction
            : this.props.selectedFaction
        const setFaction = this.state.isEdit
            ? this.props.editFaction
            : this.props.setFaction
        return (
            <React.Fragment>
                <Helmet>
                    <title>
                        Warhammer Underworlds: Nightvault (Shadespire) Deck Builder
                    </title>
                    <link rel="canonical" href="https://yawudb.com/deck/create" />
                </Helmet>

                <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <div>
                        <FactionToggle
                            key={selectedFaction}
                            editMode={this.state.isEdit}
                            selectedFaction={selectedFaction}
                            setFaction={setFaction}
                        />
                        {/* <FactionToggleDesktopBase faction={selectedFaction} edit={this.state.isEdit} setFaction={setFaction} /> */}
                    </div>
                    <DeckBuilder
                        key={selectedFaction}
                        selectedFaction={selectedFaction}
                        editMode={this.state.isEdit}
                        transferMode={this.state.isTransfer}
                        currentDeck={
                            this.state.isEdit
                                ? this.props.editCurrentDeck
                                : this.props.currentDeck
                        }
                        currentDeckName={
                            this.state.isEdit
                                ? this.props.editCurrentDeckName
                                : this.props.currentDeckName
                        }
                        currentDeckSource={
                            this.state.isEdit
                                ? this.props.editCurrentDeckSource
                                : this.props.currentDeckSource
                        }
                        currentDeckDescription={
                            this.state.isEdit
                                ? this.props.editCurrentDeckDescription
                                : this.props.currentDeckDescription
                        }
                        setFaction={
                            this.state.isEdit
                                ? this.props.editFaction
                                : this.props.setFaction
                        }
                        changeName={
                            this.state.isEdit
                                ? this.props.editName
                                : this.props.changeName
                        }
                        changeSource={
                            this.state.isEdit
                                ? this.props.editSource
                                : this.props.changeSource
                        }
                        changeDescription={
                            this.state.isEdit
                                ? this.props.editDescription
                                : this.props.changeDescription
                        }
                        clearDeck={
                            this.state.isEdit
                                ? this.props.editClearDeck
                                : this.props.clearDeck
                        }
                        resetDeck={
                            this.state.isEdit
                                ? this.props.resetEditDeck
                                : this.props.resetDeck
                        }
                        resetSearchText={this.props.resetSearchText}
                    />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedFaction: state.deckUnderBuild.faction,
        selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source,
        currentDeckDescription: state.deckUnderBuild.desc,

        editSelectedFaction: state.deckUnderEdit.faction,
        editSelectedFactionDefaultSet: state.deckUnderEdit.factionDefaultSet,
        editCurrentDeck: state.deckUnderEdit.deck,
        editCurrentDeckName: state.deckUnderEdit.name,
        editCurrentDeckSource: state.deckUnderEdit.source,
        editCurrentDeckDescription: state.deckUnderEdit.desc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFaction: (faction, defaultSet) =>
            dispatch({
                type: SET_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
        changeName: value => dispatch({ type: CHANGE_NAME, name: value }),
        changeSource: value => dispatch({ type: CHANGE_SOURCE, source: value }),
        changeDescription: value =>
            dispatch({ type: CHANGE_DESCRIPTION, desc: value }),
        addCard: card => dispatch({ type: ADD_CARD, card: card }),
        removeCard: card => dispatch({ type: REMOVE_CARD, card: card }),
        clearDeck: () => dispatch({ type: CLEAR_DECK }),
        resetDeck: () => dispatch({ type: RESET_DECK }),

        editFaction: (faction, defaultSet) =>
            dispatch({
                type: EDIT_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
        editName: value => dispatch({ type: EDIT_DECK_NAME, name: value }),
        editSource: value =>
            dispatch({ type: EDIT_DECK_SOURCE, source: value }),
        editDescription: value =>
            dispatch({ type: EDIT_DECK_DESCRIPTION, desc: value }),
        editAddCard: card => dispatch({ type: EDIT_ADD_CARD, card: card }),
        editRemoveCard: card =>
            dispatch({ type: EDIT_REMOVE_CARD, card: card }),
        editClearDeck: () => dispatch({ type: EDIT_CLEAR_ALL_CARDS_IN_DECK }),
        resetEditDeck: () => dispatch({ type: EDIT_RESET_DECK }),

        resetSearchText: () =>
            dispatch({ type: CHANGE_SEARCH_TEXT, payload: '' }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreator)
