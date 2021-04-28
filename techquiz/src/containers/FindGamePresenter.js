import {connect} from "react-redux";
import FindGame from "../components/gameSetup/FindGame";
import {addToMatchQueue} from "../store/actions/matchQueueActions";
import {restoreRedirectTo} from "../store/actions/matchQueueActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {createFriendGame, setUsernameFindGame, restoreRedirectTo as RedirectTo} from "../store/actions/friendActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state) => {
    /* Get the current user info, all users and their friends */
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const profile = state.firebase.profile;
    const username = profile ? profile.userName : null;
    const friends = state.firestore.data.friends;
    const friendsTemp = state.firestore.data.friendsTemp ? state.firestore.data.friendsTemp : null;

    /* Get the game data from firestore */
    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;
    const finishedGamesFB = state.firestore.data.finishedGames ? state.firestore.data.finishedGames : null;
    const finishedGameEntries = finishedGamesFB ? Object.entries(finishedGamesFB) : null;

    /* Get all finished games for the current user */
    let finishedGames = (finishedGamesFB && uid) ? finishedGameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === true;
    }) : null;

    /* Get all friends of the current user */
    var isYourFriend = new Map();
    if(friends){
        var friendArray = Object.entries(friends);
        friendArray.forEach((entry)=> {
            isYourFriend.set(entry[1].userID, true);
        })
    }

    /* Get all recent players, i.e. unique non-friends that the user has played and finished games with */
    let recentPlayers = [];
    if(finishedGames){
        let hasAdded = new Map();
        finishedGames.forEach((entry) => {
            var opponentUser = entry[1].userID1 === uid ? entry[1].userID2 : entry[1].userID1;
            var opponentName = opponentUser === entry[1].userID1 ? entry[1].user1Name : entry[1].user2Name;
            if(!hasAdded.get(opponentUser) && !isYourFriend.get(opponentUser)){
                recentPlayers.push({opponentID: opponentUser, opponentName: opponentName});
                hasAdded.set(opponentUser, true);
            }

        })
    }

    /* Get all current games for the logged in user */
    let currentGames = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === false;
    }) : null;

    /* Go through all the users friends, see if they are in a game with each other */
    var friendsResult = [];
    if(friends){
        Object.entries(friends).forEach((friend)=> {
            var inGame = false;
            var isYourTurn = false;
            var gamingID = null;
            if(currentGames) {
                currentGames.forEach((game) => {
                    if (game[1].userID1 === friend[1].userID || game[1].userID2 === friend[1].userID) {
                        inGame = true;
                        gamingID = game[0];
                        if (game.turn === uid) {
                            isYourTurn = true;
                        }
                    }
                })
            }
            friendsResult.push({userID: friend[1].userID, username: friend[1].userName, inGameWith: inGame, isYourTurn: isYourTurn, gamingID: gamingID});
        })
    } else {
        friendsResult = null;
    }

    return{
        auth: state.firebase.auth,
        friendSearch: state.friends.usernameFindGame,
        uid: uid,
        friendGameStatus: state.friends,
        userStats: userStat,
        currentFoundGame: state.matchQueue,
        user: user,
        matchQueue: state.matchQueue,
        friends: friendsResult,
        username: username,
        recentPlayers: recentPlayers,
        friendsTemp: friendsTemp
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns addToQueue - a method that adds the user to the matchqueue. If the matchqueue is empty or only consists
 * of entries with the logged in user, a new game is created. Else, the user is paired with the other matchqueue entry and
 * the according game.
 * @returns restoreRedirectTo - a method that restores the redirect to null.
 * @returns createFriendGame - a method that starts a game with the selected friend.
 * @returns setUsername - a method that sets the username search to whatever is in the input.
 * @returns restoreRedirectToFriendGame - a method that restores the redirect to null, for the friendgame component.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        addToQueue: (rating) => dispatch(addToMatchQueue(rating)),
        restoreRedirectTo: () => dispatch(restoreRedirectTo()),
        createFriendGame: (userID, otherName) => dispatch(createFriendGame(userID, otherName)),
        setUsername: (username) => dispatch(setUsernameFindGame(username)),
        restoreRedirectToFriendGame: () => dispatch(RedirectTo())
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const FindGamePresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'userStats'},
        {collection: 'users',
            doc: props.uid,
            subcollections : [
                {collection: 'friends',
                    where: [
                        ['userName', '>=', props.friendSearch],
                        ['userName', '<=', props.friendSearch + '\uf8ff']
                    ],
                }

            ],
            storeAs: 'friends'
        },
        {collection: 'games', orderBy: ['timeOfGameFinished', 'desc'], storeAs: 'finishedGames'},
        {collection: 'games'},
        {collection: 'users',doc: props.uid,
            subcollections : [
                {collection: 'friends'}
            ],
            storeAs: 'friendsTemp'
        }
    ])
)(FindGame);

export default FindGamePresenter;
