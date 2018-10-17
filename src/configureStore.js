import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loadState, saveState } from './utils/localStorage';
import { throttle } from 'lodash';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from './reducers/auth';
import userOwnSets from './reducers/userOwnSets';
import deckUnderBuild from './reducers/deckUnderBuild';
import decksFilters from './reducers/decksFilters';
import cardLibraryFilters from './reducers/cardLibraryFilters';

const configureStore = history => {
    const persistedStore = loadState();
    const store = createStore(
        connectRouter(history)(combineReducers({
            auth,
            userOwnSets,
            deckUnderBuild,
            decksFilters,
            cardLibraryFilters
        })), 
        persistedStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(routerMiddleware(history)));
    
    store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
