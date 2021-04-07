import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const mapStateToProps = (state) => {
    console.log(state)
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    return{
        auth: state.firebase.auth,
        userStat: userStat,
        profile: state.firebase.profile
    }
}

const DashboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'userStats'},
        {collection: 'multiplayerRating'}
    ])
    )(Dashboard);

export default DashboardPresenter;

