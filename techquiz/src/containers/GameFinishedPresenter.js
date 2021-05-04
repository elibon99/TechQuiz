import {connect} from "react-redux";
import GameFinished from "../components/game/GameFinished";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {createGameInvitation} from "../store/actions/gameInvitationActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    // TODO CHECK FOR REDUNDANCY
    /* Get current user info, get games, get opponent info, get score of both */
    const id = ownProps.match.params.id;
    const userData = state.firebase.profile;
    const username = userData ? userData.userName : null;
    const uid = state.firebase.auth.uid;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const opponentID = game ? (game.userID1 === uid ? game.userID2 : game.userID1) : null;
    const opponentName = game ? (game.userID1 === uid ? game.user2Name : game.user1Name) : null;
    const opponentScore = game ? (game.userID1 === uid ? game.p2Score : game.p1Score) : null;
    const opponent = (opponentID && userStats && opponentName) ? {username: opponentName, rating: userStats[opponentID].mlRating, userID: opponentID} : null;
    const userScore = game ? (game.userID1 === uid ? game.p1Score : game.p2Score) : null;

    /* Decide whether the current user or the opponent won, change whoWon var accordingly. */
    var whoWon = null;
    if(opponentScore !== null && userScore !== null){
        if(opponentScore === userScore){
            whoWon = `${"It's a draw: " + userScore + "-" + opponentScore}`;
        }
        else if(opponentScore > userScore){
            whoWon = `${opponentName + " won: " + opponentScore + "-" + userScore }`
        }
        else{
            whoWon = `${username + " won: " + userScore + "-" + opponentScore }`
        }
    }

    return{
        auth: state.firebase.auth,
        whoWon: whoWon,
        username: username,
        userStats: userStat,
        opponentCredentials: opponent
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns createGameInvitation - a method that will invite the opponent to a game.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        createGameInvitation: (opponentID, opponentName) => dispatch(createGameInvitation(opponentID, opponentName))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const GameFinishedPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameFinished);

export default GameFinishedPresenter;
