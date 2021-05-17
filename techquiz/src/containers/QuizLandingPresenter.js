import {connect} from "react-redux";
import QuizLanding from "../components/game/QuizLanding";
import {firestoreConnect} from "react-redux-firebase";
import {startTimer, resetHasChosenCategory} from "../store/actions/gameActions";
import {compose} from "redux";

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
    const shouldSelectCategory = game ? game.shouldSelectCategory : null;
    const userShouldSelectCategory = (shouldSelectCategory && shouldSelectCategory === uid) ? true : false;
    const hasChosenCategory = game ? game.hasChosenCategory : null;
    const gameSetID = game ? game.currentSet : null;

    const isYourTurn = game ? (game.turn === uid ? true : false) : null;


    const gameSets = state.firestore.data.Ggamesets;
    const gameSet = (gameSetID && gameSets) ? (gameSets[gameSetID] === undefined ? gameSets : gameSets[gameSetID]) : null;

    const previousGameSet = (gameSetID !== 1 && gameSets) ? gameSets[gameSetID-1]  : null;

    const hasForfittedCurrentGameSet = (gameSet && isUser1ID && gameSet.p1HasForfeited) ? true : (gameSet && isUser2ID && gameSet.p2HasForfeited) ? true : false;
    const hasForfittedPreviousGameSet = (previousGameSet && isUser1ID && previousGameSet.p1HasForfeited) ? true : (previousGameSet && isUser2ID && previousGameSet.p2HasForfeited) ? true : false;

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
        hasChosenCategory: hasChosenCategory,
        userShouldSelectCategory: userShouldSelectCategory
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
        return [
        {collection: 'games', storeAs: 'Games'},
        {collection: 'games',
        doc: props.gameID,
        subcollections: [
            {collection: 'gameSets'}
        ],
            storeAs: 'Ggamesets'
        },
    ]})
)(QuizLanding);

export default QuizLandingPresenter;
