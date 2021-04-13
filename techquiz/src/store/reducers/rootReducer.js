import authReducer from "./authReducer";
import profileStatsReducer from "./profileStatsReducer";
import matchQueueReducer from "./matchQueueReducer";
import {combineReducers} from "redux";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profileStats: profileStatsReducer,
    matchQueue: matchQueueReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    game: gameReducer
});

export default rootReducer;
