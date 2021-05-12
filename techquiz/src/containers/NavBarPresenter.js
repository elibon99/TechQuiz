import Navbar from "../components/layout/NavBar";
import {connect} from "react-redux";
import {signOut} from "../store/actions/authActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const notifications = state.firestore.data.Notifications;
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        uid: uid,
        notifications: notifications

    }
}

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns signOut - a method that will sign out the current user.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
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
