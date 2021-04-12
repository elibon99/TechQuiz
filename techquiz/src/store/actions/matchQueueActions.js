export const addToMatchQueue = (rating, username) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;

        firestore.collection('users').doc(uid).get()
            .then((doc) => {firestore.collection('matchqueue').add({
                uid: uid,
                rating: rating,
                username: doc.data().userName,
                gameID: null
            })
                .then((docRef) => {
                    console.log(docRef)
                    dispatch({type: 'ADDED_TO_MATCH_QUEUE_SUCCESS'});
                })
                .catch((err) => {
                    dispatch({type: 'ADDED_TO_MATCH_QUEUE_FAILURE', err});
                });

            })
            .catch((err) => console.log(err));
    }
}
