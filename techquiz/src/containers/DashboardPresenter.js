import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {acceptGameInvitation, rejectGameInvitation} from "../store/actions/gameInvitationActions";

const mapStateToProps = (state) => {
    /* Getting user stats from firestore for the currently logged in user*/
    const uid = state.firebase.auth.uid;
    const userStat = state.firestore.data.userStats ? state.firestore.data.userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"


    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;
    const finishedGamesFB = state.firestore.data.finishedGames ? state.firestore.data.finishedGames : null;
    const finishedGameEntries = finishedGamesFB ? Object.entries(finishedGamesFB) : null;
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

    let finishedGames = (finishedGamesFB && uid) ? finishedGameEntries.filter((entry) => {
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
        userStat: userStat,
        profile: state.firebase.profile,
        winLossRatio: winLossRatio,
        currentGamesYourTurn: currentGamesYourTurn,
        currentGamesTheirTurn: currentGamesTheirTurn,
        finishedGames : finishedGames,
        gameInvitations: state.firestore.data.gameInvitations
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        acceptGameInvitation: (invitationID) => dispatch(acceptGameInvitation(invitationID)),
        rejectGameInvitation: (invitationID) => dispatch(rejectGameInvitation(invitationID))
    }
}

const DashboardPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if(props.auth.uid === undefined){
            return [];
        }else{
            return [
                {collection: 'users'},
                {collection: 'userStats'},
                {collection: 'multiplayerRating'},
                {collection: 'games', orderBy: ['timeOfGameFinished', 'desc'], storeAs: 'finishedGames'},
                {collection: 'games'},
                {collection: 'gameInvitations' ,
                where: [
                    ['gotRequestID', '==', props.auth.uid]
                ]
                }
            ]}})
    )(Dashboard);

export default DashboardPresenter;

