
export const setUsernameFriends = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USER_SEARCH_FRIENDS", payload: userName});
    }
}

export const setUsernameFindGame = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USER_SEARCH_FIND_GAME", payload: userName});
    }
}

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
            console.log('added a friend request entry');
            dispatch({type: 'ADD_FRIEND_SUCCESS'})
        })
            .catch((err) => {
                console.log('hello is this happening', err);
                dispatch({type: 'ADD_FRIEND_FAILURE', err});
            });
    }
}

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

export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}
