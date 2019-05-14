import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

const devConfig = {
    apiKey: 'AIzaSyCU_JbZxVHHJ_5EmmWyUg-uoD-u6FLR7AU',
    authDomain: 'yawudb-test.firebaseapp.com',
    databaseURL: 'https://yawudb-test.firebaseio.com',
    projectId: 'yawudb-test',
    storageBucket: 'yawudb-test.appspot.com',
    messagingSenderId: '499549709341',
}

const prodConfig = {
    apiKey: 'AIzaSyCnp7bCUUgp_f50T7r0Cdxws1UwGguHSUI',
    authDomain: 'yawudb.firebaseapp.com',
    databaseURL: 'https://yawudb.firebaseio.com',
    projectId: 'yawudb',
    storageBucket: 'yawudb.appspot.com',
    messagingSenderId: '765225568277',
}

const config = process.env.REACT_APP_STAGE === 'prod' ? prodConfig : devConfig

class Firebase {
    constructor() {
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
                userDocRef.get().then(userSnapshot => {
                    if (!userSnapshot.exists) {
                        const displayName = `Soul${Math.floor(
                            Math.random() * Math.floor(1000)
                        )}`

                        userDocRef
                            .set({
                                displayName: displayName,
                                mydecks: [],
                                role: 'soul',
                                avatar: `/assets/icons/garreks-reavers-icon.png`,
                                expansions: {},
                            })
                            .then(() => {
                                next({
                                    uid: user.uid,
                                    displayName: displayName,
                                    mydecks: [],
                                    role: 'soul',
                                    avatar: `/assets/icons/garreks-reavers-icon.png`,
                                    expansions: {},
                                })
                            })
                    } else {
                        const profile = userSnapshot.data()
                        next({
                            displayName: profile.displayName,
                            role: profile.role,
                            avatar: profile.avatar,
                            uid: user.uid,
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
