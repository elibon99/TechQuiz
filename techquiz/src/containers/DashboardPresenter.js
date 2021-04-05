import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";

const mapStateToProps = (state) => {
    return{
        stats: state.profileStats.stats
    }
}

const DashboardPresenter = connect(mapStateToProps)(Dashboard);

export default DashboardPresenter;