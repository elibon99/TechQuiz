import SignIn from "../components/authentication/SignIn";
import {connect} from "react-redux";
import {signIn} from "../store/actions/authActions";

/**
 * This function maps the dispatch to props so that the dispatch can be used in the relevant components.
 * @param dispatch - the dispatch method
 * @returns signIn - a method that will sign in the user.
 * */
const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
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

const SignInPresenter = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInPresenter;
