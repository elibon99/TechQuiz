import {connect} from "react-redux";
import ProfilePreview from "../components/friends/ProfilePreview";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {cancelFriendRequest, addFriend, removeFriend, acceptFriendRequest, rejectFriendRequest} from "../store/actions/friendActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get current userinfo */
    // TODO - check for redundancy
    const uid = ownProps.match.params.id;
    const myID = state.firebase.auth.uid;

    /* Get all the friend requests (outgoing and incoming) of the current user. */
    var isPending = false;
    var hasSentMeRequest = false;
    var requestID = null;
    const friendRequest = state.firestore.data.friendRequests ? state.firestore.data.friendRequests : null;
    if(friendRequest) {
        Object.entries(friendRequest).forEach((entry) => {
            if(entry[1] === null){
            }
            else{
                if(entry[1].gotRequest !== null && entry[1].sentRequest !== null) {
                    if (entry[1].gotRequest === uid && entry[1].sentRequest === myID) {
                        isPending = true;
                        requestID = entry[0];
                    }
                    if (entry[1].sentRequest === uid && entry[1].gotRequest === myID) {
                        hasSentMeRequest = true;
                        requestID = entry[0];
                    }
                }
            }
        });
    }

    /* Get userinfo and their friends */
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const friends = state.firestore.data.friends;
    const isFriend = friends ? true : false;
    const userName = user ? user.userName : null;

    /* Get userstats of all users and stats of the current user. */
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"

    /* Get friends profile pic and biography */
    const friendPicURL = user ? user.photoURL : null;
    const friendBiography = user ? user.biography : null;

    return {
        auth: state.firebase.auth,
        userName: userName,
        userStat: userStat,
        winLossRatio: winLossRatio,
        userID: uid,
        myID: myID,
        isFriend: isFriend,
        isPending: isPending,
        hasSentMeRequest: hasSentMeRequest,
        friendPicURL: friendPicURL,
        requestID: requestID,
        friendBiography : friendBiography
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns addFriend - a method that will add the selected user to current user's friendslist.
 * @returns removeFriend - a method that will remove the selected user from the current user's friendslist.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        addFriend: (userID, userName) => dispatch(addFriend(userID, userName)),
        removeFriend: (friendUserID) => dispatch(removeFriend(friendUserID)),
        acceptFriendRequest: (requestID) => dispatch(acceptFriendRequest(requestID)),
        rejectFriendRequest: (requestID) => dispatch(rejectFriendRequest(requestID)),
        cancelFriendRequest: (requestID) => dispatch(cancelFriendRequest(requestID))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
const ProfilePreviewPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (props.auth.uid === undefined) {
            return [];
        }
        else { return [
                {collection: 'users'},
                {collection: 'userStats'},
                {collection: 'multiplayerRating'},
                {collection: 'users',
                    doc: props.myID,
                    subcollections : [
                        {collection: 'friends',
                            where: [
                                ['userName', '==', props.userName],
                            ],
                        }
                    ],
                    storeAs: 'friends'
                },
                {collection: 'friendRequests'}
            ]
        }
    })
)(ProfilePreview);



export default ProfilePreviewPresenter;

