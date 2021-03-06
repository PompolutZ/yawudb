import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import "./styles/main.css";

import { unregister } from "./registerServiceWorker";
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
import NavigationPanel from "./v2/components/NavigationPanel";
import usePublicDecksSyncronization from "./hooks/usePublicDecksSyncronization";
import HeroImage from "./v2/components/HeroImage";

const Home = lazy(() => import("./pages/Home"));
const DeckCreator = lazy(() => import("./pages/DeckCreator"));
const Decks = lazy(() => import("./pages/Decks"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Library = lazy(() => import("./pages/Library"));
const Deck = lazy(() => import("./pages/Deck"));
const About = lazy(() => import("./pages/About"));
const Feedback = lazy(() => import("./pages/Feedback"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Card = lazy(() => import("./pages/Card"));
const MyDecks = lazy(() => import("./pages/MyDecks/index"));
const Login = lazy(() => import("./pages/Login"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PasswordResetRequest = lazy(() => import("./pages/PasswordResetRequest"));
const CardsRating = lazy(() => import("./pages/CardsRating"));

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

function MainLayout() {
    const { pathname } = useLocation();
    return (
        <>
            {/* LEARN HOW TO MAKE THIS WITH TAILWIND */}
            <div
                className="grid grid-cols-1 grid-rows-1 overflow-x-auto"
                style={{
                    background: pathname == "/" ? "black" : "rgba(0,0,0,0)",
                }}
            >
                {pathname == "/" && (
                    <>
                        <div className="row-start-1 row-end-2 col-start-1 col-end-2">
                            <HeroImage />
                        </div>
                        <div className="row-start-1 row-end-2 col-start-1 col-end-2 relative">
                            <div
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 30%, black 100%)",
                                    width: "100%",
                                    height: "50%",
                                    position: "absolute",
                                }}
                            ></div>
                        </div>
                    </>
                )}

                <div
                    className="row-start-1 row-end-2 col-start-1 col-end-2 grid"
                    style={{
                        gridTemplateRows: "auto 1fr",
                    }}
                >
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
                                        render={(props) => (
                                            <Library {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.CREATOR_ROOT}
                                        render={(props) => (
                                            <DeckCreator {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.SIGN_IN}
                                        render={(props) => <Login {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.SIGN_UP}
                                        render={(props) => (
                                            <SignUp {...props} />
                                        )}
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
                                        path={ROUTES.FEEDBACK}
                                        render={(props) => (
                                            <Feedback {...props} />
                                        )}
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
                                        render={(props) => (
                                            <MyDecks {...props} />
                                        )}
                                    />
                                    <PrivateRoute
                                        path={ROUTES.PROFILE}
                                        component={UserProfile}
                                    />
                                    <PrivateRoute
                                        path="/secret/cards-rating/:faction?"
                                        component={CardsRating}
                                    />
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
                    </main>
                </div>
            </div>
        </>
    );
}

function App(props) {
    usePublicDecksSyncronization();

    return (
        <>
            <ConnectedRouter history={history}>
                <MainLayout />
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
            light: "#6B46C1",
            main: "#553C9A",
            dark: "##44337A",
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

const modalRoot = document.getElementById("modal-root");
export class ModalPresenter extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

const Root = () => (
    <Provider store={store}>
        <FirebaseContext.Provider value={Firebase}>
            <MuiThemeProvider theme={theme}>
                <ConnectedApp />
            </MuiThemeProvider>
        </FirebaseContext.Provider>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
unregister();
