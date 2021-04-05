import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyC99K5LTVwgf1Y1w6rMe3dEEacUPhvERv8",
    authDomain: "techquiz-de162.firebaseapp.com",
    projectId: "techquiz-de162",
    storageBucket: "techquiz-de162.appspot.com",
    messagingSenderId: "239171482198",
    appId: "1:239171482198:web:33b5eb8758481d2a9fc1f7"
};

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;