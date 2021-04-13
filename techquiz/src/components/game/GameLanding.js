import React from 'react';
import GameSetItem from "./GameSetItem";
import GameVsInfo from "./GameVsInfo";
import {Link, Redirect} from "react-router-dom";

const GameLanding = ({auth, game, opponent, profile, userStat, score, isYourTurn, gameID, generateCategories}) => {
    console.log(gameID, 'gameid');
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        (game && userStat) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsInfo game={game} opponent={opponent} profile={profile} userStat={userStat} score={score}/>
                <GameSetItem isYourTurn={isYourTurn}/>
                <div className="card-content">
                    <div className="container">
                        <Link to={'/choose-category/' + gameID}>
                            <button className="btn blue lighten-1 z-depth-0 play-button" onClick={generateCategories()}>Play</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> :
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>

    )
}

export default GameLanding;
