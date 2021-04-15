import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const gameSetID = game ? game.currentSet : null;
    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = gameSetID ? (gameSets[gameSetID] === undefined ? gameSets : null) : null;
    if(gameSet){
        console.log(gameSet, " in presenter")
    }
    return{
        auth: state.firebase.auth,
        gameSetID: gameSetID,
        gameID: id,
        gameSet: gameSet
    }
}

const QuizLandingPresenter = compose(
    connect(mapStateToProps),
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
