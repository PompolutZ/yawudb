import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import Home from './pages/Home';
import Decks from './pages/Decks';
import DeckCreator from './pages/DeckCreator';
import MyDecks from './pages/MyDecks';

import registerServiceWorker from './registerServiceWorker';
import Footer from './components/Footer';
import Login from './pages/Login';
import MenuAppBar from './components/MenuAppBar';

import { connect, Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import Deck from './pages/Deck';
import About from './pages/About';
import firebase from './firebase';

const history = createBrowserHistory();
const store = configureStore(history);

const setToLastLocation = (state, history) => {
  if(state.router.location.pathname !== history.location.pathname) {
    if(window.matchMedia('(display-mode: standalone)').matches) {
      history.push(state.router.location.pathname);
      return;
    }

    // Safari
    if(window.navigator.standalone === true) {
      history.push(state.router.location.pathname);
      return;
    }
  }
}

setToLastLocation(store.getState(), history);

class PrivateRouteContainer extends React.Component {
    render() {
      const {
        isAuthenticated,
        component: Component,
        ...props
      } = this.props

      return (
        <Route
          {...props}
          render={props =>
            isAuthenticated
              ? <Component {...props} />
              : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
          }
        />
      )
    }
  }

const PrivateRoute = connect(state => ({
    isAuthenticated: state.auth !== null
}))(PrivateRouteContainer)   

// class PersistedConnectedRouter extends ConnectedRouter {
//     componentWillMount() {
//         const { history } = this.props;
//         //this is the tweak which will prefer persisted route instead of that in url:
//         const location = store.getState().router.location || {};
//         if (location.pathname !== history.location.pathname) {
//             store.dispatch({type: 'LOCATION_CHANGE', location});
//             console.log(this.props);
//         }
        
//         this.
//         //this.handleLocationChange(history.location);    
//     }  
// }

const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <MenuAppBar />
            
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/decks" component={Decks} />
                <Route path="/newdeck" component={DeckCreator} />
                <Route path="/login" component={Login} />
                <Route path="/deck/:id" component={Deck} />
                <Route path="/about" component={About} />

                <PrivateRoute path="/mydecks" component={MyDecks} />
            </Switch>

            <Footer />
        </div>
    </ConnectedRouter>
);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

