import React from 'react'
import {Link} from "react-router-dom";

const GameItemYourTurn = () => {
    return(
        <div className="gameitem-container">
                <div className="gameitem-col">
                   Per
                </div>
                <div className="gameitem-col">
                    <Link to='/game-landing'><button className="right btn waves-effect waves-light #64b5f6 blue lighten-2">Play</button></Link>
                </div>
        </div>
    )
}

export default GameItemYourTurn;
