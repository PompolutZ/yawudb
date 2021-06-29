import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
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

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(config);
            app.analytics();
        }

        this.auth = app.auth();
        this.signInWithFacebookProvider = () =>
            this.auth.signInWithRedirect(new app.auth.FacebookAuthProvider());
        this.signInWithGoogleProvider = () =>
            this.auth.signInWithRedirect(new app.auth.GoogleAuthProvider());
    }

    // *** Auth API ***
    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };

    signOut = () => {
        return this.auth.signOut();
    };

    getTokenId = () => {
        return new Promise((res, rej) => {
            this.auth.onIdTokenChanged((user) => {
                if (user) {
                    user.getIdToken()
                        .then((token) => res(token))
                        .catch((e) => rej(e));
                }
            });
        });
    };

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                console.log('HELLO!');
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
                    // const token = await user.getIdToken();
                    // const displayName = `${prefixes[random(prefixes.length - 1)]} ${postfixes[random(postfixes.length - 1)]}`;
                    // const avatar = 'elathains-soulreapers';
                    
                    // await axios.post(
                    //     `${process.env.REACT_APP_WUNDERWORLDS_API_ORIGIN}/api/v1/users`,
                    //     {
                    //         displayName,
                    //         avatar,
                    //     },
                    //     {
                    //         headers: {
                    //             authtoken: token,
                    //         },
                    //     }
                    // )
                    next({
                        // displayName,
                        // avatar,
                        uid: user.uid,
                        isNew: true,
                    });
                }
            } else {
                console.error("Cannot login, fallback");
                fallback();
            }
        });
}

export default Firebase;
