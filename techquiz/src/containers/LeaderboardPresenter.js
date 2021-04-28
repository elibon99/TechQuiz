import {connect} from "react-redux";
import Leaderboard from "../components/leaderboard/Leaderboard";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

/**
 * This function maps the state to props which will be sent to the relevant components.
 * @param state
 * @returns //TODO
 */
const mapStateToProps = (state) => {
    // TODO - check for redundancy
    /* Get the multiplayer ratings*/
    const mlRating = state.firestore.ordered.multiplayerRating;
    const mlRatingResult = mlRating ? mlRating : null;

    /* Get the score of each category */
    const bashScore = state.firestore.ordered["singleplayerScores/bashScore/scores"];
    const bashScoreResult = bashScore ? bashScore : null;
    const devopsScore = state.firestore.ordered["singleplayerScores/devopsScore/scores"];
    const devopsScoreResult = devopsScore ? devopsScore : null;
    const dockerScore = state.firestore.ordered["singleplayerScores/dockerScore/scores"];
    const dockerScoreResult = dockerScore ? dockerScore : null;
    const htmlScore = state.firestore.ordered["singleplayerScores/htmlScore/scores"];
    const htmlScoreResult = htmlScore ? htmlScore : null;
    const javascriptScore = state.firestore.ordered["singleplayerScores/javascriptScore/scores"];
    const javascriptScoreResult = javascriptScore ? javascriptScore : null;
    const kubernetesScore = state.firestore.ordered["singleplayerScores/kubernetesScore/scores"];
    const kubernetesScoreResult = kubernetesScore ? kubernetesScore : null;
    const laravelScore = state.firestore.ordered["singleplayerScores/laravelScore/scores"];
    const laravelScoreResult = laravelScore ? laravelScore : null;
    const linuxScore = state.firestore.ordered["singleplayerScores/linuxScore/scores"];
    const linuxScoreResult = linuxScore ? linuxScore : null;
    const mysqlScore = state.firestore.ordered["singleplayerScores/mysqlScore/scores"];
    const mysqlScoreResult = mysqlScore ? mysqlScore : null;
    const phpScore = state.firestore.ordered["singleplayerScores/phpScore/scores"];
    const phpCoreResult = phpScore ? phpScore : null;
    const wordpressScore = state.firestore.ordered["singleplayerScores/wordpressScore/scores"];
    const wordpressCoreResult = wordpressScore ? wordpressScore : null;

    /* Get the userstats */
    const userStats = state.firestore.ordered.userStats;
    const userStatsResult = userStats ? userStats : null;

    /* Get all users */
    const users = state.firestore.data.users;
    const usersResult = users ? users : null;

    return {
        auth: state.firebase.auth,
        users: usersResult,
        mlRating: mlRatingResult,
        slScores: userStatsResult,
        bashScore: bashScoreResult,
        devopsScore: devopsScoreResult,
        dockerScore: dockerScoreResult,
        htmlScore: htmlScoreResult,
        javascriptScore: javascriptScoreResult,
        kubernetesScore: kubernetesScoreResult,
        laravelScore: laravelScoreResult,
        linuxScore: linuxScoreResult,
        mysqlScore: mysqlScoreResult,
        phpScore: phpCoreResult,
        wordpressScore: wordpressCoreResult
    }
}

/**
 * This function connects to the firestore and retrieves the relevant collections if the user is logged in.
 * @returns an empty array if the user is not signed in.
 * @returns the requested collections if the user is signed in.
 * */
// TODO: FIX AUTH GUARD
const LeaderboardPresenter = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'multiplayerRating', limit: 10, orderBy: ['rating', 'desc']},
        {collection: 'userStats', limit: 10, orderBy: ['slScore', 'desc']},
        {collection: 'users'},
        {collection: 'singleplayerScores/bashScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/devopsScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/dockerScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/htmlScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/javascriptScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/kubernetesScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/laravelScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/linuxScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/mysqlScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/phpScore/scores', limit:10, orderBy: ['score', 'desc']},
        {collection: 'singleplayerScores/wordpressScore/scores', limit:10, orderBy: ['score', 'desc']}
    ])
)(Leaderboard);

export default LeaderboardPresenter;
