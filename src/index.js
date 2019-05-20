import React, { Component, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import './index.css'
import Home from './pages/Home'

import registerServiceWorker from './registerServiceWorker'
import Footer from './components/Footer'
import MenuAppBar from './components/MenuAppBar'

import { connect, Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'
import LazyLoading from './components/LazyLoading'
import ErrorBoundary from './components/ErrorBoundary'
import { UPDATE_EXPANSIONS } from './reducers/userExpansions'
import { Button } from '@material-ui/core'
import Firebase, { FirebaseContext, withFirebase } from './firebase'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import * as ROUTES from './constants/routes'

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

class TempPage extends Component {
    componentDidMount = async () => {
        // console.log(deckIds);
        // const grouped = deckIds.reduceRight((acc, el) => {
        //     const prefix = el.split('-')[0];
        //     if(!!acc[prefix]) {
        //         acc[prefix] = [el, ...acc[prefix]];
        //     } else {
        //         acc[prefix] = [el]
        //     }
        //     return acc;
        // }, {});
        // await realdb.ref('/decks_meta/all').set({
        //     count: deckIds.length,
        //     ids: deckIds        // const gh = ['gh-3a02ccf3e596', 'gh-a431f01aa268'];
        // // console.log(grouped);
        // });
        // // await db.collection('meta').doc('all').set({
        // // });
        // for (let k in grouped) {
        //     await realdb.ref(`/decks_meta/${k}`).set({
        //         count: grouped[k].length,
        //         ids: grouped[k],
        //     });
        //     // await db.collection('meta').doc(k).set({
        //     // });
        // }
        // // const gh = ['gh-3a02ccf3e596', 'gh-a431f01aa268'];
        // // await realdb.ref('/decks_meta/gh').set({
        // //     count: gh.length,
        // //     ids: gh
        // // });
    }

    updateRatings = async () => {
        const decksRef = await this.props.firebase.db
            .collection('decks')
            .orderBy('created', 'desc')
            .get()
        const decks = []
        const fullDecks = {}
        const deckIds = []
        decksRef.forEach(deck => {
            decks.push(deck.data().cards)
            deckIds.push(deck.id)
            fullDecks[deck.id] = {
                ...deck.data(),
                updated: deck.data().created,
            }
        })

        console.log(decks.length)
        console.log(fullDecks)

        for (let k in fullDecks) {
            const deck = fullDecks[k]
            if (deck.author !== 'Anonymous') {
                const userProfileRef = await this.props.firebase.db
                    .collection('users')
                    .doc(deck.author)
                    .get()
                deck.authorDisplayName = userProfileRef.data().displayName
            } else {
                deck.authorDisplayName = 'Anonymous'
            }

            await this.props.firebase.realdb.ref('decks/' + k).set(deck)
        }

        const r = decks.reduce(
            (acc, el) => {
                for (let card of el) {
                    const wave = parseInt(card.slice(0, 2), 10)
                    const id = parseInt(card.slice(-3), 10)
                    acc[wave][id] += 1
                }

                return acc
            },
            [
                -1,
                [...[-1], ...new Array(437).fill(0, 0, 437)],
                [...[-1], ...new Array(60).fill(0, 0, 60)],
                [...[-1], ...new Array(557).fill(0, 0, 557)],
            ]
        )

        console.log(r)
        await this.props.firebase.db
            .collection('meta')
            .doc('cards_meta')
            .set({
                1: r[1],
                2: r[2],
                3: r[3],
            })

        await this.props.firebase.realdb.ref('/cards_ratings').set({
            1: r[1],
            2: r[2],
            3: r[3],
        })

        console.log(deckIds)
        const grouped = deckIds.reduceRight((acc, el) => {
            const prefix = el.split('-')[0]
            if (!!acc[prefix]) {
                acc[prefix] = [el, ...acc[prefix]]
            } else {
                acc[prefix] = [el]
            }

            return acc
        }, {})

        await this.props.firebase.realdb.ref('/decks_meta/all').set({
            count: deckIds.length,
            ids: deckIds, // const gh = ['gh-3a02ccf3e596', 'gh-a431f01aa268'];
            // console.log(grouped);
        })
        // await db.collection('meta').doc('all').set({

        // });

        for (let k in grouped) {
            await this.props.firebase.realdb.ref(`/decks_meta/${k}`).set({
                count: grouped[k].length,
                ids: grouped[k],
            })
            // await db.collection('meta').doc(k).set({

            // });
        }
        // const gh = ['gh-3a02ccf3e596', 'gh-a431f01aa268'];
        // await realdb.ref('/decks_meta/gh').set({
        //     count: gh.length,
        //     ids: gh
        // });
    }

    handleClick = async () => {
        await this.updateRatings()
        // await realdb.ref('/test/counter').set({
        //     current: 0,
        // });
        // await realdb.ref('/test/counter').transaction(counter => {
        //     if(counter) {
        //         counter.current += 1;
        //         if(counter.ids) {
        //             counter.ids = [`id${counter.current}`, ...counter.ids]
        //         } else {
        //             counter.ids = ['id']
        //         }
        //     }

        //     return counter;
        // });
    }

    render() {
        return (
            <div>
                This will update cards popularity in some nasty way...
                <button onClick={this.handleClick}>Click Me</button>
            </div>
        )
    }
}

const TempPageWithFirebase = withFirebase(TempPage)

class Template extends Component {
    state = {
        cards: [],
    }

    componentDidMount = () => {
        //'1_02024', '1_02049', '2_02049', '1_03550', '1_03551', '1_03323', '1_03322', '1_01257', '1_01348',
        this.setState({
            cards: ['1_01272', '1_01362', '1_01378', '1_03499', '1_03529'],
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

            let rowIdx = 0
            let x = 5
            let y = 5
            let idx = 0

            for (let c of this.state.cards) {
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
                x += w + 5
                idx += 1

                if (idx % 3 === 0) {
                    rowIdx += 1
                    x = 5
                    y = rowIdx * (h + 10)
                }
            }

            doc.save('cards.pdf')
        })
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class App extends Component {
    state = {
        error: '',
    }

    componentDidMount = () => {
        this.unsubscribe = this.props.firebase.auth.onAuthStateChanged(user => {
            try {
                if (user) {
                    this._handleAuthUser(user.uid)
                } else {
                    this.props.onSignOut()
                }
            } catch (err) {
                this.setState({ error: err })
            }
        });

        const start = new Date();
        const decks = JSON.parse(localStorage.getItem('yawudb_decks')) || {};
        const end = new Date();
        console.log(Object.keys(decks).length, 'decks in', end - start, 'ms');

        if(isEmpty(decks)) {
            this.props.firebase.decks().once('value').then(s => localStorage.setItem('yawudb_decks', JSON.stringify(s.val())));
        } else {
            const decksRef = this.props.firebase.decks();
            decksRef.on('child_added', data => {
                if(decks[data.key]) return;
                const updatedDecks = {...decks, [data.key]: data.val()};
                localStorage.setItem('yawudb_decks', JSON.stringify(updatedDecks));
                console.log('DECK ADDED: ', data.key, data.val());
            });
    
            decksRef.on('child_changed', data => {
                const updatedDecks = {...decks, [data.key]: data.val()};
                localStorage.setItem('yawudb_decks', JSON.stringify(updatedDecks));
                console.log('DECK CHANGED: ', data.key, data.val());
            });
    
            decksRef.on('child_removed', data => {
                delete decks[data.key];
                localStorage.setItem('yawudb_decks', JSON.stringify(decks));
                console.log('DECK REMOVED: ', data.key, data.val());
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe()
        this.counterRef.off()
        this.props.firebase.decks().off();
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <div style={{width: '100%', height: '100%'}}>
                    <MenuAppBar />

                    <div>{this.state.error}</div>

                    <ErrorBoundary>
                        <div style={{ margin: '4.5rem 0 0 0', width: '100%', height: '100%', boxSizing: 'border-box' }}>
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
                                        render={props => <Decks {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.CARDS_LIBRARY}
                                        render={props => <Library {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.CREATE_NEW_DECK}
                                        render={props => (
                                            <DeckCreator {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.EDIT_DECK}
                                        render={props => (
                                            <DeckCreator {...props} />
                                        )}
                                    />
                                    <Route
                                        path={ROUTES.SIGN_IN}
                                        render={props => <Login {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.SIGN_UP}
                                        render={props => <SignUp {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.VIEW_DECK_ID}
                                        render={props => <Deck {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.VIEW_CARD_ID}
                                        render={props => <Card {...props} />}
                                    />
                                    <Route
                                        path={ROUTES.ABOUT}
                                        render={props => <About {...props} />}
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
                                            <PasswordResetRequest {...props} />
                                        )}
                                    />
                                    <Route
                                        path="/temp"
                                        render={props => (
                                            <TempPage {...props} />
                                        )}
                                    />
                                    <Route
                                        path="/template"
                                        render={props => (
                                            <Template {...props} />
                                        )}
                                    />

                                    <PrivateRoute
                                        path={ROUTES.MY_DECKS}
                                        component={MyDecks}
                                    />
                                    <PrivateRoute
                                        path={ROUTES.PROFILE}
                                        component={UserProfile}
                                    />
                                    <PrivateRoute
                                        path="/secret/deck-uploader"
                                        component={SecretDeckUploader}
                                    />
                                </Switch>
                            </Suspense>
                        </div>
                    </ErrorBoundary>

                    <Footer />
                </div>
            </ConnectedRouter>
        )
    }

    _handleAuthUser = async uid => {
        try {
            const userProfileRef = await this.props.firebase.db
                .collection('users')
                .doc(uid)
                .get()

            if (!userProfileRef.exists) {
                const displayName = `Soul${Math.floor(
                    Math.random() * Math.floor(1000)
                )}`
                await this.props.firebase.db
                    .collection('users')
                    .doc(uid)
                    .set({
                        displayName: displayName,
                        mydecks: [],
                        role: 'soul',
                        avatar: `/assets/icons/garreks-reavers-icon.png`,
                        expansions: {},
                    })

                this.props.onLogin({
                    displayName,
                    uid,
                    role: 'soul',
                    avatar: `/assets/icons/garreks-reavers-icon.png`,
                })
                this.props.updateUserExpansions({})
                history.push('/profile')
            }

            const profile = userProfileRef.data()
            this.props.onLogin({
                displayName: profile.displayName,
                role: profile.role,
                avatar: profile.avatar,
                uid,
            })
            this.props.updateUserExpansions(profile.expansions)
            if (history.location.pathname === '/login') {
                history.push('/mydecks')
            }
        } catch (err) {
            this.setState({ loginError: err.message })
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch({ type: 'SET_USER', user: user }),
        onSignOut: () => dispatch({ type: 'CLEAR_USER' }),
        updateUserExpansions: expansions =>
            dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
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
