import {connect} from "react-redux";
import GameFinished from "../components/game/GameFinished";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const GameFinishedPresenter = connect(mapStateToProps)(GameFinished);

export default GameFinishedPresenter;
