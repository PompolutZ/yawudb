import React, { Component, Suspense, lazy, useState } from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import './index.css'
import Home from './pages/Home'

import registerServiceWorker from './registerServiceWorker'
import Footer from './components/Footer'
import MenuAppBar from './components/MenuAppBar'

import { connect, Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './configureStore'
import LazyLoading from './components/LazyLoading'
import ErrorBoundary from './components/ErrorBoundary'
import { UPDATE_EXPANSIONS } from './reducers/userExpansions'
import { SET_CARDS_RANKING } from './reducers/cardLibraryFilters'
import { Button } from '@material-ui/core'
import Firebase, { FirebaseContext, withFirebase } from './firebase'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import * as ROUTES from './constants/routes'
import { Helmet } from 'react-helmet'
import { idPrefixToFaction, cardsDb } from './data'
import Query from './pages/Query'
import CardsRating from './pages/CardsRating';
import Admin from './pages/Admin'
import { makeStyles } from '@material-ui/core/styles';

const DeckCreator = lazy(() => import('./pages/DeckCreator'))
const Decks = lazy(() => import('./pages/Decks'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Library = lazy(() => import('./pages/Library'))
const Deck = lazy(() => import('./pages/Deck'))
const About = lazy(() => import('./pages/About'))
const SecretDeckUploader = lazy(() => import('./pages/SecretDeckUploader'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Feedback = lazy(() => import('./pages/Feedback'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Card = lazy(() => import('./pages/Card'))
const MyDecks = lazy(() => import('./pages/MyDecks/index'))
const Login = lazy(() => import('./pages/Login'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const PasswordResetRequest = lazy(() => import('./pages/PasswordResetRequest'))
const GameAssistant = lazy(() => import('./pages/GameAssistant'));
const WarbandsInfoPage = lazy(() => import('./pages/WarbandsInfo'));

const history = createBrowserHistory()
const store = configureStore(history)

const setToLastLocation = (state, history) => {
    if (state.router.location.pathname !== history.location.pathname) {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            history.push(state.router.location.pathname)
            return
        }

        // Safari
        if (window.navigator.standalone === true) {
            history.push(state.router.location.pathname)
            return
        }
    }
}

setToLastLocation(store.getState(), history)

class PrivateRouteContainer extends React.Component {
    render() {
        const { isAuthenticated, component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props =>
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
        )
    }
}

const PrivateRoute = connect(state => ({
    isAuthenticated: state.auth !== null,
}))(PrivateRouteContainer)

function MetaReset(props) {
    const [allDecks, setAllDecks] = useState(null);
    const firebase = React.useContext(FirebaseContext)

    React.useEffect(() => {
        firebase
            .decks()
            .once('value')
            .then(s => {
                const data = s.val()
                setAllDecks(data);
                // console.log(Object.entries(data))
                const init = Object.entries(data)
                    .filter(([id, value]) => !value.private)
                    .map(([id, value]) => {
                        let created = new Date(0)
                        if (value.created && value.created.seconds) {
                            created.setSeconds(value.created.seconds)
                        } else {
                            created = new Date(value.created)
                        }

                        return { id: id, date: created }
                    })
                    .sort((a, b) => b.date - a.date)
                // const afterSort = init
                // console.log("All decks:", init);
                const allIds = init.map(x => x.id).slice(1)
                console.log(allIds.length)

                firebase.decksMetaDb()
                    .doc('all')
                    .set({
                        // count: allIds.length,
                        ids: allIds,
                    })
                    .then(() => console.log('UPDATED META ALL'))

                const prefixes = Object.keys(idPrefixToFaction)
                for (let prefix of prefixes) {
                    const ids = allIds.filter(id => id.startsWith(prefix))
                    // console.log(prefix, ids);
                    firebase.decksMetaDb()
                        .doc(`${prefix}`)
                        .set({
                            // count: ids.length,
                            ids: ids,
                        })
                        .then(() => console.log(`UPDATED META FOR ${prefix}`))
                }
            })
    }, [])

    React.useEffect(() => {
        console.log('ALL DECKS', allDecks ? Object.entries(allDecks).length : 0);
    }, [allDecks]);

    const handleMakeAuthorDecksPrivate = () => {
        const privateDecks = Object.entries(allDecks).filter(([id, value]) => value.author !== 'Anonymous');
        console.log(privateDecks);
        for(let [id, deck] of privateDecks) {
            firebase.deck(id).update({
                private: true
            });
        }
    }

    return (<div>
        <button onClick={handleMakeAuthorDecksPrivate}>Make Private</button>
    </div>);
}

class Template extends Component {
    state = {
        cards: [],
    }

    componentDidMount = () => {
        //'1_02024', '1_02049', '2_02049', '1_03550', '1_03551', '1_03323', '1_03322', '1_01257', '1_01348',
        this.setState({
            cards: [
                '1_01190',
                '1_01180',
                '1_01291',
                '1_01192',
                '1_01391',
                '1_01183',
                '1_03493',
                '1_01194',
                '1_03373',
                '1_01361',
                '1_03550',
                '1_01273',
                '1_03385',
                '1_03551',
                '1_03420',
                '1_01331',
                '1_01343',
                '1_01178',
                '1_01201',
                '1_01234',
                '1_03302',
                '1_01334',
                '1_01257',
                '1_01378',
                '1_01389',
                '1_03503',
                '1_03305',
                '1_01348',
                '1_01327',
                '1_01339',
                '1_01306',
                '1_03529',
            ],
        }) //
    }

    render() {
        return (
            <div>
                <Button onClick={this.handlePrint}>Print</Button>
                {this.state.cards.map(c => {
                    return (
                        <img
                            id={c}
                            key={c}
                            src={`/assets/cards/${c.slice(-5)}.png`}
                        />
                    )
                })}
            </div>
        )
    }

    handlePrint = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            let doc = new jsPDF({
                unit: 'mm',
            })

            const w = 64.5
            const h = 89.9

            const pages = this.state.cards.reduce((acc, el, index, array) => {
                if (index % 9 === 0) {
                    acc.push(array.slice(index, index + 9))
                }
                return acc
            }, [])

            console.log(pages)
            for (let page of pages) {
                {
                    const index = pages.indexOf(page)
                    if (index > 0) {
                        doc.addPage()
                    }
                }

                let rowIdx = 0
                let x = 3
                let y = 3
                let idx = 0

                for (let c of page) {
                    doc.addImage(
                        document.getElementById(c),
                        'png',
                        x,
                        y,
                        w,
                        h,
                        '',
                        'SLOW'
                    )
                    x += w + 3
                    idx += 1

                    if (idx % 3 === 0) {
                        rowIdx += 1
                        x = 3
                        y = rowIdx * h + rowIdx * 5
                        console.log(x, y)
                    }
                }
            }

            doc.save('cards.pdf')
        })
    }
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

const useStyles = makeStyles(theme => ({
    router: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        overflowX: 'hidden',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
    },
}));

function App(props) {
    const classes = useStyles();

    React.useEffect(() => {
        console.log(history);
        const unsubscribe = props.firebase.onAuthUserListener(
            async user => {
                if (user.isNew) {
                    // new user
                    props.onLogin({
                        displayName: user.displayName,
                        uid: user.uid,
                        role: 'soul',
                        avatar: `/assets/icons/garreks-reavers-icon.png`,
                        mydecks: user.mydecks,
                    })
                    props.updateUserExpansions(user.expansions)
                    history.push('/profile')
                } else {
                    //const profile = userProfileRef.data()
                    props.onLogin({
                        displayName: user.displayName,
                        role: user.role,
                        avatar: user.avatar,
                        uid: user.uid,
                        mydecks: user.mydecks,
                    })
                    props.updateUserExpansions(user.expansions)
                    if (history.location.pathname === '/login') {
                        history.push('/mydecks')
                    }
                }
            },
            () => props.onSignOut()
        )

        props.firebase.realdb
            .ref('/cards_ranks')
            .once('value')
            .then(snapshot => {
                props.updateCardRanks(snapshot.val())
            })

        return () => {
            props.firebase.decks().off();
            unsubscribe();
        }
    }, [])

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    Warhammer Underworlds (Shadespire and Nightvault)
                    Database and Deck Builder.
                </title>
                <meta
                    name="description"
                    content="YAWUDB is a fastest and the most mobile friendly Warhammer Underworlds: Shadespire and Warhammer Underworlds: Nightvault user's decks database and deck builder."
                />
                <meta
                    property="og:title"
                    content="Warhammer Underworlds (Shadespire and Nightvault) Database and Deck Builder."
                />
                <meta
                    property="og:description"
                    content="YAWUDB is a fastest and the most mobile friendly Warhammer Underworlds: Shadespire and Warhammer Underworlds: Nightvault user's decks database and deck builder."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yawudb.com" />
                <meta
                    property="og:image"
                    content="https://yawudb.com/yawudb.png"
                />
            </Helmet>
            <ConnectedRouter history={history}>
                <div className={classes.router}>
                    <MenuAppBar />

                    <ErrorBoundary>
                        <div
                            id="yawudb_main"
                            style={{
                                margin: '4.5rem 0 0 0',
                                width: '100%',
                                flex: '1 0 100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            <Suspense fallback={<LazyLoading />}>
                                <Switch>
                                    <Route
                                        exact
                                        path={ROUTES.HOME}
                                        component={Home}
                                    />
                                    <Route
                                        path={`${
                                            ROUTES.BROWSE_DECKS_FOR
                                        }/:faction`}
                                        render={props => (
                                            <Decks {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.CARDS_LIBRARY}
                                        render={props => (
                                            <Library {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.CREATOR_ROOT}
                                        render={props => (
                                            <DeckCreator {...props} />
                                        )}
                                    />
                                    {/* <Route
                                        path={ROUTES.EDIT_DECK}
                                        render={props => (
                                            <DeckCreator {...props} />
                                        )}
                                    /> */}
                                    <Route
                                        path={ROUTES.SIGN_IN}
                                        render={props => (
                                            <Login {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.SIGN_UP}
                                        render={props => (
                                            <SignUp {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.VIEW_DECK_ID}
                                        render={props => (
                                            <Deck {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.VIEW_CARD_ID}
                                        render={props => (
                                            <Card {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.ABOUT}
                                        render={props => (
                                            <About {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.STATISTICS}
                                        render={props => (
                                            <Statistics {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.FEEDBACK}
                                        render={props => (
                                            <Feedback {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.PRIVACY_POLICY}
                                        render={props => (
                                            <PrivacyPolicy {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.PASSWORD_RESET}
                                        render={props => (
                                            <PasswordResetRequest
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/template"
                                        render={props => (
                                            <Template {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.MY_DECKS}
                                        render={props => (
                                            <MyDecks {...props} />
                                        )}
                                    />
                                    <Route
                                        path={'/query/:type?/:arg?'}
                                        render={props => (
                                            <Query {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.VIEW_WARBAND_ID}
                                        render={props => (
                                            <WarbandsInfoPage {...props} />
                                        )} />

                                    {/* <PrivateRoute
                                    path={ROUTES.MY_DECKS}
                                    component={MyDecks}
                                /> */}
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
                                        component={CardsRating} />
                                    <PrivateRoute
                                        path="/secret/admin"
                                        component={Admin} />
                                    <PrivateRoute 
                                        path={ROUTES.GAME_ASSISTANT}
                                        component={GameAssistant} />
                                </Switch>
                            </Suspense>
                        </div>
                    </ErrorBoundary>
                    <div>
                        <Footer />
                    </div>
                </div>
            </ConnectedRouter>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch({ type: 'SET_USER', user: user }),
        onSignOut: () => dispatch({ type: 'CLEAR_USER' }),
        updateUserExpansions: expansions =>
            dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
        updateCardRanks: ranks =>
            dispatch({ type: SET_CARDS_RANKING, payload: ranks }),
    }
}

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(withFirebase(App))

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#3B9979',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            //light: '#0066ff',
            main: '#4b806e',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
})

const Root = () => (
    <div style={{ width: '100%', height: '100%' }}>
        <Provider store={store}>
            <FirebaseContext.Provider value={new Firebase()}>
                <MuiThemeProvider theme={theme}>
                    <ConnectedApp />
                </MuiThemeProvider>
            </FirebaseContext.Provider>
        </Provider>
    </div>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
