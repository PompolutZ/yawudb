import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";
import "./index.css";

import { unregister } from "./registerServiceWorker";

import LazyLoading from "./components/LazyLoading";
import ErrorBoundary from "./components/ErrorBoundary";
import Firebase, { FirebaseContext } from "./firebase";
import * as ROUTES from "./constants/routes";
import NavigationPanel from "./v2/components/NavigationPanel";
import usePublicDecksSyncronization from "./hooks/usePublicDecksSyncronization";
import HeroImage from "./v2/components/HeroImage";
import { AuthContextProvider } from "./hooks/useAuthUser";

const Home = lazy(() => import("./pages/Home"));
const DeckCreator = lazy(() => import("./pages/DeckCreator"));
const Decks = lazy(() => import("./pages/Decks"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Library = lazy(() => import("./pages/Library"));
const Deck = lazy(() => import("./pages/Deck"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Card = lazy(() => import("./pages/Card"));
const MyDecks = lazy(() => import("./pages/MyDecks/index"));
const Login = lazy(() => import("./pages/Login"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PasswordResetRequest = lazy(() => import("./pages/PasswordResetRequest"));

// class PrivateRouteContainer extends React.Component {
//     render() {
//         const { isAuthenticated, component: Component, ...props } = this.props;

//         return (
//             <Route
//                 {...props}
//                 render={(props) =>
//                     isAuthenticated ? (
//                         <Component {...props} />
//                     ) : (
//                         <Redirect
//                             to={{
//                                 pathname: ROUTES.SIGN_IN,
//                                 state: { from: props.location },
//                             }}
//                         />
//                     )
//                 }
//             />
//         );
//     }
// }

// const PrivateRoute = connect((state) => ({
//     isAuthenticated: state.auth !== null,
// }))(PrivateRouteContainer);

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
                                    <Route
                                        path={ROUTES.PROFILE}
                                        component={UserProfile}
                                    />
                                    {/* <PrivateRoute
                                        path="/secret/cards-rating/:faction?"
                                        component={CardsRating}
                                    /> */}
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
                    </main>
                </div>
            </div>
        </>
    );
}

function App() {
    usePublicDecksSyncronization();

    return (
        <Router>
            <MainLayout />
        </Router>
    );
}

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
    <FirebaseContext.Provider value={Firebase}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </FirebaseContext.Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
unregister();
