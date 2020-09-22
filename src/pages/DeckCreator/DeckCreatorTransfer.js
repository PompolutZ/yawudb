import React from 'react'
import FactionToggle from '../../components/FactionToggle'
import DeckBuilder from '../../components/DeckBuilder'
import {
    SET_FACTION,
    CHANGE_NAME,
    CHANGE_SOURCE,
    ADD_CARD,
    REMOVE_CARD,
    CLEAR_DECK,
    RESET_DECK,
    CHANGE_DESCRIPTION,
} from '../../reducers/deckUnderBuild'
import { CHANGE_SEARCH_TEXT } from '../../reducers/cardLibraryFilters'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';
import { cardsIdToFactionIndex, factionIndexesWithDefaultSet } from '../../data/atoms/factions';

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
    if(card.startsWith('6')) return '07' + `000${card.slice(1)}`.slice(-3);
    if(card.startsWith('7')) return '08' + `000${card.slice(1)}`.slice(-3);
}

const decodeUDB = card => {
    if(card.toUpperCase().startsWith('L')) return '02' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('N')) return '03' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('P')) return '04' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('D')) return '05' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('B')) return '06' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('G')) return '07' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('A')) return '08' + `000${card.slice(1)}`.slice(-3);
    return '01' + `000${card}`.slice(-3);
}

const getDecodingFunction = encoding => {
    if(encoding === 'udb') return decodeUDB;

    return decodeUDS;
}

function DeckCreatorTransfer(props) {
    console.log(props);
    const selectedFaction = props.selectedFaction;
    const setFaction = props.setFaction;

    React.useEffect(() => {
        const transferData = props.match.params.data.split(',');
        props.clearDeck();

        const decode = getDecodingFunction(transferData[0]);
        const decodedCardsIds = transferData.slice(1).map(decode);
        const [decodedFaction, decodedFactionDefaultSet] = factionIndexesWithDefaultSet[decodeFaction(decodedCardsIds)];
        props.setFaction(decodedFaction, decodedFactionDefaultSet);
        decodedCardsIds.forEach(cardId => props.addCard(cardId));
    }, [])

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
                        editMode={false}
                        selectedFaction={selectedFaction}
                        setFaction={setFaction}
                    />
                </div>

                <DeckBuilder
                    key={selectedFaction}
                    selectedFaction={selectedFaction}
                    editMode={false}
                    transferMode={true}
                    currentDeck={props.currentDeck}
                    currentDeckName={props.currentDeckName}
                    currentDeckSource={props.currentDeckSource}
                    currentDeckDescription={props.currentDeckDescription}
                    setFaction={setFaction}
                    changeName={props.changeName}
                    changeSource={props.changeSource}
                    changeDescription={props.changeDescription}
                    clearDeck={props.clearDeck}
                    resetDeck={props.resetDeck}
                    resetSearchText={props.resetSearchText}
                />
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        selectedFaction: state.deckUnderBuild.faction,
        selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
        currentDeck: state.deckUnderBuild.deck,
        currentDeckName: state.deckUnderBuild.name,
        currentDeckSource: state.deckUnderBuild.source,
        currentDeckDescription: state.deckUnderBuild.desc,
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

        resetSearchText: () =>
            dispatch({ type: CHANGE_SEARCH_TEXT, payload: '' }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreatorTransfer)
