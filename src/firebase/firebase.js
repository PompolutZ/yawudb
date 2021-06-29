import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    onIdTokenChanged,
    FacebookAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword as authCreateWithEmailAndPassword,
    signInWithRedirect,
    signInWithEmailAndPassword as authSignInWithEmailAndPassword,
    signOut as authSignOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// import "firebase/auth";
// import "firebase/analytics";
import axios from "axios";

// import { prodConfig, devConfig } from './config';
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// }

// const config = process.env.REACT_APP_ENVIRONMENT === 'prod' ? prodConfig : devConfig

const Firebase2 = (function () {
    const app = initializeApp(config);
    getAnalytics(app);
    const auth = getAuth(app);

    return {
        signInWithFacebookProvider: function signInWithFacebookProvider() {
            return signInWithRedirect(auth, new FacebookAuthProvider());
        },

        signInWithGoogleProvider: function signInWithGoogleProvider() {
            return signInWithRedirect(auth, new GoogleAuthProvider());
        },

        signInWithEmailAndPassword: function signInWithEmailAndPassword(
            email,
            password
        ) {
            return authSignInWithEmailAndPassword(auth, email, password);
        },

        createUserWithEmailAndPassword: function createUserWithEmailAndPassword(
            email,
            password
        ) {
            return authCreateWithEmailAndPassword(auth, email, password);
        },

        signOut: function signOut() {
            return authSignOut(auth);
        },

        getTokenId: function getTokenId() {
            return new Promise((res, rej) => {
                const user = auth.currentUser;
                if (user) {
                    if (user) {
                        user.getIdToken()
                            .then((token) => res(token))
                            .catch((e) => rej(e));
                    }
                } else {
                    rej('Anon');
                }
            });
        },

        onAuthUserListener: function onAuthUserListener(next, fallback) {
            return onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const token = await user.getIdToken();
                    const userInfo = await axios.get(
                        `${process.env.REACT_APP_WUNDERWORLDS_API_ORIGIN}/api/v1/users`,
                        {
                            headers: {
                                authtoken: token,
                            },
                        }
                    );

                    if (userInfo.data) {
                        next({
                            ...userInfo.data,
                            uid: user.uid,
                            isNew: false,
                        });
                    } else {
                        next({
                            uid: user.uid,
                            isNew: true,
                        });
                    }
                } else {
                    console.error("Cannot login, fallback");
                    fallback();
                }
            });
        },
    };
})();

export default Firebase2;
