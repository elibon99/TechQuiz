import React from 'react';
import GameVsCategoryInfo from "./GameVsCategoryInfo";
import {Link, Redirect} from "react-router-dom";

const GameCategory = ({game, opponent, profile, userStat, score, isYourTurn, auth, localGame}) =>  {

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (game && userStat) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsCategoryInfo game={game} opponent={opponent} profile={profile} userStat={userStat}/>
                <div className="card-content">
                    <div className="container">
                        <div className="row flex">
                    {localGame && localGame.map((category => {
                        return (
                            <div key={category} className="col s12 m6 game-category-col">
                                <div id={category} className="card category-title-container" tabIndex="1">
                                    <div className="category-title">
                                        {category}
                                    </div>
                                </div>
                            </div>)
                    }))}
                        </div>
                    </div>
                </div>

                <div className="card-content">
                        <div className="container">
                            <Link to='/quiz-landing'>
                                <button className="btn blue lighten-1 z-depth-0 play-button">Play</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameCategory;
