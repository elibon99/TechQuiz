import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import FriendLanding from "../components/friends/FriendLanding";
import {setUsername, rejectFriendRequest, acceptFriendRequest} from "../store/actions/friendActions";

const mapStateToProps = (state) => {
    console.log(state, 'stateoianfeoinsofinsoin');
    const users = state.firestore.data.UsersFriends;
    const profile = state.firebase.profile;
    const username = profile ? profile.userName : null;
    const uid = state.firebase.auth.uid;
    const friendRequests = state.firestore.data.receivedFriendRequests;

    return{
        auth: state.firebase.auth,
        friendSearch: state.friends.username,
        users: users,
        uid: uid,
        friends: state.firestore.data.friends,
        friendRequests: friendRequests,
        username: username
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
            ['userName', '<=', props.friendSearch + '\uf8ff'],
            ['userName', '!=', props.username]
        ],
            storeAs: 'UsersFriends'
        },
        {collection: 'friendRequests',
        where: [
            ['gotRequest', '==', props.uid]
        ],
            storeAs: 'receivedFriendRequests'
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
    ])
)(FriendLanding);

export default FriendPresenter;
