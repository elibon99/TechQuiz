import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const gameSet = game ? game.currentSet : null;
    console.log(game, 'that was game in qzpresenter');
    return{
        auth: state.firebase.auth,
        gameSet: gameSet,
        category: " blabla",
        gameID: id
    }
}

const QuizLandingPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: 'games',
        doc: props.gameID,
        subcollections: [
            {collection: props.gameSet}
        ]}
    ])
)(QuizLanding);

export default QuizLandingPresenter;
