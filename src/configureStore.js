import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loadState, saveState } from './utils/localStorage';
import { throttle } from 'lodash';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from './reducers/auth';
import userOwnSets from './reducers/userOwnSets';

const configureStore = history => {
    const persistedStore = loadState();
    const store = createStore(
        connectRouter(history)(combineReducers({
            auth,
            userOwnSets
        })), 
        persistedStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(routerMiddleware(history)));
    
    const unsdub = store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
