import {
    getFactionByName,
    getAllSetsValidForFormat,
    CHAMPIONSHIP_FORMAT,
} from "../../data/wudb";

export const UPDATE_FILTERS_ACTION = "UPDATE_FILTERS";
export const TOGGLE_CARD_ACTION = "TOGGLE_CARD";
export const RESET_DECK_ACTION = "RESET_DECK_ACTION";
export const SAVE_DECK = "SAVE_DECK";
export const UPDATE_DECK = "UPDATE_DECK";
export const FINISH_SAVING_DECK = "FINISH_SAVING_DECK";

export function toggleCardAction(card) {
    return {
        type: TOGGLE_CARD_ACTION,
        payload: card,
    };
}

export function resetDeckAction() {
    return { type: RESET_DECK_ACTION };
}

export function saveDeckAction(deckMeta) {
    return { type: SAVE_DECK, payload: deckMeta };
}

export function updateDeckAction(deckMeta) {
    return { type: UPDATE_DECK, payload: deckMeta };
}

///// CURRENT DECK SCHEMA
// 'factionPrefix-id': {
//     author: string (uid),
//     authorDisplayName: string;
//     cards: [],
//     created: string,
//     desc: string;
//     name: string;
//     private: Boolean;
//     scoringSummary: [],
//     sets: [],
//     source: string;
// }

//// new schema
// 'abbr-id': {
//     author: string (uid),
//     authorDisplayName: string;

//     cards: [],
//     cardslist: string;

//     created: string,
//     createdutc: number;
//     updatedutc: number;

//     desc: string;
//     name: string;
//     private: Boolean;
//     scoringSummary: [],

//     sets: [],
//     setslist: string;

//     source: string;
// }

export const INITIAL_STATE = {
    faction: getFactionByName("khagras-ravagers"),
    sets: getAllSetsValidForFormat(CHAMPIONSHIP_FORMAT),
    hideDuplicates: true,
    format: CHAMPIONSHIP_FORMAT,
    selectedObjectives: [],
    selectedGambits: [],
    selectedUpgrades: [],
    visibleCardTypes: [],
    status: "Idle",
};

export const deckBuilderReducer = (state, event, exec) => {
    switch (event.type) {
        case UPDATE_FILTERS_ACTION: {
            const nextState = {
                ...state,
                ...event.payload,
            };

            exec({
                type: "addKeyToLocalStorage",
                key: "wunderworlds_deck_in_progress",
                value: nextState,
            });

            return nextState;
        }
        case TOGGLE_CARD_ACTION: {
            const deck = [
                ...state.selectedObjectives,
                ...state.selectedGambits,
                ...state.selectedUpgrades,
            ];

            const cardWillBeRemoved = deck.find(
                ({ id }) => id === event.payload.id
            );
            let nextState = {
                ...state,
            };

            if (event.payload.type === "Objective") {
                nextState.selectedObjectives = cardWillBeRemoved
                    ? state.selectedObjectives.filter(
                          ({ id }) => id !== event.payload.id
                      )
                    : [...state.selectedObjectives, event.payload];
            } else if (event.payload.type === "Upgrade") {
                nextState.selectedUpgrades = cardWillBeRemoved
                    ? state.selectedUpgrades.filter(
                          ({ id }) => id !== event.payload.id
                      )
                    : [...state.selectedUpgrades, event.payload];
            } else {
                nextState.selectedGambits = cardWillBeRemoved
                    ? state.selectedGambits.filter(
                          ({ id }) => id !== event.payload.id
                      )
                    : [...state.selectedGambits, event.payload];
            }

            exec({
                type: "addKeyToLocalStorage",
                key: "wunderworlds_deck_in_progress",
                value: nextState,
            });

            return nextState;
        }

        case RESET_DECK_ACTION: {
            const nextState = {
                ...state,
                selectedObjectives: [],
                selectedGambits: [],
                selectedUpgrades: [],
            };

            exec({
                type: "addKeyToLocalStorage",
                key: "wunderworlds_deck_in_progress",
                value: nextState,
            });

            return nextState;
        }
        case SAVE_DECK:
            exec({ type: "saveDeck", deckMeta: event.payload });

            return {
                ...state,
                status: "Saving...",
            };
        case UPDATE_DECK:
            exec({ type: "updateDeck", deckMeta: event.payload });

            return {
                ...state,
                status: "Saving...",
            };
        case FINISH_SAVING_DECK:
            exec({
                type: "removeKeyFromLocalStorage",
                key: "wunderworlds_deck_in_progress",
            });

            return {
                ...state,
                status: "Saved",
            };

        case "SET_DESERIALIZED_STATE": {
            return event.payload;
        }

        default:
            return state;
    }
};
