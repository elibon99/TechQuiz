import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"

    return{
        auth: state.firebase.auth,
        userStat: userStat,
        profile: state.firebase.profile,
        winLossRatio: winLossRatio
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

