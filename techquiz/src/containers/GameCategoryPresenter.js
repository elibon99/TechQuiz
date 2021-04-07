import {connect} from "react-redux";
import GameCategory from "../components/game/GameCategory";

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const GameCategoryPresenter = connect(mapStateToProps)(GameCategory);

export default GameCategoryPresenter;
