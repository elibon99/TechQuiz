
/**
 * This function takes the current user and adds it to the matchqueue.
 * If there are no entries in the matchqueue, a game is created for the user.
 *
 * If there is at least one entry and its creator is not the current user, it tries
 * to match these two players into the same game. Both their matchqueue entries are then deleted.
 * // TODO - är detta ovan korrekt eller sker det på cloudfunctionen minns ej?
 *
 * If there are only entries from the same user in the matchqueue,
 * another game will be created for the current user.
 *
 * @param rating - the rating of the user.
 * @returns - dispatches success/failure depending on outcome.
 * */
// TODO - thoroughly go through this method and add comments where needed.
export const addToMatchQueue = (rating) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const username = getState().firebase.profile.userName;
        let shouldSkip = false;
        var gamingSetId = null;
        var shouldCreateNewGame = false;
        var shouldConnectToGame = false;
        var matchqueueID = null;

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
                                    shouldConnectToGame = true;
                                    matchqueueID = doc.id;
                                    shouldSkip = true;
                                }
                                else if (doc.data().uid === uid){
                                    gamingSetId = firestore.collection('games').doc().id;
                                    shouldCreateNewGame = true;
                                    shouldSkip = true;
                                }
                                else{
                                }
                            })
                        }
                        else{
                            gamingSetId = firestore.collection('games').doc().id;
                            shouldCreateNewGame = true;
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
                                currentSet: "1",
                                generateCategories: null,
                                shouldCreateNewGameSet : uid,
                                amountOfPlayerLeft : 2,
                                redirectTo: null,
                                gameIsFinished: false,
                                timeOfGameFinished: null,
                                hasChosenCategory: false
                            }).then()
                                .catch((err) => console.log("Failed to create game :", err));
                        }
                        if(shouldConnectToGame) {
                            firestore.collection('games').doc(gamingSetId).get()
                                .then((docRef) => {
                                    const turn = (docRef.data().turn === "") ? uid : docRef.data().turn;
                                    docRef.ref.update({
                                        userID2: uid,
                                        turn: turn,
                                        user2Name: username
                                    }).then(() => {
                                        dispatch({type: 'ADDED_TO_MATCH_QUEUE_SUCCESS'});
                                        dispatch({type: 'REDIRECT', payload: `${'/game-landing/' + gamingSetId}`});
                                        firestore.collection('matchqueue').doc(matchqueueID).delete().then().catch((error) => console.log("Failed to delete"));
                                    })
                                        .catch((error) => console.log("Failed to update game"));
                                }).catch((error) => console.log("Failed to fetch game"));
                        }
                        else{
                            firestore.collection('matchqueue').add({
                                uid: uid,
                                rating: rating,
                                username: doc.data().userName,
                                gameID: gamingSetId
                            })
                                .then((docRef) => {
                                    dispatch({type: 'ADDED_TO_MATCH_QUEUE_SUCCESS'});
                                    dispatch({type: 'REDIRECT', payload: `${'/game-landing/' + gamingSetId}`});
                                })
                                .catch((err) => {
                                    dispatch({type: 'ADDED_TO_MATCH_QUEUE_FAILURE', err});
                                });
                        }

                    } )
                    .catch((error) => console.log("could not fetch matchqueue"))
            })
            .catch((err) => console.log(err));
    }
}

/**
 * This function restores the redirectTo and sets it to null.
 * @returns - dispatch of type restore_redirect_to.
 * */
export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}
