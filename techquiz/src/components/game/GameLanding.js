import React from 'react';
import GameSetItem from "./GameSetItem";
import GameVsInfo from "./GameVsInfo";
import {Link, Redirect} from "react-router-dom";

const GameLanding = ({auth, game, opponent, profile, userStat, score, isYourTurn, gameID, generateCategories, shouldCreateNewGameSet, restoreRedirectFirebase, redirectTo, mySetResults, opponentSetResults, gameSetCategories, currentSet, hasBeenAnsweredBy}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    if(redirectTo){
        const path = redirectTo;
        restoreRedirectFirebase();
        return <Redirect to={path}/>
    }
    return(
        (game && userStat) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsInfo game={game} opponent={opponent} profile={profile} userStat={userStat} score={score}/>
                <GameSetItem isYourTurn={isYourTurn} myResults={mySetResults[0]} opponentResults={opponentSetResults[0]} category={gameSetCategories[0]} setNr={1} currentSet={currentSet} hasBeenAnsweredBy={hasBeenAnsweredBy}/>
                <GameSetItem isYourTurn={isYourTurn} myResults={mySetResults[1]} opponentResults={opponentSetResults[1]} category={gameSetCategories[1]} setNr={2} currentSet={currentSet} hasBeenAnsweredBy={hasBeenAnsweredBy}/>
                <GameSetItem isYourTurn={isYourTurn} myResults={mySetResults[2]} opponentResults={opponentSetResults[2]} category={gameSetCategories[2]} setNr={3} currentSet={currentSet} hasBeenAnsweredBy={hasBeenAnsweredBy}/>

                <div className="card-content">
                    <div className="container">
                        {(isYourTurn && shouldCreateNewGameSet) ?
                            <Link to={'/choose-category/' + gameID}>
                                <button className="btn blue lighten-1 z-depth-0 play-button" onClick={generateCategories}>Play</button>
                            </Link> :
                        isYourTurn ?
                            <Link to={'/quiz-landing/' + gameID}>
                                <button className="btn blue lighten-1 z-depth-0 play-button">Play</button>
                            </Link> :
                            <Link to='/profile'>
                                <button className="btn blue lighten-1 z-depth-0 play-button">Go back to profile</button>
                            </Link>}
                    </div>
                </div>
            </div>
        </div> :
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>

    )
}

export default GameLanding;
