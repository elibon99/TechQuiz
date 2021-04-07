import authReducer from "./authReducer";
import profileStatsReducer from "./profileStatsReducer";
import {combineReducers} from "redux";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    profileStats: profileStatsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;