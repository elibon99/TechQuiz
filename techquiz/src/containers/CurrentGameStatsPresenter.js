import {connect} from "react-redux";
import CurrentGameStats from "../components/game/CurrentGameStats";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns auth - an object with auth information.
 */
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const CurrentGameStatsPresenter = connect(mapStateToProps)(CurrentGameStats);

export default CurrentGameStatsPresenter;
