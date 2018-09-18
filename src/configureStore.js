import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from './utils/localStorage';
import { throttle } from 'lodash';
import auth from './reducers/auth';
import userOwnSets from './reducers/userOwnSets';

const configureStore = () => {
    const persistedStore = loadState();
    const store = createStore(
        combineReducers({
            auth,
            userOwnSets
        }), 
        persistedStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const unsdub = store.subscribe(throttle(() => {
      saveState(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
