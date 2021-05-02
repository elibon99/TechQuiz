import {connect} from "react-redux";
import {compose} from "redux";
import GameCategory from "../components/game/GameCategory";
import {firestoreConnect} from "react-redux-firebase";
import {fetchQuestions} from "../store/actions/gameActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get the current user, their userstats, the opponent info,
     the games, the score of both, the turn of the player */

    // TODO: gå igenom om man kan dela upp de snyggare men de ser dependent ut av varandra så vågar ej flytta
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const hasChosenCategory = game ? game.hasChosenCategory : null;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const opponentID = game ? (game.userID1 === uid ? game.userID2 : game.userID2) : null;
    const opponentName = game ? (game.userID1 === uid ? game.user2Name : game.user1Name) : null;
    const opponentScore = game ? (game.userID1 === uid ? game.p2Score : game.p1Score) : null;
    const userScore = game ? (game.userID1 === uid ? game.p1Score : game.p2Score) : null;
    const score = (opponentScore !== null && userScore !== null) ? {userScore: userScore, opponentScore: opponentScore} : null;
    const opponent = (opponentID && userStats && opponentName) ? {username: opponentName, rating: userStats[opponentID].mlRating} : null;
    const isYourTurn = game ? (game.turn === uid ? true : false) : null;

    return{
        auth: state.firebase.auth,
        gamingID: id,
        game: game,
        opponent: opponent,
        profile: state.firebase.profile,
        userStat: userStat,
        score: score,
        isYourTurn: isYourTurn,
        localGame: state.game,
        hasChosenCategory: hasChosenCategory
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns fetchQuestions - a method that will fetch 3 questions with the selected category.
 * */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: (gamingID, category) => dispatch(fetchQuestions(gamingID,category))
    }
}


/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const GameCategoryPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameCategory);

export default GameCategoryPresenter;
