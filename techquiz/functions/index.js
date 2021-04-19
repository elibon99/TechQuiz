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


function matchMakingFindOpponent(userID, entryID, username) {
    console.log(userID, 'userID', entryID, 'entryID');
    return admin.firestore()
        .collection('matchqueue')
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.size <= 1){
                console.log('alone, wanna create a gamecollection:)');
                //console.log("GAMING ID : ", querySnapshot.data().gameID)
                admin.firestore().collection('matchqueue').doc(entryID).get()
                    .then((docRef) => {
                        admin.firestore().collection('games').doc(docRef.data().gameID).set({
                            userID1: userID,
                            user1Name: username,
                            userID2: '',
                            user2Name: '',
                            turn: userID,
                            p1Score: 0,
                            p2Score: 0,
                            currentSet: "",
                            shouldCreateNewGameSet : userID,
                            amountOfPlayerLeft : 2,
                            redirectTo: null,
                            gameIsFinished: false
                        })
                            .then((doc) => {
                                // admin.firestore().collection('games').doc(docRef.data().gameID)
                                //     .collection('gameSets').add({
                                //     questions: {},
                                //     score: 0
                                // })
                                //     .then(() => console.log('hello we did it boys, games'))
                                //     .catch((err) => console.log(err, 'fuck'));
                                console.log('update worked in matchqueue');
                                admin.firestore().collection('users').doc(userID).update({
                                    currentGameID: docRef.id
                                }).then(() => console.log("Updated users successfull"))
                                    .catch((err) => console.log("Failed to update users", err));
                            })
                            .catch((err) => console.log(err, ' something went wrong creating the game'));

                    })
                    .catch((error) => console.log("Couldn't get matchque document"))

            }
            let setupMatch = false;
            querySnapshot.forEach((doc) => {
                if(doc.data().uid === userID){
                    console.log('same user wants to create more than one game, make another game');
                    admin.firestore().collection('games').doc(doc.data().gameID).set({
                        userID1: userID,
                        user1Name: username,
                        userID2: '',
                        user2Name: '',
                        turn: userID,
                        p1Score: 0,
                        p2Score: 0,
                        currentSet: "",
                        shouldCreateNewGameSet : userID,
                        amountOfPlayerLeft : 2,
                        redirectTo: null,
                        gameIsFinished: false
                    }).then(() => console.log('added same player to a 2nd game'))
                        .catch((err) => console.log(err, ' error adding 2nd player'));

                }
                if((doc.data().uid !== userID) && (doc.data().gameID !== null) && (setupMatch === false)){
                    console.log('Different IDs, game is not null, MATCH THESE');

                    admin.firestore().collection('games').doc(doc.data().gameID).get()
                        .then((docRef) => {
                            const turn = (docRef.data().turn === "") ? userID : docRef.data().turn;
                            docRef.ref.update({
                                userID2: userID,
                                turn: turn,
                                user2Name: username
                            })
                                .then(() => {
                                    console.log('added a user to another game');
                                    admin.firestore().collection('users').doc(userID).update({
                                        currentGameID: doc.data().gameID
                                    }).then(() => console.log("Updated users successfull")).catch((err) => console.log("Failed to update users", err));
                                    admin.firestore().collection('matchqueue').doc(doc.id).delete()
                                        .then(() => {
                                            console.log("Matchqueue document deleted!");
                                        }).catch((error) => {
                                        console.log("Error removing matchqueue document: ", error)
                                    });
                                    admin.firestore().collection('matchqueue').doc(entryID).delete()
                                        .then(() => {
                                            console.log("Matchqueue document deleted!");
                                        }).catch((error) => {
                                        console.log("Error removing matchqueue document: ", error)
                                    });

                                })
                                .catch((err) => console.log(err));
                            setupMatch = true;

                        })
                        .catch((error) => console.log("Something went wrong fetching game: ", error));

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
        let username = '';
        return admin.firestore().collection('users').doc(snap.data().uid).get()
            .then((docRef) => {
                console.log("This is the username: ", docRef.data().userName);
                username = docRef.data().userName;
                return matchMakingFindOpponent(snap.data().uid, context.params.id, username);
            })
            .catch((error) => console.log("Error receiving username: ", error));

    });

exports.updateMLRating = functions.firestore
    .document('userStats/{id}')
    .onUpdate((change, context) => {
        return admin.firestore().collection('multiplayerRating').doc(context.params.id).update({
            rating: change.after.data().mlRating
        })
            .then(() => console.log('updated mlrating'))
            .catch((error) => console.log("Error updating mlrating: ", error));
    });
