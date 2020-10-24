import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
// import "./index.css";
import "./styles/main.css";
import Home from "./pages/Home";

import registerServiceWorker from "./registerServiceWorker";
import Footer from "./components/Footer";
import MenuAppBar, { drawerWidth } from "./components/MenuAppBar";
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
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import RootHelmet from "./components/Root/rootMetas";
import NavigationPanel from "./v2/components/NavigationPanel";
import IndexDbProvider from "./hooks/useIndexDb";
import PublicDecksProvider from "./contexts/publicDecksContext";
import useIndexDB from "./hooks/useIndexDb";
import useDexie from "./hooks/useDexie";

const DeckCreator = lazy(() => import("./pages/DeckCreator"));
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

const setToLastLocation = (state, history) => {
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

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 0 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "stretch",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        [theme.breakpoints.down("md")]: {
            padding: 0,
        },
    },
}));
const LAST_KNOWN_TIMESTAMP = 'wu_lastPublicDeck';

function App(props) {
    const [lastUsedTimestamp, setLastUsedTimestamp] = useState(localStorage.getItem(LAST_KNOWN_TIMESTAMP) || undefined);
    const db = useDexie('wudb');
    // const db = useIndexDB('public_decks', 1, db => {
    //     db.createObjectStore('all', { keyPath: 'timestamp' })
    // });

    React.useEffect(() => {
        // db.version(1).stores({
        //     // maybe to consider making restriction as a keyword, 
        //     // maybe use more keywords?..
        //     factions: 'id,abbr,name,displayName',
        //     sets: 'id,name,displayName,released',
        //     cards: 'id, name, factionId -> factions.id, type, setId -> sets.id, rule, glory, scoreType',
        // });
        
        // db.transaction('rw', db.factions, db.cards, db.sets, () => {
        //     // Factions
        //     db.factions.bulkPut([{
        //         id: 1,
        //         abbr: 'u',
        //         name: 'universal',
        //         displayName: 'Universal'
        //     }, {
        //         id: 2,
        //         abbr: 'gr',
        //         name: 'garreks-reavers',
        //         displayName: 'Garreks Reavers'
        //     }])
        
        //     // Sets
        //     db.sets.bulkPut([{
        //         id: 23,
        //         name: 'beastgrave-gift-pack',
        //         displayName: 'Beastgrave Gift Pack',
        //         released: new Date(2019, 10, 10)
        //     }])
            
        //     // Cards
        //     db.cards.bulkPut([{
        //         id: 7001,
        //         name: "Bold Conquest",
        //         factionId: 1,
        //         type: 'Objective',
        //         setId: 23,
        //         rule: "**Surge, Dual:** Score this immediately after an activation \\n *If:* Your **leader** made a **Charge action** in that activation \\n *And:* your **leader** is holding an objective.",
        //         glory: 1,
        //         scoreType: 'Surge'
        //     }, {
        //         id: 7017,
        //         name: "Jealous Defence",
        //         factionId: 1,
        //         type: 'Ploy',
        //         setId: 23,
        //         rule: "**Choose** one friendly fighter with no Charge tokens holding an objective. The chosen fighter makes one **Attack action**."
        //     }, {
        //         id: 7023,
        //         name: "Grim Tenacity",
        //         factionId: 1,
        //         type: 'Upgrade',
        //         setId: 23,
        //         rule: "This fighter cannot be **driven back**."
        //     }])
        // });
    }, [db]);
//     React.useEffect(() => {
//         if(!db) return;

//         if(!lastUsedTimestamp) {
//             props.firebase.realdb.ref('/public_decks').on('value', snapshot => {
//                 const actions = snapshot.val();
//                 Object.entries(actions).forEach(async ([timestamp, {action, id}]) => {
//                     switch(action) {
//                         case 'SHARED': {
//                             const s = await props.firebase.realdb.ref(`/decks/${id}`).once('value');
//                             const deck = s.val();
//                             if(!(await db.getKey('all', timestamp))) {
//                                 await db.add('all', {...deck, id, timestamp });
//                             }
//                         }
    
//                         case 'DELETED': {
    
//                         }
//                     }
//                 })
//                 const [lastKnownTimestamp ] = Object.keys(actions).slice(-1)
//                 if(!!lastKnownTimestamp) {
//                     localStorage.setItem(LAST_KNOWN_TIMESTAMP, lastKnownTimestamp);
//                     setLastUsedTimestamp(lastKnownTimestamp);
//                 }
//             })
//         } else {
//             props.firebase.realdb.ref('/public_decks').orderByKey().startAt(lastUsedTimestamp).on('value', snapshot => {
//                 console.log('PublicDecks from', lastUsedTimestamp, snapshot.val());
//             })
//         }
// }, [db, props.firebase]);

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

        props.firebase.realdb
            .ref("/cards_ranks")
            .once("value")
            .then((snapshot) => {
                props.updateCardRanks(snapshot.val());
            });

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
