import {connect} from "react-redux";
import CurrentGameStats from "../components/game/CurrentGameStats";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const CurrentGameStatsPresenter = connect(mapStateToProps)(CurrentGameStats);

export default CurrentGameStatsPresenter;
