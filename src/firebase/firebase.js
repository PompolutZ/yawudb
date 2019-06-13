import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
// import { prodConfig, devConfig } from './config';
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// }

// const config = process.env.REACT_APP_ENVIRONMENT === 'prod' ? prodConfig : devConfig

class Firebase {
    constructor() {
        console.log('HERE!', process.env);
        app.initializeApp(config)

        this.auth = app.auth()
        this.signInWithFacebookProvider = () =>
            this.auth.signInWithRedirect(new app.auth.FacebookAuthProvider())
        this.signInWithGoogleProvider = () =>
            this.auth.signInWithRedirect(new app.auth.GoogleAuthProvider())

        this.db = app.firestore()
        this.firestoreArrayUnion = value =>
            app.firestore.FieldValue.arrayUnion(value)
        // this.db.settings({ timestampsInSnapshots: true });

        this.realdb = app.database()
    }

    // *** Auth API ***
    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    signOut = () => {
        return this.auth.signOut()
    }

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(user => {
            if (user) {
                const userDocRef = this.db.collection('users').doc(user.uid)
                const anonDeckIds =
                    JSON.parse(localStorage.getItem('yawudb_anon_deck_ids')) ||
                    []
                console.log(anonDeckIds)
                userDocRef.get().then(userSnapshot => {
                    if (!userSnapshot.exists) {
                        const displayName = `Soul${Math.floor(
                            Math.random() * Math.floor(1000)
                        )}`

                        const newUserBase = {
                            displayName: displayName,
                            mydecks: anonDeckIds,
                            role: 'soul',
                            avatar: `/assets/icons/garreks-reavers-icon.png`,
                            expansions: {},
                        }

                        userDocRef.set(newUserBase).then(() => {
                            console.log('User has been created')
                            next({
                                ...newUserBase,
                                uid: user.uid,
                                isNew: true,
                            })
                        })
                    } else {
                        const profile = userSnapshot.data()
                        console.log('User exist, so just extracting data.')

                        const userData = {
                            displayName: profile.displayName,
                            role: profile.role,
                            avatar: profile.avatar,
                            expansions: profile.expansions || {},
                            mydecks: [...profile.mydecks, ...anonDeckIds.filter(anonId => !profile.mydecks.includes(anonId))],
                        }
                        userDocRef.set(userData).then(() => {
                            next({
                                ...userData,
                                uid: user.uid,
                                isNew: false,
                            })
                        })
                    }
                })
            } else {
                fallback()
            }
        })

    // *** Decks API
    deck = id => this.realdb.ref(`/decks/${id}`)

    decks = () => this.realdb.ref(`decks`)

    decksMetaCount = faction => this.realdb.ref(`/decks_meta/${faction}/count`)

    decksMetaIds = faction => this.realdb.ref(`/decks_meta/${faction}/ids`)
}

export default Firebase
