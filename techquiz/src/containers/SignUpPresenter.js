import SignUp from "../components/authentication/SignUp";
import {connect} from "react-redux";
import {signUp} from "../store/actions/authActions";

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth

    }
}

const SignUpPresenter = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpPresenter;
