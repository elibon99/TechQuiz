import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"
    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;

    let currentGamesYourTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn === uid && entry[1].gameIsFinished === false;
    }) : null;
    let currentGamesTheirTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn !== uid && entry[1].gameIsFinished === false;
    }) : null;

    currentGamesYourTurn ? currentGamesYourTurn.forEach((entry) => {
        if(entry[1].userID1 === uid) {
            entry.push({opponentName : entry[1].user2Name});
        }
        else{
            entry.push({opponentName : entry[1].user1Name});
        }
    }) : console.log('currentGamesYourTurnNONONO');

    currentGamesTheirTurn ? currentGamesTheirTurn.forEach((entry) => {
        if(entry[1].userID1 === uid) {
            entry.push({opponentName : entry[1].user2Name});
        }
        else {
            entry.push({opponentName : entry[1].user1Name});
        }
    }) : console.log('currentGamesTheirTurnNONONO');

    return{
        auth: state.firebase.auth,
        userStat: userStat,
        profile: state.firebase.profile,
        winLossRatio: winLossRatio,
        currentGamesYourTurn: currentGamesYourTurn,
        currentGamesTheirTurn: currentGamesTheirTurn
    }
}

const DashboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'userStats'},
        {collection: 'multiplayerRating'},
        {collection: 'games',
        }
    ])
    )(Dashboard);

export default DashboardPresenter;

