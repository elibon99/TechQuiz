import {connect} from "react-redux";
import GameFinished from "../components/game/GameFinished";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state, ownProps) => {
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
    const opponent = (opponentID && userStats && opponentName) ? {username: opponentName, rating: userStats[opponentID].mlRating} : null;
    const userScore = game ? (game.userID1 === uid ? game.p1Score : game.p2Score) : null;
    var whoWon = null;
    if(opponentScore && userScore){
        if(opponentScore === userScore){
            whoWon = `${"It's a draw: " + userScore + "-" + opponentScore}`;
        }
        else if(opponentScore > userScore){
            whoWon = `${opponentName + "won: " + opponentScore + "-" + userScore }`
        }
        else{
            whoWon = `${username + "won: " + userScore + "-" + opponentScore }`
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


const GameFinishedPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'}
    ])
)(GameFinished);

export default GameFinishedPresenter;
