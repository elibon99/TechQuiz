import Navbar from "../components/layout/NavBar";
import {connect} from "react-redux";
import {signOut} from "../store/actions/authActions";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())

    }
}

const NavBarPresenter = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavBarPresenter;
