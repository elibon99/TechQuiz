import {connect} from "react-redux";
import QuizQuestions from "../components/game/QuizQuestions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {verifyQuestion, restoreRedirectTo, stopTimer} from "../store/actions/gameActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get id of URL - i.e. gameID */
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;

    /* Get game info */
    const games = state.firestore.data.Games;
    const game = (id && games) ? games[id] : null;
    const isYourTurn = game ? (game.turn === uid ? true : false) : null;
    const gameSetID = game ? game.currentSet : null;
    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = gameSetID ? (gameSets[gameSetID] === undefined ? gameSets : null) : null;

    return {
        auth: state.firebase.auth,
        gameSetID: gameSetID,
        gameID: id,
        gameSet: gameSet,
        game: state.game,
        timer: state.game.questionTimer,
        isYourTurn: isYourTurn
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns verifyQuestion - a method that handles answers to questions. It verifies the
 * chosen answer with the question, sees if the answer is correct or wrong, updates game info accordingly,
 * starts the next question or new game round or finishes the game depending on state.
 * @returns restoreRedirectTo - a method that sets the redirect to null.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        verifyQuestion: (gamingID, answer, gameSetID) => dispatch(verifyQuestion(gamingID,answer, gameSetID)),
        restoreRedirectTo: () => dispatch(restoreRedirectTo()),
        stopTimer: () => dispatch(stopTimer())
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const QuizQuestionsPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'games', storeAs: 'Games'},
        {collection: 'games',
            doc: props.gameID,
            subcollections: [
                {collection: 'gameSets', doc: props.gameSetID}
            ],
            storeAs: 'Ggamesets'
        },

    ])
)(QuizQuestions);
export default QuizQuestionsPresenter;
