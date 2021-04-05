import authReducer from "./authReducer";
import profileStatsReducer from "./profileStatsReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    profileStats: profileStatsReducer
});

export default rootReducer;