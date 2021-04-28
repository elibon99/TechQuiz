import {connect} from "react-redux";
import Landing from "../components/home/Landing";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns auth - an object with auth information.
 */
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const LandingPresenter = connect(mapStateToProps)(Landing);

export default LandingPresenter;
