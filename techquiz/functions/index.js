const functions = require("firebase-functions");
const admin = require('firebase-admin');
const fieldValue = admin.firestore.FieldValue;
admin.initializeApp(functions.config().firebase);


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
                }).then().catch(error => console.log(error, "wha wha wha"));
                i++;
            });
        }).catch((error) => {
            console.log(error);
    });
}


function matchMakingFindOpponent(userID, entryID, username) {
    return admin.firestore()
        .collection('matchqueue')
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.size > 1) {
                let shouldSkip = false;
                querySnapshot.forEach((doc) => {
                    if(shouldSkip){
                        return;
                    }
                    else if ((doc.data().uid !== userID) && (doc.data().gameID !== null)) {
                        admin.firestore().collection('games').doc(doc.data().gameID).get()
                            .then((docRef) => {
                                const turn = (docRef.data().turn === "") ? userID : docRef.data().turn;
                                docRef.ref.update({
                                    userID2: userID,
                                    turn: turn,
                                    user2Name: username
                                })
                                    .then(() => {
                                        admin.firestore().collection('matchqueue').doc(doc.id).delete()
                                            .then().catch((error) => {
                                            console.log("Error removing matchqueue document: ", error)
                                        });
                                        admin.firestore().collection('matchqueue').doc(entryID).delete()
                                            .then().catch((error) => {
                                            console.log("Error removing matchqueue document: ", error)
                                        });

                                    })
                                    .catch((err) => console.log(err));

                            })
                            .catch((error) => console.log("Something went wrong fetching game: ", error));
                        shouldSkip = true;

                    }

                    else{
                    }


                });
            }


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
            .then()
            .catch((error) => console.log("Error updating mlrating: ", error));
    });

exports.setUsername = functions.firestore
    .document('users/{userID}')
    .onCreate((snap,context) => {
        var userName = snap.data().userName.toLowerCase();
        return admin.firestore().collection('usernames').doc(userName).update({
            userID: context.params.userID
        }).then()
            .catch((error) => console.log('Error updating usernames collection, :', error));

    });




exports.updateSingleScore = functions.firestore
    .document('games/{id}')
    .onUpdate((change,context) => {
        if (change.after.data().gameIsFinished) {
            return admin.firestore().collection('games').doc(context.params.id)
                .collection('gameSets').get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((entry) => {
                        Object.entries(entry.data().questions.resp).forEach((question) => {
                            admin.firestore().collection('singleplayerScores').doc(entry.data().category)
                                .collection('scores').doc(change.after.data().userID1).update({
                                score: fieldValue.increment(question[1].p1Score)
                            }).then(() => {
                                admin.firestore().collection('singleplayerScores').doc(entry.data().category)
                                    .collection('scores').doc(change.after.data().userID2).update({
                                    score: fieldValue.increment(question[1].p2Score)
                                }).then()
                                    .catch((err) => console.log(err, ' couldnt update p1&p2 singlescore'));
                            }).catch((err) => console.log(err, 'couldnt update p1 singlescore'));
                        })
                    })
                }).then(() => {
                    admin.firestore().collection('userStats').doc(change.after.data().userID1)
                        .update({ slScore: fieldValue.increment(change.after.data().p1Score) })
                        .then(() => {
                            admin.firestore().collection('userStats').doc(change.after.data().userID2)
                                .update({ slScore: fieldValue.increment(change.after.data().p2Score) })
                                .then()
                                .catch((err) => console.log(err, 'damnit'));
                        })
                        .catch((err) => console.log(err, 'damnit2'));
                })
                .catch((err) => console.log(err, 'wa wa'));
        }
        else{
            return Promise.resolve(null);
        }
    });
