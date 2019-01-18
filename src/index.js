import React, { Component, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import Home from './pages/Home';

import registerServiceWorker from './registerServiceWorker';
import Footer from './components/Footer';
import MenuAppBar from './components/MenuAppBar';

import { connect, Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import firebase, { db } from './firebase';
import LazyLoading from './components/LazyLoading';
import ErrorBoundary from './components/ErrorBoundary';
import { UPDATE_EXPANSIONS } from './reducers/userExpansions';

const DeckCreator = lazy(() => import('./pages/DeckCreator'));
const Decks = lazy(() => import('./pages/Decks'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Library = lazy(() => import('./pages/Library'));
const Deck = lazy(() => import('./pages/Deck'));
const About = lazy(() => import('./pages/About'));
const SecretDeckUploader = lazy(() => import('./pages/SecretDeckUploader'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Feedback = lazy(() => import('./pages/Feedback'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Card = lazy(() => import('./pages/Card'));
const MyDecks = lazy(() => import('./pages/MyDecks/index'));
const Login = lazy(() => import('./pages/Login'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

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
      } = this.props;

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

class TempPage extends Component {
    componentDidMount = async () => {
        const decksRef = await db.collection('decks').get();
        const decks = [];
        decksRef.forEach(deck => {
            decks.push(deck.data().cards);
        });

        const r = decks.reduce((acc, el) => {
            for (let card of el) {
                const wave = parseInt(card.slice(0,2), 10);
                const id = parseInt(card.slice(-3), 10);
                acc[wave][id] += 1;
            }

            return acc;
        }, [
            -1,
            [...[-1], ...new Array(437).fill(0, 0, 437)],
            [...[-1], ...new Array(60).fill(0, 0, 60)],
            [...[-1], ...new Array(557).fill(0, 0, 557)]
        ]);

        console.log(r);
        await db.collection('meta').doc('cards_meta').set({
            popularity_01: r[1],
            popularity_02: r[2],
            popularity_03: r[3]
        });
    }

    render() {
        return (
            <div>
                This will update cards popularity in some nasty way...
            </div>
        );
    }
}

class App extends Component {
    state = {
        error: ''
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            try {
                if(user) {
                    this._handleAuthUser(user.uid);
                } else {
                    this.props.onSignOut();
                }
            } catch(err) {
                this.setState({ error: err });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <MenuAppBar />

                    <div>{this.state.error}</div>

                    <ErrorBoundary>
                        <div style={{paddingTop: '4rem'}}>
                            <Suspense fallback={<LazyLoading />}>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/decks" render={(props) => <Decks {...props} />} />
                                    <Route path="/library" render={(props) => <Library {...props} />} />
                                    <Route path="/deck/create" render={(props) => <DeckCreator {...props} />} />
                                    <Route path="/deck/edit/:id" render={(props) => <DeckCreator {...props} />} />
                                    <Route path="/login" render={(props) => <Login {...props} />} />
                                    <Route path="/user/signup" render={(props) => <SignUp {...props} />} />
                                    <Route path="/view/deck/:id" render={(props) => <Deck {...props} />} />
                                    <Route path="/view/card/:id" render={(props) => <Card {...props} />} />
                                    <Route path="/about" render={(props) => <About {...props} />} />
                                    <Route path="/statistics" render={(props) => <Statistics {...props} />} />
                                    <Route path="/feedback" render={(props) => <Feedback {...props} />} />
                                    <Route path="/privacy-policy" render={(props) => <PrivacyPolicy {...props} />} />
                                    <Route path="/temp" render={(props) => <TempPage {...props} />} />
                    
                                    <PrivateRoute path="/mydecks" component={MyDecks} />
                                    <PrivateRoute path="/profile" component={UserProfile} />
                                    <PrivateRoute path="/secret/deck-uploader" component={SecretDeckUploader} />
                                </Switch>
                            </Suspense>
                        </div>
                    </ErrorBoundary>
        
                    <Footer />
                </div>
            </ConnectedRouter>
        );
    }

    _handleAuthUser = async uid => {
        try {
            const userProfileRef = await db.collection('users').doc(uid).get();
            
            if(!userProfileRef.exists) {
                const displayName = `Soul${Math.floor(Math.random() * Math.floor(1000))}`;
                await db.collection('users').doc(uid).set({
                    displayName: displayName,
                    mydecks: [],
                    role: 'soul',
                    avatar: `/assets/icons/garreks-reavers-icon.png`,
                    expansions: {} 
                });

                this.props.onLogin({ displayName, uid, role: 'soul', avatar: `/assets/icons/garreks-reavers-icon.png` });
                this.props.updateUserExpansions({});
                history.push('/profile');
            }

            const profile = userProfileRef.data();
            this.props.onLogin({ displayName: profile.displayName, role: profile.role, avatar: profile.avatar, uid });
            this.props.updateUserExpansions(profile.expansions)
            if(history.location.pathname === '/login') {
                history.push('/mydecks');
            }
        } catch(err) {
            this.setState({ loginError: err.message });
        }
    }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogin: user => dispatch({type: 'SET_USER', user: user}),
      onSignOut: () => dispatch({type: 'CLEAR_USER'}),
      updateUserExpansions: expansions => dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
  }
}

const ConnectedApp = connect(null, mapDispatchToProps)(App);

const Root = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

