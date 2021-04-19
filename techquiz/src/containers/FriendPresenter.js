import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import FriendLanding from "../components/friends/FriendLanding";
import {setUsername} from "../store/actions/friendActions";

const mapStateToProps = (state) => {
    const users = state.firestore.data.UsersFriends;
    const friends = users ? users : null;
    return{
        auth: state.firebase.auth,
        friendSearch: state.friends.username,
        friends: friends
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setUsername: (username) => dispatch(setUsername(username))
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
        }
    ])
)(FriendLanding);

export default FriendPresenter;
