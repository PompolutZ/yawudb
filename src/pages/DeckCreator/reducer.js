const { getFactionByName, getAllSetsValidForFormat, CHAMPIONSHIP_FORMAT } = require("../../data/wudb");

export const UPDATE_FILTERS_ACTION = 'UPDATE_FILTERS';
export const ADD_CARD_ACTION = 'ADD_CARD';
export const REMOVE_CARD_ACTION = 'REMOVE_CARD';
export const RESET_DECK_ACTION = 'RESET_DECK_ACTION';

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
};

export const deckBuilderReducer = (state, action) => {
    switch(action.type) {
        case UPDATE_FILTERS_ACTION:
            return {
                ...state,
                ...action.payload
            };
        case ADD_CARD_ACTION:
            if([
                ...state.selectedObjectives,
                ...state.selectedGambits,
                ...state.selectedUpgrades
            ].find(card => card.id == action.payload.id)) {
                return state;
            }

            if (action.payload.type === 'Objective') {
                return {
                    ...state,
                    selectedObjectives: [...state.selectedObjectives, action.payload]
                }
            } else if (action.payload.type === 'Upgrade') {
                return {
                    ...state,
                    selectedUpgrades: [...state.selectedUpgrades, action.payload]
                }
            } else {
                return {
                    ...state,
                    selectedGambits: [...state.selectedGambits, action.payload]
                }
            }
        case REMOVE_CARD_ACTION: {
            if (action.payload.type === 'Objective') {
                return {
                    ...state,
                    selectedObjectives: state.selectedObjectives.filter(card => card.id !== action.payload.id)
                }
            } else if (action.payload.type === 'Upgrade') {
                return {
                    ...state,
                    selectedUpgrades: state.selectedUpgrades.filter(card => card.id !== action.payload.id)
                }
            } else {
                return {
                    ...state,
                    selectedGambits: state.selectedGambits.filter(card => card.id !== action.payload.id)
                }
            }
        }
        case RESET_DECK_ACTION: 
            return {
                ...state,
                selectedObjectives: [],
                selectedGambits: [],
                selectedUpgrades: [],
            }
        default:
            return state;
    }
};
