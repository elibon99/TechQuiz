
export const setUsername = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USERSEARCH", payload: userName});
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
