import {connect} from "react-redux";
import {compose} from "redux";
import GameCategory from "../components/game/GameCategory";
import {firestoreConnect} from "react-redux-firebase";
import {fetchQuestions} from "../store/actions/gameActions";


const mapStateToProps = (state, ownProps) => {
    //console.log(state)
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;
    const games = state.firestore.data.games;
    const game = (id && games) ? games[id] : null;
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
        localGame: state.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: (gamingID, category) => dispatch(fetchQuestions(gamingID,category))
    }
}


const GameCategoryPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameCategory);

export default GameCategoryPresenter;
