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

const loadPersistedOnModile = () => {
    if(window.matchMedia('(display-mode: standalone)').matches) {
        return loadState();
      }
  
      // Safari
      if(window.navigator.standalone === true) {
        return loadState();
      }
     
    return {};  
}

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
        })), 
        //loadPersistedOnModile(),
        loadState(),
        // {},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(routerMiddleware(history)));
    
    store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
