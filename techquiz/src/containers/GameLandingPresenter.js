import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import GameLanding from "../components/game/GameLanding";
import {generateCategories, restoreRedirectFirebase} from "../store/actions/gameActions";


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

const mapDispatchToProps = (dispatch) => {
    return{
        generateCategories: () => dispatch(generateCategories()),
        restoreRedirectFirebase: (gameID) => dispatch(restoreRedirectFirebase(gameID))
    }
}

const GameLandingPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),

    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameLanding);

export default GameLandingPresenter;



