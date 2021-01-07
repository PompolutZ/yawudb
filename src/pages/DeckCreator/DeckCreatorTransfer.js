import React, { useEffect } from "react";
import FactionToggle from "../../components/FactionToggle";
import DeckBuilder from "./DeckBuilder";
import {
    SET_FACTION,
    CHANGE_NAME,
    CHANGE_SOURCE,
    ADD_CARD,
    REMOVE_CARD,
    CLEAR_DECK,
    RESET_DECK,
    CHANGE_DESCRIPTION,
} from "../../reducers/deckUnderBuild";
import { CHANGE_SEARCH_TEXT } from "../../reducers/cardLibraryFilters";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
    cardsIdToFactionIndex,
    factionIndexesWithDefaultSet,
} from "../../data/atoms/factions";
import { useParams } from "react-router-dom";
import { useDeckBuilderDispatcher } from ".";
import { checkCardIsObjective, checkCardIsPloy, checkCardIsUpgrade, getCardById, getFactionById } from "../../data/wudb";
import { INITIAL_STATE } from "./reducer";
import DeckCreatorBase from "./DeckCreatorBase";

const decodeFaction = (cards) => {
    for (let card of cards) {
        if (!cardsIdToFactionIndex[card]) continue;

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
    if(card.startsWith('8')) return '09' + `000${card.slice(1)}`.slice(-3);
}

const decodeUDB = card => {
    if(card.toUpperCase().startsWith('L')) return '02' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('N')) return '03' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('P')) return '04' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('DC')) return '09' + `000${card.slice(2)}`.slice(-3);
    if(card.toUpperCase().startsWith('D')) return '05' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('B')) return '06' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('G')) return '07' + `000${card.slice(1)}`.slice(-3);
    if(card.toUpperCase().startsWith('A')) return '08' + `000${card.slice(1)}`.slice(-3);
    return '01' + `000${card}`.slice(-3);
}

const getDecodingFunction = encoding => {
    if(encoding === 'udb') return decodeUDB;

    return decodeUDS;
};

function DeckCreatorTransfer(props) {
    const dispatch = useDeckBuilderDispatcher();
    const { data } = useParams();

    useEffect(() => {
        const [transferFormat, ...cardIds] = data.split(",");
        const decode = getDecodingFunction(transferFormat);
        const decodedCards = cardIds.map(foreignId => {
            const wuid = decode(foreignId);
            let card =  getCardById(wuid);
            if(card.duplicates) {
                const newest = Math.max(...card.duplicates);
                card = getCardById(newest);
            }

            return card;
        });

        const [{ factionId }] = decodedCards.filter(card => card.factionId > 1);
        const faction = getFactionById(factionId);
        
        const deckState = {
            ...INITIAL_STATE,
            faction,
            selectedObjectives: decodedCards.filter(checkCardIsObjective),
            selectedGambits: decodedCards.filter(checkCardIsPloy),
            selectedUpgrades: decodedCards.filter(checkCardIsUpgrade),
        }

        // THIS IS INSANELY SHITTY; BUT I AM TIRED
        localStorage.removeItem('wunderworlds_deck_in_progress');
        dispatch({
            type: "SET_DESERIALIZED_STATE",
            payload: deckState,
        });
        dispatch({
            type: "UPDATE_FILTERS",
            payload: {
                faction,
            },
        })
    
    }, [data]);

    return (

        <DeckCreatorBase {...props} />
        );
}

// const mapStateToProps = (state) => {
//     return {
//         selectedFaction: state.deckUnderBuild.faction,
//         selectedFactionDefaultSet: state.deckUnderBuild.factionDefaultSet,
//         currentDeck: state.deckUnderBuild.deck,
//         currentDeckName: state.deckUnderBuild.name,
//         currentDeckSource: state.deckUnderBuild.source,
//         currentDeckDescription: state.deckUnderBuild.desc,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setFaction: (faction, defaultSet) =>
//             dispatch({
//                 type: SET_FACTION,
//                 faction: faction,
//                 defaultSet: defaultSet,
//             }),
//         changeName: (value) => dispatch({ type: CHANGE_NAME, name: value }),
//         changeSource: (value) =>
//             dispatch({ type: CHANGE_SOURCE, source: value }),
//         changeDescription: (value) =>
//             dispatch({ type: CHANGE_DESCRIPTION, desc: value }),
//         addCard: (card) => dispatch({ type: ADD_CARD, card: card }),
//         removeCard: (card) => dispatch({ type: REMOVE_CARD, card: card }),
//         clearDeck: () => dispatch({ type: CLEAR_DECK }),
//         resetDeck: () => dispatch({ type: RESET_DECK }),

//         resetSearchText: () =>
//             dispatch({ type: CHANGE_SEARCH_TEXT, payload: "" }),
//     };
// };

export default DeckCreatorTransfer;
