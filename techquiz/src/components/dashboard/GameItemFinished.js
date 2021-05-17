import React from 'react'
import {Link} from "react-router-dom";

/**
 * This components main focus is displaying ONE finished game item.
 * @param game - the finished game
 * */
const GameItemFinished = ({game}) => {
    return(
        <div className="gameitem-container">
            <div className="played-against-finished-games">
                Against {game[2].opponentName}
            </div>
            <div className="finished-games-status">
                    <div className="game-status-title">{game[2].whoWon}</div>
            </div>
            <div className="btn-container">
                <Link to={'/game-landing/' + game[0]}><button className="btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn">View</button></Link>
            </div>
        </div>
    )
}

export default GameItemFinished;
