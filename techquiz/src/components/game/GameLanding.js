import React from 'react';
import GameSetItem from "./GameSetItem";
import GameVsInfo from "./GameVsInfo";
import {Link, Redirect} from "react-router-dom";

const GameLanding = ({auth, game}) => {
    //console.log(auth, 'hejhejhejeh');
    console.log(game)
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        game ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsInfo/>
                <GameSetItem/>
                <div className="card-content">
                    <div className="container">
                        <Link to='/choose-category'>
                            <button className="btn blue lighten-1 z-depth-0 play-button">Play</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> :
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>

    )
}

export default GameLanding;
