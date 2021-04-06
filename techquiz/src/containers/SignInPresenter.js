import SignIn from "../components/authentication/SignIn";
import {connect} from "react-redux";
import {signIn} from "../store/actions/authActions";

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const SignInPresenter = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInPresenter;
