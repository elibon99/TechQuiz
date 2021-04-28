import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import GameLanding from "../components/game/GameLanding";
import {generateCategories, restoreRedirectFirebase} from "../store/actions/gameActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Getting game data from firestore */
    const gameID = ownProps.match.params.id;
    const games = state.firestore.data.games;
    const game = (gameID && games) ? games[gameID] : null;

    /* Getting user data from game and userstats */
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const userScore = game ? (game.userID1 === uid ? game.p1Score : game.p2Score) : null;

    /* Getting opponent data from game */
    const opponentID = game ? (game.userID1 === uid ? game.userID2 : game.userID1) : null;
    const opponentName = game ? (game.userID1 === uid ? game.user2Name : game.user1Name) : null;
    const opponentScore = game ? (game.userID1 === uid ? game.p2Score : game.p1Score) : null;
    const opponent = (opponentID && userStats && opponentName) ? {username: opponentName, rating: userStats[opponentID].mlRating} : null;

    /* Getting current game score */
    const gameScore = (opponentScore !== null && userScore !== null) ? {userScore: userScore, opponentScore: opponentScore} : null;
    /* Getting redirectTo attribute for when game is finished */
    const redirectTo = game ? game.redirectTo : null;

    /* isYourTurn is true if turn is equal to the userID of the currently logged in user, else false*/
    const isYourTurn = game ? (game.turn === uid ? true : false) : null;
    /* shouldCreateNewGameSet is true if shouldCreateNewGameSet is equal to the userID of the currently logged in user, else false*/
    const shouldCreateNewGameSet = game ? (game.shouldCreateNewGameSet === uid ? true : false) : null;

    return{
        auth: state.firebase.auth,
        game: game,
        opponent: opponent,
        profile: state.firebase.profile,
        userStat: userStat,
        score: gameScore,
        isYourTurn: isYourTurn,
        gameID: gameID,
        shouldCreateNewGameSet: shouldCreateNewGameSet,
        redirectTo: redirectTo
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns generateCategories - a method that will generate 4 categories randomly out of all 11 from the API.
 * @returns restoreRedirectFirebase - a method that will set the redirectTo in firebase games to null.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        generateCategories: () => dispatch(generateCategories()),
        restoreRedirectFirebase: (gameID) => dispatch(restoreRedirectFirebase(gameID))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const GameLandingPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameLanding);

export default GameLandingPresenter;



