import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";
import {firestoreConnect} from "react-redux-firebase";
import {startTimer, resetHasChosenCategory} from "../store/actions/gameActions";
import {lifecycle, compose} from "recompose";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state, ownProps) => {
    /* Get id of URL - i.e. gameID */
    const id = ownProps.match.params.id;
    const uid = state.firebase.auth.uid;

    /* Get game info */
    const games = state.firestore.data.Games;
    const game = (id && games) ? games[id] : null;
    const isUser1ID = (game && game.userID1 === uid) ? true : false;
    const isUser2ID = (game && game.userID2 === uid) ? true : false;
    const hasChosenCategory = game ? game.hasChosenCategory : null;
    const gameSetID = game ? game.currentSet : null;

    const isYourTurn = game ? (game.turn === uid ? true : false) : null;

    console.log(game, " the game")

    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = (gameSetID && gameSets) ? (gameSets[gameSetID] === undefined ? gameSets : gameSets[gameSetID]) : null;
    console.log(isUser1ID, "user 1 ")
    console.log(isUser2ID, " user 2")
    console.log(gameSet, " game set")
    console.log(gameSets, " game sets")

    const previousGameSet = (gameSetID !== 1 && gameSets) ? gameSets[gameSetID-1]  : null;

    const hasForfittedCurrentGameSet = (gameSet && isUser1ID && gameSet.p1HasForfeited) ? true : (gameSet && isUser2ID && gameSet.p2HasForfeited) ? true : false;
    const hasForfittedPreviousGameSet = (previousGameSet && isUser1ID && previousGameSet.p1HasForfeited) ? true : (previousGameSet && isUser2ID && previousGameSet.p2HasForfeited) ? true : false;

    console.log(gameSetID, "current game set")
    console.log(gameSetID-1, " previous game set")
    console.log(hasForfittedCurrentGameSet, " has forfitted current game set")
    console.log(hasForfittedPreviousGameSet, " has forfittet previous game set")
    const hasForfitted = hasForfittedCurrentGameSet;


    /* Get which category was selected out of the 4, to get the selectedCategory.iconSrc property */
    var selectedCategory = null;
    const selectedCategories = state.game.selectedCategories;
    if(selectedCategories && gameSet){
        for(let i = 0; i < selectedCategories.length; i += 1){
            if(selectedCategories[i].category === gameSet.category){
                selectedCategory = selectedCategories[i];
            }
        }
    }


    return {
        auth: state.firebase.auth,
        gameSetID: gameSetID,
        hasForfitted: hasForfitted,
        gameID: id,
        gameSet: gameSet,
        timer: state.game.questionTimer,
        localGame: state.game,
        selectedCategory: selectedCategory,
        categoriesToImg: state.game.categoriesImgPath,
        isYourTurn: isYourTurn,
        hasChosenCategory: hasChosenCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        startTimer: (gameID, gameSetId) => dispatch(startTimer(gameID, gameSetId)),
        resetHasChosenCategory: (gameID) => dispatch(resetHasChosenCategory(gameID))
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const QuizLandingPresenter = compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        console.log(props.gameSetID, " set id in firestore connect");
        return [
        {collection: 'games', storeAs: 'Games'},
        {collection: 'games',
        doc: props.gameID,
        subcollections: [
            {collection: 'gameSets'}
        ],
            storeAs: 'Ggamesets'
        },

    ]}),
    lifecycle({
        componentDidMount(prevProps){

        }
    })
)(QuizLanding);

export default QuizLandingPresenter;
