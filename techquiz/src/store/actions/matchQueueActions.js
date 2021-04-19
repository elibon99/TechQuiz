
export const addToMatchQueue = (rating, username) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        let shouldSkip = false;

        firestore.collection('users').doc(uid).get()
            .then((doc) => {
                console.log(doc.data(), "user");
                firestore.collection('matchqueue').get()
                    .then((querySnapshot) => {
                        if(querySnapshot.size >= 1){
                            var gamingSetId = null;
                            querySnapshot.forEach((doc) => {
                                if(shouldSkip){
                                    return;
                                }
                                else if(doc.data().uid !== uid && doc.data().gameID !== null){
                                    gamingSetId = doc.data().gameID;
                                    console.log("First else if happened with gameID: ", gamingSetId)
                                    shouldSkip = true;
                                }
                                else if (doc.data().uid === uid){
                                    console.log('> 1 entry, same userID');
                                    console.log("Second else if happened")
                                    gamingSetId = firestore.collection('games').doc().id;
                                    shouldSkip = true;
                                }
                                else{
                                    console.log('watafak');
                                }
                            })
                        }
                        else{
                            gamingSetId = firestore.collection('games').doc().id;
                            console.log("Else statement happened")
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
