import {connect} from "react-redux";
import Leaderboard from "../components/leaderboard/Leaderboard";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state) => {
    const mlRating = state.firestore.ordered.multiplayerRating;
    const mlRatingResult = mlRating ? mlRating : null;
    return{
        auth: state.firebase.auth,
        mlRating: mlRatingResult
    }
}

const LeaderboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'multiplayerRating', limit: 10, orderBy: ['rating', 'desc']}
    ])
)(Leaderboard);

export default LeaderboardPresenter;
