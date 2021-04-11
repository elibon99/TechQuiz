const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

function refactorMlRating() {
    return admin.firestore()
        .collection("multiplayerRating")
        .orderBy('rating', 'desc')
        .get()
        .then((querySnapshot) => {
            let i = 1;
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    ranking: i
                }).then(r => console.log(r, "update successful")).catch(error => console.log(error, "wha wha wha"));
                i++;
            });
        }).catch((error) => {
            console.log(error);
    });
}

function matchMakingFindOpponent(userID, entryID) {
    console.log(userID, 'userID', entryID, 'entryID');
    return admin.firestore()
        .collection('matchqueue')
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.size <= 1){
                console.log('alone, wanna create a gamecollection:)');
                admin.firestore().collection('games').add({
                    userID1: userID,
                    userID2: '',
                    turn: userID,
                    p1Score: 0,
                    p2Score: 0,
                })
                    .then((docRef) => {
                        admin.firestore().collection('matchqueue').doc(entryID).update({
                            gameID: docRef.id,
                        })
                            .then(() => console.log('update worked in matchqueue'))
                            .catch((err) => console.log(err, 'didnt work inside matchqueue update'));
                    })
                    .catch((err) => console.log(err, ' something went wrong creating the game'));
            }
            let setupMatch = false;
            querySnapshot.forEach((doc) => {
                if((doc.data().uid !== userID) && (doc.data().gameID !== null) && (setupMatch === false)){
                    console.log('Different IDs, game is not null, MATCH THESE');
                    admin.firestore().collection('games').doc(doc.data().gameID).update({
                        userID2: userID,
                    })
                        .then(() => console.log('added a user to another game'))
                        .catch((err) => console.log(err));
                    setupMatch = true;
                }
            });
        })
}

exports.mlRatingCreated = functions.firestore
  .document('multiplayerRating/{userId}')
  .onCreate((snap,context) => {
      return refactorMlRating();
  });

exports.mlRatingUpdated = functions.firestore
    .document('multiplayerRating/{userId}')
    .onUpdate((snap,context) => {
        return refactorMlRating();
    });

exports.matchMaking = functions.firestore
    .document('matchqueue/{id}')
    .onCreate((snap, context) => {
        return matchMakingFindOpponent(snap.data().uid, context.params.id);
    });
