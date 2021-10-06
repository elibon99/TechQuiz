
/**
 * This function sets the search to whatever the input is.
 * Used by a component to get the friends of the user.
 * @param userName - the search of the current user. Not necessarily a username.
 * @returns - dispatch of type change_user_search_friends.
 * */
export const setUsernameFriends = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USER_SEARCH_FRIENDS", payload: userName});
    }
}

export const setUsernameUser = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USER_SEARCH_USERS", payload: userName})
    }
}

/**
 * This function sets the search to whatever the input is.
 * Used by a component to get all users.
 * @param userName - the search of the current user. Not necessarily a username.
 * @returns - dispatch of type change_user_search_find_game.
 * */
export const setUsernameFindGame = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USER_SEARCH_FIND_GAME", payload: userName});
    }
}

/**
 * This function tries to add the selected user to the current user's friends list.
 * @param userID - the userID of the selected soon-to-be-friend.
 * @param otherName - the name of the selected soon-to-be-friend.
 * @returns - dispatch of type success or failure depending on addfriend state.
 * */
export const addFriend = (userID, otherName) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const self = getState().firebase.auth.uid;
        const selfName = getState().firebase.profile.userName;
        const otherPerson = userID;
        const gotPhotoURL = getState().firestore.data.users[otherPerson].photoURL;
        const sentReqPhotoUrl = getState().firestore.data.users[self].photoURL;

        firestore.collection('friendRequests').add({
            sentReqUserName: selfName,
            gotReqUserName: otherName,
            sentRequest: self,
            gotRequest: otherPerson,
            isAccepted: false,
            isRejected: false,
            sentReqPhotoURL: sentReqPhotoUrl,
            gotReqPhotoURL: gotPhotoURL,
            notificationID: null
        }).then((docRef) => {
            firestore.collection('notifications').add({
              notificationMessage: "You have received a new friend request",
              toUser: otherName,
              fromUser: selfName,
              toUserID: otherPerson,
              fromUserID: self,
              createdAt: new Date(),
              linkTo: "/profile-preview/" + self,
              notificationType: "incomingFriendRequest",
              fromUserPhotoURL: sentReqPhotoUrl,
              requestID: null
            })
                .then((doc) => {
                    firestore.collection('friendRequests').doc(docRef.id).update({
                        notificationID : doc.id
                    })
                        .then(() => {
                                    firestore.collection('friendRequests').doc(docRef.id).get()
                                        .then((docRef2) => {
                                            firestore.collection('notifications').doc(doc.id).update({
                                                requestID : docRef2.id
                                            })
                                                .then()
                                                .catch((err) => console.log(err, 'couldt update inide deep loop'));
                                        })
                                        .catch((err) => console.log(err, 'deep nest bro'));
                                })
                        .catch((err) => console.log(err, 'damn no notificationID for you'));
                            })
                .catch((err) => console.log(err, 'something went wrong updating notification collection'));
            dispatch({type: 'ADD_FRIEND_SUCCESS'})
        })
            .catch((err) => {
                console.log('hello is this happening', err);
                dispatch({type: 'ADD_FRIEND_FAILURE', err});
            });
    }
}

/**
 * This function tries to remove the selected user from the current user's friends list.
 * It also removes the current user from the selected user's friends list,
 * since friendships are two-way.
 * @param friendUserID - the userID of the selected soon-to-be-deleted-friend.
 * @returns - dispatch of type success or failure depending on removeFriend state.
 * */
export const removeFriend = (friendUserID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        firestore.collection('users').doc(uid).collection('friends').where('userID', '==', friendUserID).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                })
                dispatch({type:'FRIEND_DELETED_SUCCESFULLY'})
            })
            .catch((err) => dispatch({type:'FRIEND_DELETED_FAILURE', err}));
        firestore.collection('users').doc(friendUserID).collection('friends').where('userID', '==', uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                })
                dispatch({type:'FRIEND_DELETED_YOU_SUCCESFULLY'})
            })
            .catch((err) => dispatch({type:'FRIEND_DELETED_YOU_FAILURE', err}));
    }
}

/**
 * This function tries to accept the selected friend request. After accepting,
 * it sets the isAccepted attribute to true which will trigger a cloud function adding friends.
 * @param requestID - the ID of the friend request.
 * @returns - dispatch of type success or failure depending on acceptFriendRequest state.
 * */
