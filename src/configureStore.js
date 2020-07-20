import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from './reducers/auth';
import userOwnSets from './reducers/userOwnSets';
import deckUnderBuild from './reducers/deckUnderBuild';
import decksFilters from './reducers/decksFilters';
import cardLibraryFilters from './reducers/cardLibraryFilters';
import library from './reducers/library';
import userExpansions from './reducers/userExpansions';
import mydecks from './reducers/mydecks';
import lastDeck from './reducers/lastDeck';
import deckUnderEdit from './reducers/deckUnderEdit';
import decksMeta from './reducers/decksMeta';

const routerReducer = history => {    
    const reducer = connectRouter(history);
    return reducer;
}
    
const createRootReducer = history => combineReducers({
    auth,
    userOwnSets,
    deckUnderBuild,
    decksFilters,
    cardLibraryFilters,
    library,
    userExpansions,
    mydecks,
    lastDeck,
    deckUnderEdit,
    decksMeta,
    router: routerReducer(history),
}); 

const initStore = (history) => {
    const store = configureStore({
        reducer: createRootReducer(history),
        preloadedState: loadState(),
        middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
    });
    
    store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 2000));
    
    return store;
}

export default initStore;
