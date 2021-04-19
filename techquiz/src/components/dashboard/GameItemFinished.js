import React from 'react'
import {Link} from "react-router-dom";

const GameItemFinished = ({game}) => {
    return(
        <div className="gameitem-container">
            <div>
                Played against {game[2].opponentName}
            </div>
            <div>
                <div>
                    <div className="game-status-title">{game[2].whoWon}</div>
                    <div className="rating">Rating 102(+2)</div>
                </div>
            </div>
            <div>
                <Link to={'/game-landing/' + game[0]}><button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-full-height">View Game</button></Link>
            </div>
        </div>
    )
}

export default GameItemFinished;
