import {connect} from "react-redux";
import LeaderboardPerCategory from "../components/leaderboard/LeaderboardPerCategory";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    // TODO - check for redundancy
    /* Get all users */
    const category = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const usersResult = users ? users : null;
    let categoryScore = "";
    categoryScore = state.firestore.data.categoryLeaderboardResults;
    if(categoryScore === null){
        categoryScore = state.firestore.data.multiplayerRating;
    }

    if(category === "Singleplayer score"){
        categoryScore = state.firestore.data.userStats;
    }

    return {
        auth: state.firebase.auth,
        users: usersResult,
        categoryScore: categoryScore,
        category: category
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const LeaderboardCategoryPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'singleplayerScores', doc: props.category,
            subcollections: [
                {collection: 'scores', orderBy: ['score', 'desc']}
                ],
            storeAs: 'categoryLeaderboardResults'
        },
        {collection: 'multiplayerRating', orderBy: ['rating', 'desc']},
        {collection: 'userStats', orderBy: ['slScore', 'desc']},
    ])
)(LeaderboardPerCategory);

export default LeaderboardCategoryPresenter;
