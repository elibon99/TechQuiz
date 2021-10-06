

/**
 * This function tries to create a game invite to a new game to the opponent.
 * @param opponentID - the ID of the opponent to be invited.
 * @param opponentName - the name of the opponent.
 * @returns - dispatch of type success or failure depending on state.
 * */
export const createGameInvitation = (opponentID, opponentName) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const username = getState().firebase.profile.userName;
        const userID = getState().firebase.auth.uid;
        const sentPhotoURL = getState().firestore.data.users[userID].photoURL;
        const theirPhotoURL = getState().firestore.data.users[opponentID].photoURL;

        firestore.collection('gameInvitations').add({
            sentReqUserName: username,
            gotReqUserName: opponentName,
            sentRequestID: userID,
            gotRequestID: opponentID,
            isAccepted: false,
            isRejected: false,
            gotReqPhotoURL: theirPhotoURL
        }).then((doc) => {
                        dispatch({type: "GAME_INVITATION_ADDED_SUCCESS"})
                        firestore.collection('notifications').add({
                            notificationMessage: "You got a game invitation",
                            toUser: opponentName,
                            fromUser: username,
                            toUserID: opponentID,
                            fromUserID: userID,
                            linkTo: "/profile-preview/" + userID,
                            createdAt: new Date(),
                            notificationType: "incomingGameInvitation",
                            fromUserPhotoURL: sentPhotoURL,
                            requestID: doc.id
                        })
                            .then()
                            .catch((err) => console.log(err, 'something went wrong updating notification collection'));
        })
            .catch((error) => {dispatch({type: "GAME_INVITATION_ERROR_FAILURE", error});});
    }
}

/**
 * This function tries to accept a game invitation.
 * @param invitationID - the ID of the game invitation entry.
 * @returns - dispatch of type success or failure depending on state.
 * */
export const acceptGameInvitation = (invitationID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('gameInvitations').doc(invitationID).update({
            isAccepted: true
        }).then(() => {
            firestore.collection('gameInvitations').doc(invitationID).get()
                .then((docRef) => {
                    firestore.collection('games').add({
                        userID1: docRef.data().sentRequestID,
                        user1Name: docRef.data().sentReqUserName,
                        userID2: docRef.data().gotRequestID,
                        user2Name: docRef.data().gotReqUserName,
                        turn: docRef.data().sentRequestID,
                        p1Score: 0,
                        p2Score: 0,
                        currentSet: "1",
                        generatedCategories: null,
                        shouldCreateNewGameSet : docRef.data().sentRequestID,
                        amountOfPlayerLeft : 2,
                        redirectTo: null,
                        gameIsFinished: false,
                        timeOfGameFinished: null,
                        hasChosenCategory: false
                    }).then((docRef2) => {
                        firestore.collection('gameInvitations').doc(invitationID).delete()
                            .then(() => {
                                firestore.collection('notifications').add({
                                    notificationMessage: "They accepted your game invitation",
                                    toUser: docRef.data().sentReqUserName,
                                    fromUser: docRef.data().gotReqUserName,
                                    toUserID: docRef.data().sentRequestID,
                                    fromUserID: docRef.data().gotRequestID,
                                    linkTo: "/game-landing/" + docRef2.id,
                                    createdAt: new Date(),
                                    notificationType: "acceptedGameInvitation",
                                    fromUserPhotoURL: docRef.data().gotReqPhotoURL,
                                    requestID: null
                                }).then()
                                    .catch((error) => console.log(error, 'something went wrong updating notification collection friend cloud func'))
                            }).catch((error) => console.log("Coulndt delete gameInvitation, ", error))
                    }).catch((error) => console.log("Couldn't create game from invitation, ", error));
                }).catch((error) => console.log("Something went wrong"))
        })
            .catch((error) => dispatch({type: "ACCEPTED_INVITATION_FAILURE", error}))
    }
}

/**
 * This function tries to reject a game invitation.
 * @param invitationID - the ID of the game invitation entry.
 * @returns - dispatch of type success or failure depending on state.
 * */
export const rejectGameInvitation = (invitationID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('gameInvitations').doc(invitationID).update({
            isRejected: true
        }).then(() => {
            firestore.collection('gameInvitations').doc(invitationID).delete()
                .then()
                .catch((error) => console.log("Failed to delete gameInvitations"));
            dispatch({type: "REJECTED_INVITATION_SUCCESS"});

        })
            .catch((error) => dispatch({type: "REJECTED_INVITATION_FAILURE", error}))
    }
}

