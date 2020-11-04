import React, { Suspense, lazy, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
// import "./index.css";
import "./styles/main.css";
import Home from "./pages/Home";

import registerServiceWorker from "./registerServiceWorker";
import Footer from "./components/Footer";
import { createBrowserHistory } from "history";

import { connect, Provider } from "react-redux";
import configureStore from "./configureStore";
import LazyLoading from "./components/LazyLoading";
import ErrorBoundary from "./components/ErrorBoundary";
import { UPDATE_EXPANSIONS } from "./reducers/userExpansions";
import { SET_CARDS_RANKING } from "./reducers/cardLibraryFilters";
import Firebase, { FirebaseContext, withFirebase } from "./firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as ROUTES from "./constants/routes";
import CardsRating from "./pages/CardsRating";
import Admin from "./pages/Admin";
import { makeStyles } from "@material-ui/core/styles";
import NavigationPanel from "./v2/components/NavigationPanel";
import PublicDecksProvider from "./contexts/publicDecksContext";
import useDexie from "./hooks/useDexie";
import shadows from "@material-ui/core/styles/shadows";

const DeckEditor = lazy(() => import('./v2/pages/DeckEditor'));
const Decks = lazy(() => import("./pages/Decks"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Library = lazy(() => import("./pages/Library"));
const Deck = lazy(() => import("./pages/Deck"));
const About = lazy(() => import("./pages/About"));
const SecretDeckUploader = lazy(() => import("./pages/SecretDeckUploader"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Feedback = lazy(() => import("./pages/Feedback"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Card = lazy(() => import("./pages/Card"));
const MyDecks = lazy(() => import("./pages/MyDecks/index"));
const Login = lazy(() => import("./pages/Login"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PasswordResetRequest = lazy(() => import("./pages/PasswordResetRequest"));
const GameAssistant = lazy(() => import("./pages/GameAssistant"));
const WarbandsInfoPage = lazy(() => import("./pages/WarbandsInfo"));
const MetaReset = lazy(() => import("./pages/MetaResetPage"));

const history = createBrowserHistory();
const store = configureStore(history);

const setToLastLocation = () => {
    // if (state.router.location.pathname !== history.location.pathname) {
    //     if (window.matchMedia('(display-mode: standalone)').matches) {
    //         history.push(state.router.location.pathname)
    //         return
    //     }
    //     // Safari
    //     if (window.navigator.standalone === true) {
    //         history.push(state.router.location.pathname)
    //         return
    //     }
    // }
};

setToLastLocation(store.getState(), history);

class PrivateRouteContainer extends React.Component {
    render() {
        const { isAuthenticated, component: Component, ...props } = this.props;

        return (
            <Route
                {...props}
                render={(props) =>
                    isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: ROUTES.SIGN_IN,
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

const PrivateRoute = connect((state) => ({
    isAuthenticated: state.auth !== null,
}))(PrivateRouteContainer);

const LAST_KNOWN_TIMESTAMP = 'wu_lastPublicDeck';

function App(props) {
    const [] = useState(localStorage.getItem(LAST_KNOWN_TIMESTAMP) || undefined);
    const db = useDexie('wudb');
    const firebase = useContext(FirebaseContext);

    React.useEffect(() => {
        Promise
            .all([
                firebase.realdb.ref('/wudb/_rev').once('value'),
                db.revision.toCollection().last()
            ])
            .then(([snapshot, localRevision]) => {
                if(localRevision && snapshot.val() <= localRevision.revision) return;

                return firebase.realdb.ref('/wudb').once('value');
            })
            .then(snapshot => {
                if(!snapshot) return;
                
                const {_rev, ...rest} = snapshot.val();
                const sets = Object.values(rest.sets);
                const factions = Object.values(rest.factions);
                const cards = Object.values(rest.cards);

                return Promise.all([
                    db.sets.bulkPut(sets),
                    db.factions.bulkPut(factions),
                    db.cards.bulkPut(cards),
                    db.revision.add({ revision: _rev})
                ])
            })
            .then(r => Promise.all(
                [
                    firebase.realdb.ref("/cards_ranks").once("value"),
                    db.factions.toArray()
                ]
            ))
            .then(([cardRanksSnapshot, factions]) => {
                var allRanks = Object.entries(cardRanksSnapshot.val())
                    .flatMap(([factionAbbr, value]) => {
                        var faction = factions.find(f => f.abbr == factionAbbr);
                        return Object.entries(value).map(([cardId, rank]) => ({
                            id: `${factionAbbr}_${cardId}`,
                            factionId: faction.id,
                            cardId: Number(cardId),
                            rank
                        }))
                    });
                
                console.log(db);
                return db.cardsRanks.bulkPut(allRanks)
            })
            .catch(e => console.error(e));
    }, [db, firebase]);

    React.useEffect(() => {
        const unsubscribe = props.firebase.onAuthUserListener(
            async (user) => {
                if (user.isNew) {
                    // new user
                    props.onLogin({
                        displayName: user.displayName,
                        uid: user.uid,
                        role: "soul",
                        avatar: `/assets/icons/garreks-reavers-icon.png`,
                        mydecks: user.mydecks,
                    });
                    props.updateUserExpansions(user.expansions);
                    history.push("/profile");
                } else {
                    props.onLogin({
                        displayName: user.displayName,
                        role: user.role,
                        avatar: user.avatar,
                        uid: user.uid,
                        mydecks: user.mydecks,
                    });
                    props.updateUserExpansions(user.expansions);
                    if (history.location.pathname === "/login") {
                        history.push("/mydecks");
                    }
                }
            },
            () => props.onSignOut()
        );

        return () => {
            props.firebase.decks().off();
            unsubscribe();
        };
    }, []);

    return (
        <>
            <ConnectedRouter history={history}>
                <NavigationPanel />

                <main id="yawudb_main" className="flex-grow flex">
                    <ErrorBoundary>
                        <Suspense fallback={<LazyLoading />}>
                            <Switch>
                                <Route
                                    exact
                                    path={ROUTES.HOME}
                                    component={Home}
                                />
                                <Route
                                    path={`${ROUTES.BROWSE_DECKS_FOR}/:faction`}
                                    render={(props) => <Decks {...props} />}
                                />
                                <Route
                                    path={ROUTES.CARDS_LIBRARY}
                                    render={(props) => <Library {...props} />}
                                />
                                <Route
                                    path={ROUTES.CREATOR_ROOT}
                                    render={(props) => (
                                        // <DeckCreator {...props} />
                                        <DeckEditor {...props} />
                                    )}
                                />
                                <Route
                                    path={ROUTES.SIGN_IN}
                                    render={(props) => <Login {...props} />}
                                />
                                <Route
                                    path={ROUTES.SIGN_UP}
                                    render={(props) => <SignUp {...props} />}
                                />
                                <Route
                                    path={ROUTES.VIEW_DECK_ID}
                                    render={(props) => <Deck {...props} />}
                                />
                                <Route
                                    path={ROUTES.VIEW_CARD_ID}
                                    render={(props) => <Card {...props} />}
                                />
                                <Route
                                    path={ROUTES.ABOUT}
                                    render={(props) => <About {...props} />}
                                />
                                <Route
                                    path={ROUTES.STATISTICS}
                                    render={(props) => (
                                        <Statistics {...props} />
                                    )}
                                />
                                <Route
                                    path={ROUTES.FEEDBACK}
                                    render={(props) => <Feedback {...props} />}
                                />
                                <Route
                                    path={ROUTES.PRIVACY_POLICY}
                                    render={(props) => (
                                        <PrivacyPolicy {...props} />
                                    )}
                                />
                                <Route
                                    path={ROUTES.PASSWORD_RESET}
                                    render={(props) => (
                                        <PasswordResetRequest {...props} />
                                    )}
                                />
                                <Route
                                    path={ROUTES.MY_DECKS}
                                    render={(props) => <MyDecks {...props} />}
                                />
                                <Route
                                    path={ROUTES.VIEW_WARBAND_ID}
                                    render={(props) => (
                                        <WarbandsInfoPage {...props} />
                                    )}
                                />
                                <PrivateRoute
                                    path={ROUTES.PROFILE}
                                    component={UserProfile}
                                />
                                <PrivateRoute
                                    path="/secret/deck-uploader"
                                    component={SecretDeckUploader}
                                />
                                <PrivateRoute
                                    path="/secret/meta-reset"
                                    component={MetaReset}
                                />
                                <PrivateRoute
                                    path="/secret/cards-rating/:faction?"
                                    component={CardsRating}
                                />
                                <PrivateRoute
                                    path="/secret/admin"
                                    component={Admin}
                                />
                                <PrivateRoute
                                    path={ROUTES.GAME_ASSISTANT}
                                    component={GameAssistant}
                                />
                            </Switch>
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </ConnectedRouter>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch({ type: "SET_USER", user: user }),
        onSignOut: () => dispatch({ type: "CLEAR_USER" }),
        updateUserExpansions: (expansions) =>
            dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
        updateCardRanks: (ranks) =>
            dispatch({ type: SET_CARDS_RANKING, payload: ranks }),
    };
};

const ConnectedApp = connect(null, mapDispatchToProps)(withFirebase(App));

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#501408",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            //light: '#0066ff',
            main: "#4b806e",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#ffcc00",
        },
        // error: will use the default color
    },
});

const Root = () => (
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <MuiThemeProvider theme={theme}>
                <PublicDecksProvider>
                    <ConnectedApp />
                </PublicDecksProvider>
            </MuiThemeProvider>
        </FirebaseContext.Provider>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