export const acceptFriendRequest = (requestID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        let sentReqID = null;
        let sentReqUserName = null;
        let gotReqID = null;
        let gotReqUserName = null;
        let gotReqPhotoURL = null;
        let sentReqPhotoURL = null;

        firestore.collection('friendRequests').doc(requestID).update({
            isAccepted: true
        }).then(() => {
            firestore.collection('friendRequests').doc(requestID).get()
                .then((docRef) => {
                    sentReqID = docRef.data().sentRequest;
                    sentReqUserName = docRef.data().sentReqUserName;
                    gotReqID = docRef.data().gotRequest;
                    gotReqUserName = docRef.data().gotReqUserName;
                    gotReqPhotoURL = docRef.data().gotReqPhotoURL;
                    sentReqPhotoURL = docRef.data().sentReqPhotoURL;
                })
                .then(() => {
                    firestore.collection('users').doc(gotReqID).collection('friends').add({
                        userID: sentReqID,
                        userName: sentReqUserName,
                        photoURL: sentReqPhotoURL
                    }).then(() => {
                        firestore.collection('users').doc(gotReqID).get()
                            .then((docRef2) => {
                                firestore.collection('users').doc(sentReqID).collection('friends').add({
                                    userID: gotReqID,
                                    userName: gotReqUserName,
                                    photoURL: docRef2.data().photoURL
                                }).then(() => {
                                    firestore.collection('friendRequests').doc(requestID).delete()
                                        .then()
                                        .catch((error) => console.log("Failed to delete friendRequest document ", error));
                                })
                                    .catch((error) => console.log("Something went wrong adding friend ", error));
                            }).catch((error) => console.log("Something went wrong: ", error));
                    }).catch((error) => console.log("Failed to fetch users from ", gotReqID, " with errror: ", error));
                }).then(() => {
                firestore.collection('notifications').add({
                    notificationMessage: "They accepted your friend request",
                    toUser: sentReqUserName,
                    fromUser: gotReqUserName,
                    toUserID: sentReqID,
                    fromUserID: gotReqID,
                    linkTo: "/profile-preview/" + gotReqID,
                    createdAt: new Date(),
                    notificationType: "acceptedFriendRequest",
                    fromUserPhotoURL: gotReqPhotoURL,
                    requestID: null
                })
                    .then()
                    .catch((err) => console.log(err, 'something went wrong updating notification collection friend cloud func'));
            })
                })
                .catch((err) => console.log(err, 'error'));
        }
    }

/**
 * This function tries to reject the selected friend request. After rejecting,
 * it sets the isRejected attribute to true which will trigger a cloud function removing friend requests.
 * @param requestID - the ID of the friend request.
 * @returns - dispatch of type success or failure depending on rejectFriendRequest state.
 * */
export const rejectFriendRequest = (requestID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('friendRequests').doc(requestID).update({
            isRejected: true
        }).then(() => {
                firestore.collection('friendRequests').doc(requestID).delete()
                    .then()
                    .catch((err) => console.log(err, 'could not delete friend req'))
            dispatch({type: 'REJECTED_REQUEST_SUCCESS'})
        }).catch((err) => {
            console.log('hello is this happening', err);
            dispatch({type: 'REJECTED_REQUEST_FAILURE', err});
        });
    }
}

/**
 * This function tries to create a new game with the current user and the selected friend.
 * @param userID - the userID of the friend.
 * @param otherName - the name of the friend.
 * @returns - dispatch of type success or failure depending on createFriendGame state.
 * */
export const createFriendGame = (userID, otherName) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const myID = getState().firebase.auth.uid;
        const myName = getState().firebase.profile.userName;
        firestore.collection('games').add({
            userID1: myID,
            user1Name: myName,
            userID2: userID,
            user2Name: otherName,
            turn: myID,
            p1Score: 0,
            p2Score: 0,
            currentSet: "1",
            shouldCreateNewGameSet : myID,
            amountOfPlayerLeft : 2,
            redirectTo: null,
            gameIsFinished: false
        }).then((docRef) => dispatch({type: 'CREATED_FRIEND_GAME_SUCCESS', payload: `${'/game-landing/' + docRef.id}`}))
            .catch((err) => dispatch({type:'CREATE_FRIEND_GAME_FAILURE', err}))
    }
}

/**
 * This function restores the redirect to null.
 * @returns - dispatch of type restore_redirect_to.
 * */
export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}

/**
 * This function tries to remove the selected friendRequest.
 * @param requestID - the friendrequest ID.
 * @returns - dispatch of type success or failure depending on removeFriend state.
 * */
export const cancelFriendRequest = (requestID) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let notificationID = null;

        firestore.collection('friendRequests').doc(requestID).get()
            .then((docRef) => {
                notificationID = docRef.data().notificationID;

                firestore.collection('friendRequests').doc(requestID).delete()
                    .then(() => {
                        firestore.collection('notifications').doc(notificationID).delete()
                            .then()
                            .catch((err) => console.log(err, 'couldnt delete notification entry on cancel friend req'));
                    })
                    .catch((err) => console.log(err,'couldnt cancel friend req :('));
            })
            .catch((err) => console.log(err, 'couldnt get notificationID'));
    }
}
