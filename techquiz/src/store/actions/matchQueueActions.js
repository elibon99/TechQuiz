export const matchmaking = (rating) => {
    return (dispatch, getState, {getFirebase, getFireStore}) => {
        const firebase = getFirebase();
        const fireStore = getFireStore();
        const uid = firebase.auth.uid;

        fireStore.collection('matchqueue').doc().set({
            userID: uid,
            rating: rating,
        })
            .then(() => {
                dispatch({type: 'ADDED_TO_MATCH_QUEUE_SUCCESS'});
            })
            .catch((err) => {
                dispatch({type: 'ADDED_TO_MATCH_QUEUE_FAILURE', err});
            });
    }
}
