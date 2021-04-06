import {connect} from "react-redux";
import Landing from "../components/home/Landing";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const LandingPresenter = connect(mapStateToProps)(Landing);

export default LandingPresenter;
