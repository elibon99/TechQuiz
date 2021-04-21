import {connect} from "react-redux";
import ProfilePreview from "../components/friends/ProfilePreview";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {addFriend} from "../store/actions/friendActions";

const mapStateToProps = (state, ownProps) => {
    const uid = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const userName = user ? user.userName : null;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const winLossRatio = userStat ? (userStat.losses !== 0 ? (userStat.wins / userStat.losses): userStat.wins) : "NaN"

    return{
        auth: state.firebase.auth,
        userName: userName,
        userStat: userStat,
        winLossRatio: winLossRatio,
        userID: uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addFriend: (userID, userName) => dispatch(addFriend(userID, userName))
    }
}

const ProfilePreviewPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'userStats'},
        {collection: 'multiplayerRating'}
    ])
)(ProfilePreview);

export default ProfilePreviewPresenter;

