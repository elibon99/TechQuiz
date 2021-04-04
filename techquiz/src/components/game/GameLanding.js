import React from 'react';
import GameSetItem from "./GameSetItem";
import GameVsInfo from "./GameVsInfo";

const GameLanding = (props) => {
    return(
        <div className="container">
            <div className="card game-landing-container">
                <GameVsInfo/>
                <GameSetItem/>
                <div className="row">
                    <div className="container">
                    <div className="col s12 m12">
                        <button className="btn blue lighten-1 z-depth-0 play-button">Play</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameLanding;