import {connect} from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {acceptGameInvitation, rejectGameInvitation} from "../store/actions/gameInvitationActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state - the redux state.
 * @returns an object that maps the the following properties to states:
 *  auth - maps to the firebase auth collection,
 *  userStat - maps to firestore current user stats,
 *  profile - maps to the users collection via firebase,
 *  winLossRatio - the current users Win/Loss-ratio,
 *  currentGamesYourTurn - all the current users games, where it's the current users turn,
 *  currentGamesTheirTurn - all the current users games, where it's the opponents turn,
 *  finishedGames - all the current users finished games,
 *  gameInvitations - all the game invitations of the current user.
 */
const mapStateToProps = (state) => {
    /* Getting user stats from firestore for the currently logged in user*/
    const uid = state.firebase.auth.uid;
    const userStat = state.firestore.data.userStats ? state.firestore.data.userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"

    /* Getting game data from firestore*/
    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;
    const finishedGamesFB = state.firestore.data.finishedGames ? state.firestore.data.finishedGames : null;
    const finishedGameEntries = finishedGamesFB ? Object.entries(finishedGamesFB) : null;

    /* Setting up some variables used for later deciding who won */
    let userScore = 0;
    let opponentScore = 0;
    let whoWon = null;

    /* Get all games where its the current user's turn to play  */
    let currentGamesYourTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn === uid && entry[1].gameIsFinished === false;
    }) : null;

    /* Get all games where its the opponent user's turn to play  */
    let currentGamesTheirTurn = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].turn !== uid && entry[1].gameIsFinished === false;
    }) : null;

    /* If the above statement doesn't return any current games
    for the current user with their turn, set the array to null. */
    if(currentGamesYourTurn){
        if(currentGamesYourTurn.length === 0){
            currentGamesYourTurn = null;
        }
    }

    /* Add the opponents name in to the game objects where it's the users turn to play */
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

    /* If the above statement doesn't return any current games
    for the current user the opponents turn turn, set the array to null. */
    if(currentGamesTheirTurn){
        if(currentGamesTheirTurn.length === 0){
            currentGamesTheirTurn = null;
        }
    }

    /* Add the opponents name in to the game objects where it's the opponent's turn to play */
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

    /* Get all the finished games */
    let finishedGames = (finishedGamesFB && uid) ? finishedGameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === true;
    }) : null;

    /* If the above statement doesn't return any finished games for the current user, set the array to null. */
    if(finishedGames){
        if(finishedGames.length === 0){
            finishedGames = null;
        }
    }

    /* Go through each finished game, decide who won. push the whoWon result in to the game object. */
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

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns acceptGameInvitation - a method that will handle the logic for accepting a game invitation
 * @returns rejectGameInvitation - a method that will handle the logic for rejecting a game invitation
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        acceptGameInvitation: (invitationID) => dispatch(acceptGameInvitation(invitationID)),
        rejectGameInvitation: (invitationID) => dispatch(rejectGameInvitation(invitationID))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
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

