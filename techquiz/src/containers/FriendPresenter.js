import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import FriendLanding from "../components/friends/FriendLanding";
import {setUsername, rejectFriendRequest, acceptFriendRequest} from "../store/actions/friendActions";

const mapStateToProps = (state) => {
    const users = state.firestore.data.UsersFriends;
    const friends = users ? users : null;
    const uid = state.firebase.auth.uid;
    const friendRequests = state.firestore.data.receivedFriendRequests;
    return{
        auth: state.firebase.auth,
        friendSearch: state.friends.username,
        friends: friends,
        uid: uid,
        friendRequests: friendRequests
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setUsername: (username) => dispatch(setUsername(username)),
        acceptFriendRequest: (requestID) => dispatch(acceptFriendRequest(requestID)),
        rejectFriendRequest: (requestID) => dispatch(rejectFriendRequest(requestID))
    }
}

const FriendPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users',
        where: [
            ['userName', '>=', props.friendSearch],
            ['userName', '<=', props.friendSearch + '\uf8ff']
        ],
            storeAs: 'UsersFriends'
        },
        {collection: 'friendRequests',
        where: [
            ['gotRequest', '==', props.uid]
        ],
            storeAs: 'receivedFriendRequests'
        }
    ])
)(FriendLanding);

export default FriendPresenter;
