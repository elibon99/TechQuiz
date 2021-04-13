import {connect} from "react-redux";
import FindGame from "../components/gameSetup/FindGame";
import {addToMatchQueue} from "../store/actions/matchQueueActions";
import {restoreRedirectTo} from "../store/actions/matchQueueActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const userStats = state.firestore.data.userStats;
    const userStat = userStats ? userStats[uid] : null;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;

    return{
        auth: state.firebase.auth,
        userStats: userStat,
        currentFoundGame: state.matchQueue,
        user: user,
        matchQueue: state.matchQueue
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addToQueue: (rating) => dispatch(addToMatchQueue(rating)),
        restoreRedirectTo: () => dispatch(restoreRedirectTo())
    }
}

const FindGamePresenter = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'userStats'},
        {collection: 'users'}
    ])
)(FindGame);

export default FindGamePresenter;
