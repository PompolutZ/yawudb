import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
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
import SecretDeckUploader from './pages/SecretDeckUploader';
import Statistics from './pages/Statistics';
import Feedback from './pages/Feedback';
import UserProfile from './pages/UserProfile';
import Card from './pages/Card';
import Library from './pages/Library';


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

const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <MenuAppBar />

            <div style={{paddingTop: '4rem'}}>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/decks" component={Decks} />
                  <Route path="/library" component={Library} />
                  <Route path="/deck/create" component={DeckCreator} />
                  <Route path="/deck/edit/:id" component={DeckCreator} />
                  <Route path="/login" component={Login} />
                  <Route path="/view/deck/:id" component={Deck} />
                  <Route path="/view/card/:id" component={Card} />
                  <Route path="/about" component={About} />
                  <Route path="/statistics" component={Statistics} />
                  <Route path="/feedback" component={Feedback} />

                  <PrivateRoute path="/mydecks" component={MyDecks} />
                  <PrivateRoute path="/profile" component={UserProfile} />
                  <PrivateRoute path="/secret/deck-uploader" component={SecretDeckUploader} />
              </Switch>
            </div>

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

