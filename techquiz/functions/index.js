const functions = require("firebase-functions");
const admin = require('firebase-admin');
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
            return admin.firestore().collection('users').doc(sentReqID).collection('friends').add({
                    userID: gotReqID,
                    userName: gotReqUserName
                }).then(() =>{
                    admin.firestore().collection('users').doc(gotReqID).collection('friends').add({
                        userID: sentReqID,
                        userName: sentReqUserName
                    }).then(() => {
                        console.log('added sentreq to gotreq friend')
                        admin.firestore().collection('friendRequests').doc(context.params.id).delete()
                            .then(() => console.log('deleted friendreq entry after accepted'))
                            .catch((err) => console.log(err, 'could not delete friend req after accept'))
                    })
                        .catch((err) => console.log(err, 'err adding sentreq to gotreq friend'))
                })
                    .catch((err) => console.log(err, 'err adding gotreq to sentreq friend'))
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
            return admin.firestore().collection('games').add({
                userID1: sentReqID,
                user1Name: sentReqUserName,
                userID2: gotReqID,
                user2Name: gotReqUserName,
                turn: sentReqID,
                p1Score: 0,
                p2Score: 0,
                currentSet: "",
                shouldCreateNewGameSet : sentReqID,
                amountOfPlayerLeft : 2,
                redirectTo: null,
                gameIsFinished: false,
                timeOfGameFinished: null
            }).then(() => {
                admin.firestore().collection('gameInvitations').doc(context.params.id).delete()
                    .then(() => console.log("Succesfully deleted gameInvitation and created game"))
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


