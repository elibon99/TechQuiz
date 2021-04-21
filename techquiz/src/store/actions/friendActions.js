
export const setUsername = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USERSEARCH", payload: userName});
    }
}

export const addFriend = (userID) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const self = getState().firebase.auth.uid;
        const otherPerson = userID;

        console.log(self, 'self');
        console.log(otherPerson, 'otherguy');

        firestore.collection('friendRequests').add({
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
