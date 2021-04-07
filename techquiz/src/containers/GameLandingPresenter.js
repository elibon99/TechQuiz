import {connect} from "react-redux";
import GameLanding from "../components/game/GameLanding";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const GameLandingPresenter = connect(mapStateToProps)(GameLanding);

export default GameLandingPresenter;
