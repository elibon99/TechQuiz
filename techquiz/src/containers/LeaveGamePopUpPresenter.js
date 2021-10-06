import {connect} from "react-redux";
import LeaveGamePopUp from "../components/Notifications/LeaveGamePopUp";
import {forfeitGameSet, stopTimer} from "../store/actions/gameActions";

const mapStateToProps = (state, ownProps) => {
    const lengthOfPath = window.location.pathname.length;
    const gameID = window.location.pathname.substring(14, lengthOfPath);
    return {
        gameID: gameID,
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        forfeitGameSet: (gameID) => dispatch(forfeitGameSet(gameID)),
        stopTimer: () => dispatch(stopTimer())
    }
}


const LeaveGamePopUpPresenter = connect(mapStateToProps, mapDispatchToProps)(LeaveGamePopUp);

export default LeaveGamePopUpPresenter;

