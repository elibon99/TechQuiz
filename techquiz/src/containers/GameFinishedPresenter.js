import {connect} from "react-redux";
import GameFinished from "../components/game/GameFinished";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {acceptGameInvitation, createGameInvitation, rejectGameInvitation} from "../store/actions/gameInvitationActions";

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

    let outGoingGameInvitaions = state.firestore.data.meInvitedOpponentInvitation;
    let opponentHasBeenInvited = outGoingGameInvitaions ? true : false;

    let incomingGameInvitaions = state.firestore.data.opponentInvitedMeInvitation;
    let iGotInvitedByOpponent = incomingGameInvitaions ? true : false;

    let reqID = null;
    if(incomingGameInvitaions){
        reqID = Object.entries(incomingGameInvitaions);
    }

    let weInSameGame1 = state.firestore.data.opponentAndMeInSameGame1;
    let weInSameGame2 = state.firestore.data.opponentAndMeInSameGame2;

    let weAreInAGame = null;
    let weAreInGameID = null;
    if(weInSameGame1 !== null || weInSameGame2 !== null){
        weAreInAGame = true;
        if(weInSameGame1){
            weAreInGameID = Object.entries(weInSameGame1)[0][0];
        }
        if(weInSameGame2){
            weAreInGameID = Object.entries(weInSameGame2)[0][0];
        }
    } else {
        weAreInAGame = false;
    }

    let itsMyTurn = null;
    if(weInSameGame1){
        if(Object.entries(weInSameGame1)[0][1].turn === uid){
            itsMyTurn = true;
        }
        else {
            itsMyTurn = false;
        }
    }
    if(weInSameGame2){
        if(Object.entries(weInSameGame2)[0][1].turn === uid){
            itsMyTurn = true;
        }
        else {
            itsMyTurn = false;
        }
    }

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
        opponentCredentials: opponent,
        opponentID: opponentID,
        opponentHasBeenInvited : opponentHasBeenInvited,
        iGotInvitedByOpponent: iGotInvitedByOpponent,
        uid: uid,
        reqID: reqID,
        itsMyTurn: itsMyTurn,
        weAreInAGame: weAreInAGame,
        weAreInGameID: weAreInGameID
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns createGameInvitation - a method that will invite the opponent to a game.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        createGameInvitation: (opponentID, opponentName) => dispatch(createGameInvitation(opponentID, opponentName)),
        acceptGameInvitation: (invitationID) => dispatch(acceptGameInvitation(invitationID)),
        rejectGameInvitation: (invitationID) => dispatch(rejectGameInvitation(invitationID))
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
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'games'},
        {collection: 'userStats'},
        {collection: 'gameInvitations' ,
            where: [
                ['gotRequestID', '==', props.opponentID],
                ['sentRequestID', '==', props.uid]
            ],
            storeAs: 'meInvitedOpponentInvitation'
        },
        {collection: 'gameInvitations' ,
            where: [
                ['sentRequestID', '==', props.opponentID],
                ['gotRequestID', '==', props.uid]
            ],
            storeAs: 'opponentInvitedMeInvitation'
        },
        {collection: 'games' ,
            where: [
                ['userID1', '==', props.opponentID],
                ['userID2', '==', props.uid],
                ['gameIsFinished', '==', false],
            ],
            storeAs: 'opponentAndMeInSameGame1'
        },
        {collection: 'games' ,
            where: [
                ['userID1', '==', props.uid],
                ['userID2', '==', props.opponentID],
                ['gameIsFinished', '==', false],
            ],
            storeAs: 'opponentAndMeInSameGame2'
        }
    ])
)(GameFinished);

export default GameFinishedPresenter;
