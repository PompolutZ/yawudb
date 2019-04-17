import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const devConfig = {
    apiKey: "AIzaSyCU_JbZxVHHJ_5EmmWyUg-uoD-u6FLR7AU",
    authDomain:  "yawudb-test.firebaseapp.com",
    databaseURL: "https://yawudb-test.firebaseio.com",
    projectId: "yawudb-test",
    storageBucket: "yawudb-test.appspot.com",
    messagingSenderId: "499549709341"
};

const prodConfig = {
    apiKey: "AIzaSyCnp7bCUUgp_f50T7r0Cdxws1UwGguHSUI",
    authDomain: "yawudb.firebaseapp.com",
    databaseURL: "https://yawudb.firebaseio.com",
    projectId: "yawudb",
    storageBucket: "yawudb.appspot.com",
    messagingSenderId: "765225568277"
}

const config = 
    process.env.REACT_APP_STAGE === 'prod' ? prodConfig : devConfig;

class Firebase {

    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.signInWithFacebookProvider = () => this.auth.signInWithRedirect(new app.auth.FacebookAuthProvider());
        this.signInWithGoogleProvider = () => this.auth.signInWithRedirect(new app.auth.GoogleAuthProvider());
        
        this.db = app.firestore();
        this.db.settings({ timestampsInSnapshots: true });

        this.realdb = app.database();
    }

    firestoreArrayUnion = value => this.db.FieldValue.arrayUnion(value);

    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    signOut = () => {
        return this.auth.signOut();
    }
}

export default Firebase;

// export const dbref = path => firebase.database().ref(path);

// const db = firebase.firestore();
// const settings = {timestampsInSnapshots: true};
// db.settings(settings);

// const auth = firebase.auth();
// const realdb = firebase.database();

// export { db, auth, realdb };
// export default firebase;
