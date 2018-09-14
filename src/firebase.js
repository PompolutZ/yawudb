import firebase from 'firebase/app';
import config from './firebase.conf';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(config);

export const dbref = path => firebase.database().ref(path);

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const auth = firebase.auth();

export { db, auth };
export default firebase;
