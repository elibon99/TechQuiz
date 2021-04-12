import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import GameLanding from "../components/game/GameLanding";


const mapStateToProps = (state) => {
    console.log(state)
    const uid = state.firebase.auth.uid;
    const users = state.firestore.data.users;
    const user = users ? users[uid] : null;
    const gameID = user ? user.currentGameID : null;
    const games = state.firestore.data.games;
    const game = (gameID && games) ? games[gameID] : null;

    return{
        auth: state.firebase.auth,
        game: game
    }
}

const GameLandingPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'games'}
    ])
)(GameLanding);

export default GameLandingPresenter;



