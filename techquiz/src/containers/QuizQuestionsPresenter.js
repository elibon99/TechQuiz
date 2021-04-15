import {connect} from "react-redux";
import QuizQuestions from "../components/game/QuizQuestions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {verifyQuestion} from "../store/actions/gameActions";

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const gameSetID = game ? game.currentSet : null;
    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = gameSetID ? (gameSets[gameSetID] === undefined ? gameSets : null) : null;
    // if(gameSet){
    //     console.log(gameSet, "in quiz question presenter")
    // }
    return{
        auth: state.firebase.auth,
        gameSetID: gameSetID,
        gameID: id,
        gameSet: gameSet
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        verifyQuestion: (gamingID, answer, gameSetID) => dispatch(verifyQuestion(gamingID,answer, gameSetID))
    }
}


const QuizQuestionsPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'games',
            doc: props.gameID,
            subcollections: [
                {collection: 'gameSets', doc: props.gameSetID}
            ],
            storeAs: 'Ggamesets'
        },
        {collection: 'games'}
    ])
)(QuizQuestions);
export default QuizQuestionsPresenter;
