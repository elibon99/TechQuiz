/**
 * This function attempts to sign in the user.
 * @param credentials - the user credentials: email and password
 * @returns - dispatch of type success or failure depending on login state.
 * */
export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_FAILURE', err});
        });
    }
}

/**
 * This function attempts to sign out the user.
 * @returns - dispatch of type success or failure depending on logout state.
 * */
export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'SIGNOUT_FAILURE', err});
        });
    }
}

/**
 * This function attempts to sign up the user.
 * @param newUser - an object with the new users credentials:
 * newUser.username - the users username,
 * newUser.email - the users email,
 * newUser.password - the users password.
 * @returns - dispatch of type success or failure depending on signup state.
 * */
export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        let nonCaseSensitiveUsername = newUser.userName.toLowerCase();

        firestore.collection('usernames').doc(nonCaseSensitiveUsername).set({
            userID: ""
        }).then(() => {
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((resp) => {
                return (
                    firestore.collection('users').doc(resp.user.uid).set({
                        userName: newUser.userName,
                        initials: newUser.userName[0],
                        currentGameID: null,
                        photoURL: null
                    }),
                        firestore.collection('userStats').doc(resp.user.uid).set({
                            wins: 0,
                            losses: 0,
                            mlRating: 100,
                            slScore: 0,
                            wlRatio: "NaN"
                        }),
                        firestore.collection('multiplayerRating').doc(resp.user.uid).set({
                            username: newUser.userName,
                            rating: 100,
                            ranking: 1
                        }),
                        firestore.collection('singleplayerScores').doc('linuxScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('bashScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('phpScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('dockerScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('htmlScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('mysqlScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('wordpressScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('laravelScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('kubernetesScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('javascriptScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('devopsScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        }),
                        firestore.collection('singleplayerScores').doc('linuxScore')
                            .collection('scores').doc(resp.user.uid).set({
                            username: newUser.userName,
                            score: 0
                        })
                )
            }).then(() => {
                dispatch({type: 'SIGNUP_SUCCESS'});
            }).catch(err => {
                dispatch({type: 'SIGNUP_FAILURE', err});
            });
            }).catch((err) => {
                console.log(err, 'something went wrong setting usernames. non-unique user')
                dispatch({type: 'SIGNUP_FAILURE_NONUNIQUE', payload: "This username is taken. Your username must be unique."});
        });
    }
}

/**
 * This function attempts to set a profile picture to the user.
 * @param imagesFile - the image to be uploaded and set as a profile picture
 * @returns - dispatch of type success or failure depending on login state.
 * */
export const setProfilePicture = (imageFile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;

        firebase.storage().ref('users/' + uid + '/profile.jpg').put(imageFile)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then((url) => {
                        firebase.auth().currentUser.updateProfile({
                            photoURL: url
                        })
                            .then(() => {
                                firestore.collection('users').doc(uid).update({
                                    photoURL: url
                                })
                                    .then(() => console.log('yay updated in colleciton users'))
                                    .catch((err) => console.log(err, 'fuck that didnt work'));
                            })
                            .catch((err) => console.log(err, 'fuck 2'));
                    }).catch((err) => console.log(err, 'damn it'));

                console.log('uploaded pic');
            }).catch((err) => console.log(err, 'didnt work uploading pic'));
    }
}
