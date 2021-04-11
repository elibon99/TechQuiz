export const addToMatchQueue = (rating) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth.uid;

        firestore.collection('matchqueue').doc(uid).set({
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
