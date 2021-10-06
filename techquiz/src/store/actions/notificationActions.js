

export const clearNotifications = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        firestore.collection('notifications').where('toUserID', '==', uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                        .then()
                        .catch((error) => console.log("Failed to delete notification"));
                })
            }).catch((error) => console.log("failed to clear all notifications"));
    }
}



