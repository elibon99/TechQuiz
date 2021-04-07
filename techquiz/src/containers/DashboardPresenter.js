import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const mapStateToProps = (state) => {
    console.log(state)
    return{
        stats: state.profileStats.stats,
        auth: state.firebase.auth
    }
}

const DashboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'userStats'}
    ])
    )(Dashboard);

export default DashboardPresenter;

