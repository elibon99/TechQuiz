
export const addToMatchQueue = (rating) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const username = getState().firebase.profile.userName;
        let shouldSkip = false;
        var gamingSetId = null;
        var shouldCreateNewGame = false;

        firestore.collection('users').doc(uid).get()
            .then((doc) => {
                firestore.collection('matchqueue').get()
                    .then((querySnapshot) => {
                        if(querySnapshot.size >= 1){
                            querySnapshot.forEach((doc) => {
                                if(shouldSkip){
                                    return;
                                }
                                else if(doc.data().uid !== uid && doc.data().gameID !== null){
                                    gamingSetId = doc.data().gameID;
                                    shouldSkip = true;
                                }
                                else if (doc.data().uid === uid){
                                    gamingSetId = firestore.collection('games').doc().id;
                                    shouldCreateNewGame = true;
                                    shouldSkip = true;
                                }
                                else{
                                    console.log('Something wrong happenend when creating game');
                                }
                            })
                        }
                        else{
                            gamingSetId = firestore.collection('games').doc().id;
                            shouldCreateNewGame = true;
                            console.log("Else statement happened")
                        }
                        /* Creating new game either if matchqueue is empty or if entries in matchqueue are mapped to same user */
                        if(shouldCreateNewGame){
                            firestore.collection('games').doc(gamingSetId).set({
                                userID1: uid,
                                user1Name: username,
                                userID2: '',
                                user2Name: '',
                                turn: uid,
                                p1Score: 0,
                                p2Score: 0,
                                currentSet: "",
                                shouldCreateNewGameSet : uid,
                                amountOfPlayerLeft : 2,
                                redirectTo: null,
                                gameIsFinished: false,
                                timeOfGameFinished: null
                            }).then(() => console.log("Succesfully created game"))
                                .catch((err) => console.log("Failed to create game :", err));
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
