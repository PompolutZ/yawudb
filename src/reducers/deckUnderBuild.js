import { Set } from 'immutable'
import { factions, restrictedCards, cardsDb } from '../data/index'

export const SET_FACTION = 'SET_FACTION'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const CLEAR_DECK = 'CLEAR_ALL_CARDS_IN_DECK'
export const RESET_DECK = 'RESET_DECK'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_SOURCE = 'CHANGE_SOURCE'
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION'

const initialState = {
    name: `${factions['garreks-reavers']} Deck`,
    source: '',
    desc: '',
    faction: 'garreks-reavers',
    factionDefaultSet: 0,
    deck: new Set().toJS(),
    objectivesCount: 0,
    gambitsCount: 0,
    upgradesCount: 0,
    restrictedCardsCount: 0,
}

const deckUnderBuild = (state = initialState, action) => {
    const c = cardsDb[action.card]
    switch (action.type) {
        case SET_FACTION:
            const faction = action.faction.startsWith('n_')
                ? action.faction.slice(2)
                : action.faction
            return {
                ...state,
                name: `${factions[faction]} Deck`,
                faction: action.faction,
                factionDefaultSet: action.defaultSet,
                deck: new Set(),
                objectivesCount: 0,
                gambitsCount: 0,
                upgradesCount: 0,
                restrictedCardsCount: 0,
            }

        case CHANGE_NAME:
            return { ...state, name: action.name }

        case CHANGE_SOURCE:
            return { ...state, source: action.source }

        case CHANGE_DESCRIPTION:
            return { ...state, desc: action.desc }

        case ADD_CARD:
            return {
                ...state,
                deck: new Set(state.deck).add(action.card),
                objectivesCount: isObjectiveCard(c.type)
                    ? state.objectivesCount + 1
                    : state.objectivesCount,
                gambitsCount: isGambitCard(c.type)
                    ? state.gambitsCount + 1
                    : state.gambitsCount,
                upgradesCount: isUpgradeCard(c.type)
                    ? state.upgradesCount + 1
                    : state.upgradesCount,
                restrictedCardsCount: isRestrictedCard(action.card)
                    ? state.restrictedCardsCount + 1
                    : state.restrictedCardsCount,
            }

        case REMOVE_CARD:
            return {
                ...state,
                deck: new Set(state.deck).delete(action.card),
                objectivesCount: isObjectiveCard(c.type)
                    ? state.objectivesCount - 1
                    : state.objectivesCount,
                gambitsCount: isGambitCard(c.type)
                    ? state.gambitsCount - 1
                    : state.gambitsCount,
                upgradesCount: isUpgradeCard(c.type)
                    ? state.upgradesCount - 1
                    : state.upgradesCount,
                restrictedCardsCount: isRestrictedCard(action.card)
                    ? state.restrictedCardsCount - 1
                    : state.restrictedCardsCount,
            }

        case CLEAR_DECK:
            return {
                ...state,
                deck: new Set(),
                objectivesCount: 0,
                gambitsCount: 0,
                upgradesCount: 0,
                restrictedCardsCount: 0,
            }

        case RESET_DECK:
            return {
                ...state,
                name: `${factions[state.faction]} Deck`,
                source: '',
                deck: new Set(),
                desc: '',
                objectivesCount: 0,
                gambitsCount: 0,
                upgradesCount: 0,
                restrictedCardsCount: 0,
            }

        default:
            return state
    }
}

const isObjectiveCard = type => {
    return type === 0
}

const isGambitCard = type => {
    return type === 1 || type === 3
}

const isUpgradeCard = type => {
    return type === 2
}

const isRestrictedCard = id => {
    return Boolean(restrictedCards[id])
}

export const mergeLoadedStateWithInitial = loadedState => {
    return {
        ...initialState,
        ...loadedState.deckUnderBuild,
        deck: new Set(loadedState.deckUnderBuild.deck).toJS(),
    }
}

export default deckUnderBuild
