import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const userName = user ? user.userName : null;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"
    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;
    let userScore = 0;
    let opponentScore = 0;
    let whoWon = null;

    let currentGamesYourTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn === uid && entry[1].gameIsFinished === false;
    }) : null;
    let currentGamesTheirTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn !== uid && entry[1].gameIsFinished === false;
    }) : null;

    if (currentGamesYourTurn) {
        currentGamesYourTurn.forEach((entry) => {
            if(entry[1].userID1 === uid) {
                entry.push({opponentName : entry[1].user2Name});
            }
            else{
                entry.push({opponentName : entry[1].user1Name});
            }
        })
    }

    if(currentGamesTheirTurn){
        currentGamesTheirTurn.forEach((entry) => {
            if(entry[1].userID1 === uid) {
                entry.push({opponentName : entry[1].user2Name});
            }
            else {
                entry.push({opponentName : entry[1].user1Name});
            }
        })
    }

    let finishedGames = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === true;
    }) : null;

    if(finishedGames){
        finishedGames.forEach((entry) => {
            userScore = (entry[1].userID1 === uid) ? entry[1].p1Score : entry[1].p2Score;
            opponentScore = (entry[1].userID1 === uid) ? entry[1].p2Score : entry[1].p1Score;
            if(entry[1].userID1 === uid) {
                if(userScore === opponentScore){
                    whoWon = `${"It was a draw: " + userScore + "-" + opponentScore}`;
                }
                else if(userScore > opponentScore){
                    whoWon = `${"You won: " + userScore + "-" + opponentScore}`
                }
                else {
                    whoWon = `${"You lost: " + userScore + "-" + opponentScore}`
                }
                entry.push({opponentName : entry[1].user2Name, whoWon : whoWon});
            }
            else {
                if(userScore === opponentScore){
                    whoWon = `${"It was a draw: " + userScore + "-" + opponentScore}`;
                }
                else if(userScore > opponentScore){
                    whoWon = `${"You won: " + userScore + "-" + opponentScore}`
                }
                else {
                    whoWon = `${"You lost: " + userScore + "-" + opponentScore}`
                }
                entry.push({opponentName : entry[1].user1Name, whoWon : whoWon});
            }
        })
    }


    return{
        auth: state.firebase.auth,
        userName: userName,
        userStat: userStat,
        profile: state.firebase.profile,
        winLossRatio: winLossRatio,
        currentGamesYourTurn: currentGamesYourTurn,
        currentGamesTheirTurn: currentGamesTheirTurn,
        finishedGames : finishedGames
    }
}

const DashboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'userStats'},
        {collection: 'multiplayerRating'},
        {collection: 'games', orderBy: ['timeOfGameFinished', 'desc']}
    ])
    )(Dashboard);

export default DashboardPresenter;

