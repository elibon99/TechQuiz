import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {startTimer} from "../store/actions/gameActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get id of URL - i.e. gameID */
    const id = ownProps.match.params.id;

    /* Get game info */
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const gameSetID = game ? game.currentSet : null;

    console.log(gameSetID, "the gm id")
    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = (gameSetID && gameSets) ? (gameSets[gameSetID] === undefined ? gameSets : null) : null;

    return {
        auth: state.firebase.auth,
        gameSetID: gameSetID,
        gameID: id,
        gameSet: gameSet,
        timer: state.game.questionTimer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        startTimer: (gameID, gameSetId) => dispatch(startTimer(gameID, gameSetId))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const QuizLandingPresenter = compose(
    connect(mapStateToProps,mapDispatchToProps),
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
)(QuizLanding);

export default QuizLandingPresenter;
