import {connect} from "react-redux";
import FindGame from "../components/gameSetup/FindGame";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const FindGamePresenter = connect(mapStateToProps)(FindGame);

export default FindGamePresenter;
