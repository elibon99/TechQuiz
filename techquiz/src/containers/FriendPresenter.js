import {connect} from "react-redux";
import FriendLanding from "../components/friends/FriendLanding";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const FriendPresenter = connect(mapStateToProps)(FriendLanding);

export default FriendPresenter;
