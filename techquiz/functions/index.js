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
                }).then(r => console.log(r, "update successful")).catch(error => console.log(error, "wha wha wha"));
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

                            })
                            .catch((error) => console.log("Something went wrong fetching game: ", error));
                        shouldSkip = true;

                    }

                    else{
                        console.log("Didn't do any of the if else statments");
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
            .then(() => console.log('updated mlrating'))
            .catch((error) => console.log("Error updating mlrating: ", error));
    });

exports.setUsername = functions.firestore
    .document('users/{userID}')
    .onCreate((snap,context) => {
        var userName = snap.data().userName.toLowerCase();
        console.log("Username is ", userName);
        return admin.firestore().collection('usernames').doc(userName).update({
            userID: context.params.userID
        }).then(() => console.log('Updated usernames collection'))
            .catch((error) => console.log('Error updating usernames collection, :', error));

    });

exports.friendAccepted = functions.firestore
    .document('friendRequests/{id}')
    .onUpdate((change, context) => {
        if(change.after.data().isAccepted){
            const sentReqID = change.after.data().sentRequest;
            const sentReqUserName = change.after.data().sentReqUserName;
            const gotReqID = change.after.data().gotRequest;
            const gotReqUserName = change.after.data().gotReqUserName;
            const gotReqPhotoURL = change.after.data().gotReqPhotoURL;
            return admin.firestore().collection('users').doc(sentReqID).get()
                .then((docRef) => {
                    admin.firestore().collection('users').doc(gotReqID).collection('friends').add({
                        userID: sentReqID,
                        userName: sentReqUserName,
                        photoURL: docRef.data().photoURL
                    }).then(() => {
                        admin.firestore().collection('users').doc(gotReqID).get()
                            .then((docRef2) => {
                                admin.firestore().collection('users').doc(sentReqID).collection('friends').add({
                                    userID: gotReqID,
                                    userName: gotReqUserName,
                                    photoURL: docRef2.data().photoURL
                                }).then(() => {
                                    admin.firestore().collection('friendRequests').doc(context.params.id).delete()
                                        .then(() => console.log("Succesfully deleted friendRequest document"))
                                        .catch((error) => console.log("Failed to delete friendRequest document ", error));
                                })
                                    .catch((error) => console.log("Something went wrong adding friend ", error));
                            }).catch((error) => console.log("Something went wrong: ", error));
                    }).catch((error) => console.log("Failed to fetch users from ", gotReqID, " with errror: ", error));
                }).then(() => {
                    admin.firestore().collection('notifications').add({
                        notificationMessage: "They accepted your friend request",
                        toUser: sentReqUserName,
                        fromUser: gotReqUserName,
                        toUserID: sentReqID,
                        fromUserID: gotReqID,
                        linkTo: "/profile-preview/" + gotReqID,
                        createdAt: new Date(),
                        notificationType: "acceptedFriendRequest",
                        fromUserPhotoURL: gotReqPhotoURL
                    })
                        .then(() => console.log('opened up a notification collection in accepting friends cloud func'))
                        .catch((err) => console.log(err, 'something went wrong updating notification collection friend cloud func'));
                })
                .catch((error) => console.log("Failed to fetch users from ,", gotReqID, " with errror: ", error));

        }
        if (change.after.data().isRejected){
            return admin.firestore().collection('friendRequests').doc(context.params.id).delete()
                    .then(() => console.log('deleted friendreq entry after rejection'))
                    .catch((err) => console.log(err, 'could not delete friend req'))
        }
    })

exports.gameInvitationResponse = functions.firestore
    .document('gameInvitations/{id}')
    .onUpdate((change, context) =>{
        if(change.after.data().isAccepted){
            const sentReqID = change.after.data().sentRequestID;
            const sentReqUserName = change.after.data().sentReqUserName;
            const gotReqID = change.after.data().gotRequestID;
            const gotReqUserName = change.after.data().gotReqUserName;
            const theirPhotoURL = change.after.data().gotReqPhotoURL;
            return admin.firestore().collection('games').add({
                userID1: sentReqID,
                user1Name: sentReqUserName,
                userID2: gotReqID,
                user2Name: gotReqUserName,
                turn: sentReqID,
                p1Score: 0,
                p2Score: 0,
                currentSet: "1",
                shouldCreateNewGameSet : sentReqID,
                amountOfPlayerLeft : 2,
                redirectTo: null,
                gameIsFinished: false,
                timeOfGameFinished: null,
                hasChosenCategory: false
            }).then((docRef) => {
                admin.firestore().collection('gameInvitations').doc(context.params.id).delete()
                    .then(() => {
                        admin.firestore().collection('notifications').add({
                            notificationMessage: "They accepted your game invitation",
                            toUser: sentReqUserName,
                            fromUser: gotReqUserName,
                            toUserID: sentReqID,
                            fromUserID: gotReqID,
                            linkTo: "/game-landing/" + docRef.id,
                            createdAt: new Date(),
                            notificationType: "acceptedGameInvitation",
                            fromUserPhotoURL: theirPhotoURL
                        })
                            .then(() => console.log('opened up a notification collection in accepting friends cloud func'))
                            .catch((err) => console.log(err, 'something went wrong updating notification collection friend cloud func'));

                        console.log("Succesfully deleted gameInvitation and created game")

                    })
                    .catch((error) => console.log("Coulndt delete gameInvitation, ", error));
            })
                .catch((error) => console.log("Couldn't create game from invitation, ", error));
        }
        if(change.after.data().isRejected){
            return admin.firestore().collection('gameInvitations').doc(context.params.id).delete()
                .then(() => console.log("Succesfully deleted gameInvitation and created game"))
                .catch((error) => console.log("Coulndt delete gameInvitation, ", error));
        }
    })



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
                                }).then(() => console.log('yay updated scores'))
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
                                .then(() => {console.log('yay')})
                                .catch((err) => console.log(err, 'damnit'));
                        })
                        .catch((err) => console.log(err, 'damnit2'));
                })
                .catch((err) => console.log(err, 'wa wa'));
        }
        else{
            console.log('gameisfinished is false, even though checking update');
            return Promise.resolve(null);
        }
    });
