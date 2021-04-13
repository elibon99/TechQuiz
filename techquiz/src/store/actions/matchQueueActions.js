
export const addToMatchQueue = (rating, username) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;

        firestore.collection('users').doc(uid).get()
            .then((doc) => {
                console.log(doc.data(), "user");
                firestore.collection('matchqueue').get()
                    .then((querySnapshot) => {
                        if(querySnapshot.size >= 1){
                            var gamingSetId = null;
                            querySnapshot.forEach((doc) => {
                                if(doc.data().uid !== uid && doc.data().gameID !== null){
                                    gamingSetId = doc.data().gameID;
                                }
                            })
                        }
                        else{
                            gamingSetId = firestore.collection('games').doc().id;
                        }
                        firestore.collection('matchqueue').add({
                            uid: uid,
                            rating: rating,
                            username: doc.data().userName,
                            gameID: gamingSetId
                        })
                            .then((docRef) => {
                                dispatch({type: 'ADDED_TO_MATCH_QUEUE_SUCCESS'});
                                console.log(gamingSetId, "gameID")
                                dispatch({type: 'REDIRECT', payload: `${'/game-landing/' + gamingSetId}`});
                            })
                            .catch((err) => {
                                dispatch({type: 'ADDED_TO_MATCH_QUEUE_FAILURE', err});
                            });

                    } )
                    .catch((error) => console.log("could not fetch matchqueue"))


            })
            .catch((err) => console.log(err));
    }
}

export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}
