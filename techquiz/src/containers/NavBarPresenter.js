import Navbar from "../components/layout/NavBar";
import {connect} from "react-redux";
import {signOut} from "../store/actions/authActions";

const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())

    }
}

const NavBarPresenter = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavBarPresenter;
