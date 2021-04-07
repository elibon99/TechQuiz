import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const QuizLandingPresenter = connect(mapStateToProps)(QuizLanding);

export default QuizLandingPresenter;
