import React from 'react';
import GameSetItem from "./GameSetItem";
import GameVsInfo from "./GameVsInfo";
import {Link, Redirect} from "react-router-dom";

const GameLanding = ({auth}) => {
    console.log(auth, 'hejhejhejeh');
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
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
        </div>
    )
}

export default GameLanding;
