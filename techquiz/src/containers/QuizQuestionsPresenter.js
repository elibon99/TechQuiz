import {connect} from "react-redux";
import QuizQuestions from "../components/game/QuizQuestions";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const QuizQuestionsPresenter = connect(mapStateToProps)(QuizQuestions);

export default QuizQuestionsPresenter;
