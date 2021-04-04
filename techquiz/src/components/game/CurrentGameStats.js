import React from 'react';
import CurrentGameSetItem from "./CurrentGameSetItem";
import GameVsInfo from "./GameVsInfo";
import {Link} from "react-router-dom";

const CurrentGameStats = (props) => {
    return(
        <div className="container">
            <div className="card game-landing-container">
                <GameVsInfo/>
                <CurrentGameSetItem/>
                <div className="row">
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

export default CurrentGameStats;
