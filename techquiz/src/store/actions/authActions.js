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

export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return (
                firestore.collection('users').doc(resp.user.uid).set({
                    userName: newUser.userName,
                    initials: newUser.userName[0]
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
                    })
            )
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch(err => {
            dispatch({type: 'SIGNUP_FAILURE', err});
        });
    }
}