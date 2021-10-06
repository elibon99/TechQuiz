import SignUp from "../components/authentication/SignUp";
import {connect} from "react-redux";
import {signUp} from "../store/actions/authActions";

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns signUp - a method that will sign up the user.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const SignUpPresenter = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpPresenter;
