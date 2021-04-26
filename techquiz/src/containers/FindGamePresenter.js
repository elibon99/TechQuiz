import {connect} from "react-redux";
import FindGame from "../components/gameSetup/FindGame";
import {addToMatchQueue} from "../store/actions/matchQueueActions";
import {restoreRedirectTo} from "../store/actions/matchQueueActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {createFriendGame, setUsernameFindGame, restoreRedirectTo as RedirectTo} from "../store/actions/friendActions";

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const profile = state.firebase.profile;
    const username = profile ? profile.userName : null;
    const friends = state.firestore.data.friends;
    const games = state.firestore.data.games;
    const gameEntries = games ? Object.entries(games) : null;
    const friendsTemp = state.firestore.data.friendsTemp ? state.firestore.data.friendsTemp : null;
    const finishedGamesFB = state.firestore.data.finishedGames ? state.firestore.data.finishedGames : null;
    const finishedGameEntries = finishedGamesFB ? Object.entries(finishedGamesFB) : null;

    let finishedGames = (finishedGamesFB && uid) ? finishedGameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === true;
    }) : null;

    var isYourFriend = new Map();
    if(friends){
        var friendArray = Object.entries(friends);
        friendArray.forEach((entry)=> {
            isYourFriend.set(entry[1].userID, true);
        })
    }

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
    let currentGames = (games && uid) ? gameEntries.filter((entry) => {
        return (entry[1].userID1 === uid || entry[1].userID2 === uid) && entry[1].gameIsFinished === false;
    }) : null;
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
    }else{
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

const mapDispatchToProps = (dispatch) => {
    return{
        addToQueue: (rating) => dispatch(addToMatchQueue(rating)),
        restoreRedirectTo: () => dispatch(restoreRedirectTo()),
        createFriendGame: (userID, otherName) => dispatch(createFriendGame(userID, otherName)),
        setUsername: (username) => dispatch(setUsernameFindGame(username)),
        restoreRedirectToFriendGame: () => dispatch(RedirectTo())
    }
}

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
