
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

        firestore.collection('friendRequests').add({
            sentReqUserName: selfName,
            gotReqUserName: otherName,
            sentRequest: self,
            gotRequest: otherPerson,
            isAccepted: false,
            isRejected: false
        }).then(() => {
            firestore.collection('notifications').add({
              notificationMessage: "You have received a new friend request",
              toUser: otherName,
              fromUser: selfName,
              toUserID: otherPerson,
              fromUserID: self,
                linkTo: "/profile-preview/" + self
            })
                .then(() => console.log('opened up a notification collection'))
                .catch((err) => console.log(err, 'something went wrong updating notification collection'));
            console.log('added a friend request entry');
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
        firestore.collection('friendRequests').doc(requestID).update({
            isAccepted: true
        }).then(() =>{
            console.log('accepted a friend request');
            dispatch({type: 'ACCEPTED_REQUEST_SUCCESS'})
        }).catch((err) => {
            console.log('hello is this happening', err);
            dispatch({type: 'ACCEPTED_REQUEST_FAILURE', err});
        });
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
        }).then(() =>{
            console.log('rejected a friend request');
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
            currentSet: "",
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
