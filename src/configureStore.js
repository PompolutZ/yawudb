import { createStore, combineReducers, applyMiddleware } from 'redux';
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
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = history => {
    const store = createStore(
        connectRouter(history)(combineReducers({
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
        })), 
        loadState(),
        composeWithDevTools(
            applyMiddleware(thunk, routerMiddleware(history))
        ));
    
    store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
