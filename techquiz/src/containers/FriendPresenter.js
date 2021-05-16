import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import FriendLanding from "../components/friends/FriendLanding";
import {
    setUsernameFriends,
    setUsernameUser,
    rejectFriendRequest,
    acceptFriendRequest,
} from "../store/actions/friendActions";

/**
* This function maps the state to props which will be sent to the relevant components.
* @param state
* @returns auth - an object with auth information.
*/
const mapStateToProps = (state, ownProps) => {
    /* Get the current users info, their friendrequests and info about their friends */
    const users = state.firestore.data.UsersFriends;
    const friendsNoSearch = state.firestore.data.friendsNoSearch;
    var friendsUserNames = [];
    if(friendsNoSearch){
        Object.entries(friendsNoSearch).forEach((entry) => {
            if(entry[1] !== null){
                friendsUserNames.push(entry[1].userName);
            }
        })
    }

    const profile = state.firebase.profile;
    const username = profile ? profile.userName : null;
    if(username && friendsNoSearch){
        friendsUserNames.push(username);
    }
    const uid = state.firebase.auth.uid;
    const friendRequests = state.firestore.data.receivedFriendRequests;
    const sentFriendRequests = state.firestore.data.sentFriendRequests;

    return{
        auth: state.firebase.auth,
        friendSearch: state.friends.usernameFriends,
        usersSearch: state.friends.usernameUsers,
        users: users,
        friendsNoSearch: friendsNoSearch,
        friendsUserNames: friendsUserNames,
        uid: uid,
        friends: state.firestore.data.friends,
        friendRequests: friendRequests,
        username: username,
        sentFriendRequests: sentFriendRequests
    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns setUsername - a method that will a method that sets the username search to whatever is in the input.
 * @returns acceptFriendRequest - a method that will handle the logic for accepting a friend request.
 * @returns rejectFriendRequest - a method that will handle the logic for rejecting a friend request.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        setUsername: (username) => dispatch(setUsernameFriends(username)),
        setUsernameUser: (username) => dispatch(setUsernameUser(username)),
        acceptFriendRequest: (requestID) => dispatch(acceptFriendRequest(requestID)),
        rejectFriendRequest: (requestID) => dispatch(rejectFriendRequest(requestID))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
const FriendPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
    if(props.uid === undefined || props.username === undefined){
        return [];
    }
    else if (props.friendsNoSearch === undefined && props.uid !== undefined){
        return [
            {collection: 'users',
                doc: props.uid,
                subcollections : [
                    {collection: 'friends'}

                ],
                storeAs: 'friendsNoSearch'
            }
        ]
    }
    else {
       return [
         {collection: 'users',
               doc: props.uid,
               subcollections : [
                   {collection: 'friends'}

               ],
               storeAs: 'friendsNoSearch'
         },
        {collection: 'users',
        where: [
            ['userName', '>=', props.usersSearch],
            ['userName', '<=', props.usersSearch + '\uf8ff'],
            ['userName', 'not-in', props.friendsUserNames]
        ],
            storeAs: 'UsersFriends'
        },
        {collection: 'friendRequests',
        where: [
            ['gotRequest', '==', props.uid]
        ],
            storeAs: 'receivedFriendRequests'
        },
           {collection: 'friendRequests',
               where: [
                   ['sentRequest', '==', props.uid]
               ],
               storeAs: 'sentFriendRequests'
           },
        {collection: 'users',
        doc: props.uid,
        subcollections : [
            {collection: 'friends',
                where: [
                    ['userName', '>=', props.friendSearch],
                    ['userName', '<=', props.friendSearch + '\uf8ff'],
                    ['userName', '!=', props.username]
                ],
            }

        ],
            storeAs: 'friends'
        }
    ] }})
)(FriendLanding);

export default FriendPresenter;
