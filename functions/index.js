const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('./firebase.conf');

admin.initializeApp(config);  

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.countDecks = functions.firestore
//     .document('/decks/{deckId}')
//     .onWrite((event) => {
//         db.collection('decks')
//         .get()
//         .then(s => {
//             const totalCount = s.size;
//             console.log('Decks count: ', totalCount);
//             db.collection('meta').doc('decks_meta').set({
//                 total: totalCount
//             });

//             return totalCount;
//         })
//         .catch(error => console.error(error));

//         return true;
//     });

// exports.buildAllDecksIds =
//     functions.firestore.document('/decks/{deckId}')
//     .onWrite((change, context) => {
//         const allDecksRef = db.collection('meta').doc('all');
//         if(!change.after.exists) {
//             // document has been deleted
//             return db.runTransaction(transaction => {
//                 return transaction.get(allDecksRef).then(doc => {
//                     const allDecks = doc.data().ids.filter(id => id !== change.before.id);
//                     transaction.update(allDecksRef, { ids: allDecks });
//                 });
//             });
//         } else if(change.after.exists && !change.before.exists) { // document has been created
//             console.log('Creating deck id = ', change.after.id);
//             return db.runTransaction(t => {
//                 return t.get(allDecksRef)
//                     .then(doc => {
//                         console.log('Updating all decks meta.');
//                         const updated = [change.after.id, ...doc.data().ids];
//                         t.update(allDecksRef, { ids: updated });
//                     });
//             });
//         } else if (change.after.exists && change.before.exists) {
//             // document has been updated
//             console.log('Updating deck id = ', change.after.id);
//             return db.runTransaction(transaction => {
//                 return transaction.get(allDecksRef)
//                     .then(doc => {
//                         console.log('Updating all decks meta.');
//                         const allOtherIds = doc.data().ids.filter(el => el !== change.after.id);
//                         transaction.update(allDecksRef, { ids: [change.after.id, ...allOtherIds] });
//                     });
//             });
//         }

//         return null;
//     });

// exports.maintainFactionDeckIds =     
//     functions.firestore.document('/decks/{deckId}')
//     .onWrite((change, context) => {
//         const factionDecksRef = db.collection('meta').doc(change.after.id.split('-')[0]);
//         if(!change.after.exists) {
//             // document has been deleted
//             return db.runTransaction(transaction => {
//                 return transaction.get(factionDecksRef).then(doc => {
//                     const allDecks = doc.data().ids.filter(id => id !== change.before.id);
//                     transaction.update(factionDecksRef, { ids: allDecks });
//                 });
//             });
//         } else if(change.after.exists && !change.before.exists) { // document has been created
//             console.log('Creating deck id = ', change.after.id);
//             return db.runTransaction(t => {
//                 return t.get(factionDecksRef)
//                     .then(doc => {
//                         const updated = [change.after.id, ...doc.data().ids];
//                         t.update(factionDecksRef, { ids: updated });
//                     });
//             });
//         } else if (change.after.exists && change.before.exists) {
//             // document has been updated
//             console.log('Updating deck id = ', change.after.id);
//             return db.runTransaction(transaction => {
//                 return transaction.get(factionDecksRef)
//                     .then(doc => {
//                         const allOtherIds = doc.data().ids.filter(el => el !== change.after.id);
//                         transaction.update(factionDecksRef, { ids: [change.after.id, ...allOtherIds] });
//                     });
//             });
//         }

//         return null;
//     });

// exports.countTotal = 
//     functions.firestore.document('/decks/{deckId}')
//     .onWrite((change, context) => {
//         const ref = db.collection('meta').doc('decks_meta');
//         if(!change.after.exists) {
//             // document has been deleted
//             return db.runTransaction(transaction => {
//                 return transaction.get(ref).then(doc => {
//                     const newTotal = doc.data().total - 1;
//                     transaction.update(ref, { total: newTotal });
//                 });
//             });
//         } else if(change.after.exists && !change.before.exists) { // document has been created
//             console.log('Creating deck id = ', change.after.id);
//             db.runTransaction(transaction => {
//                 transaction.get(ref).then(doc => {
//                     console.log('Updating decks count total.');
//                     const newTotal = doc.data().total + 1;
//                     transaction.update(ref, { total: newTotal });
//                 });
//             });
//         } else if (change.after.exists && change.before.exists) {
//             // document has been updated
//             console.log('Updating deck id = ', change.after.id);
//         }

//         return null;
//     });

// // exports.countTotalDecks = 
// //     functions.firestore.document('decks/{deckId}')
// //     .onWrite(event => {
// //         const docRef = '/meta/decks_meta'; 
// //         console.log(event);
// //         if (!event.data.previous) {
// //             // New document Created : add one to count
// //             db.doc(docRef).get().then(snap => {
// //                 db.doc(docRef).update({numberOfDocs: snap.numberOfDocs + 1});
// //                 return;
// //             });

// //         } else if (event.data.previous && event.data.exists) {
// //             // Updating existing document : Do nothing
// //             return;

// //         } else if (!event.data.exists) {
// //             // Deleting document : subtract one from count
// //             db.doc(docRef).get().then(snap => {
// //             db.doc(docRef).update({numberOfDocs: snap.numberOfDocs - 1});
// //             return;
// //             });
// //         }

// // });    
