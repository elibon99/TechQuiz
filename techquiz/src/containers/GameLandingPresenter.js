import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import GameLanding from "../components/game/GameLanding";
import {generateCategories, restoreRedirectFirebase} from "../store/actions/gameActions";


const mapStateToProps = (state, ownProps) => {
    console.log(state, "State withinh game landing presenter")
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
    const userStats = state.firestore.data.userStats;
    const redirectTo = game ? game.redirectTo : null;
    const userStat = userStats ? userStats[uid] : null;
    const opponentID = game ? (game.userID1 === uid ? game.userID2 : game.userID1) : null;
    const opponentName = game ? (game.userID1 === uid ? game.user2Name : game.user1Name) : null;
    const opponentScore = game ? (game.userID1 === uid ? game.p2Score : game.p1Score) : null;
    const userScore = game ? (game.userID1 === uid ? game.p1Score : game.p2Score) : null;
    const score = (opponentScore !== null && userScore !== null) ? {userScore: userScore, opponentScore: opponentScore} : null;
    const opponent = (opponentID && userStats && opponentName) ? {username: opponentName, rating: userStats[opponentID].mlRating} : null;
    const isYourTurn = game ? (game.turn === uid ? true : false) : null;
    const shouldCreateNewGameSet = game ? (game.shouldCreateNewGameSet === uid ? true : false) : null;
    game ? console.log(game.shouldCreateNewGameSet, ' who is this guy') : console.log('woops');

    return{
        auth: state.firebase.auth,
        game: game,
        opponent: opponent,
        profile: state.firebase.profile,
        userStat: userStat,
        score: score,
        isYourTurn: isYourTurn,
        gameID: id,
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



