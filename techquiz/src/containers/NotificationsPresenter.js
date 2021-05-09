import {connect} from "react-redux";
import Notifications from "../components/Notifications/Notifications";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get id of URL - i.e. gameID */
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;

    const notifications = state.firestore.data.Notifications;
    console.log(notifications, 'notifications :D ');

    return {
        auth: state.firebase.auth,
        uid: uid,
        notifications: notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const NotificationsPresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) =>
    {
        console.log(props.uid);

    return [
        {collection: 'notifications',
            where: [
                ['toUserID', '==', props.uid]
                ],
            storeAs: 'Notifications'
        }
    ]
    }
)
)(Notifications);

export default NotificationsPresenter;
