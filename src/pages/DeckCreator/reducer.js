const {
    getFactionByName,
    getAllSetsValidForFormat,
    CHAMPIONSHIP_FORMAT,
} = require("../../data/wudb");

export const UPDATE_FILTERS_ACTION = "UPDATE_FILTERS";
export const ADD_CARD_ACTION = "ADD_CARD";
export const REMOVE_CARD_ACTION = "REMOVE_CARD";
export const RESET_DECK_ACTION = "RESET_DECK_ACTION";
export const SAVE_DECK = "SAVE_DECK";
export const FINISH_SAVING_DECK = "FINISH_SAVING_DECK";

export function addCardAction(card) {
    return {
        type: ADD_CARD_ACTION,
        payload: card,
    };
}

export function removeCardAction(card) {
    return {
        type: REMOVE_CARD_ACTION,
        payload: card,
    };
}

export function resetDeckAction() {
    return { type: RESET_DECK_ACTION };
}

export function saveDeckAction(deckMeta) {
    return { type: SAVE_DECK, payload: deckMeta };
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
    faction: getFactionByName("morgoks-krushas"),
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
        case UPDATE_FILTERS_ACTION:
            return {
                ...state,
                ...event.payload,
            };
        case ADD_CARD_ACTION:
            if (
                [
                    ...state.selectedObjectives,
                    ...state.selectedGambits,
                    ...state.selectedUpgrades,
                ].find((card) => card.id == event.payload.id)
            ) {
                return state;
            }

            if (event.payload.type === "Objective") {
                return {
                    ...state,
                    selectedObjectives: [
                        ...state.selectedObjectives,
                        event.payload,
                    ],
                };
            } else if (event.payload.type === "Upgrade") {
                return {
                    ...state,
                    selectedUpgrades: [
                        ...state.selectedUpgrades,
                        event.payload,
                    ],
                };
            } else {
                return {
                    ...state,
                    selectedGambits: [...state.selectedGambits, event.payload],
                };
            }
        case REMOVE_CARD_ACTION: {
            if (event.payload.type === "Objective") {
                return {
                    ...state,
                    selectedObjectives: state.selectedObjectives.filter(
                        (card) => card.id !== event.payload.id
                    ),
                };
            } else if (event.payload.type === "Upgrade") {
                return {
                    ...state,
                    selectedUpgrades: state.selectedUpgrades.filter(
                        (card) => card.id !== event.payload.id
                    ),
                };
            } else {
                return {
                    ...state,
                    selectedGambits: state.selectedGambits.filter(
                        (card) => card.id !== event.payload.id
                    ),
                };
            }
        }
        case RESET_DECK_ACTION:
            return {
                ...state,
                selectedObjectives: [],
                selectedGambits: [],
                selectedUpgrades: [],
            };
        case SAVE_DECK:
            console.log("START SAVING");
            exec({ type: "saveDeck", deckMeta: event.payload });

            return {
                ...state,
                status: "Saving...",
            };
        case FINISH_SAVING_DECK:
            return {
                ...state,
                status: "Saved",
            };
        default:
            return state;
    }
};
