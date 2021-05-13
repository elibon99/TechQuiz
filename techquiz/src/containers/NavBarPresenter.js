import Navbar from "../components/layout/NavBar";
import {connect} from "react-redux";
import {signOut} from "../store/actions/authActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {acceptGameInvitation, rejectGameInvitation} from "../store/actions/gameInvitationActions";
import {acceptFriendRequest, rejectFriendRequest} from "../store/actions/friendActions";
import {clearNotifications} from "../store/actions/notificationActions";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const notifications = state.firestore.data.Notifications;
    var ammountOfNotifications = 0;
    if(notifications){
        Object.entries(notifications).forEach((entry) => {ammountOfNotifications++;})
    }
    console.log(ammountOfNotifications)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        uid: uid,
        notifications: notifications,
        ammountOfNotifications: ammountOfNotifications

    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns signOut - a method that will sign out the current user.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut()),
        acceptGameInvitation: (invitationID) => dispatch(acceptGameInvitation(invitationID)),
        rejectGameInvitation: (invitationID) => dispatch(rejectGameInvitation(invitationID)),
        acceptFriendRequest: (requestID) => dispatch(acceptFriendRequest(requestID)),
        rejectFriendRequest: (requestID) => dispatch(rejectFriendRequest(requestID)),
        clearNotifications: () => dispatch(clearNotifications())
    }
}

const NavBarPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (props.uid === undefined) {
            return [];
        } else {
            return [
                {
                    collection: 'notifications',
                    orderBy: ['createdAt', 'desc'],
                    where: [
                        ['toUserID', '==', props.uid]
                    ],
                    storeAs: 'Notifications'
                }
            ]
        }
    }
))(Navbar);

export default NavBarPresenter;
