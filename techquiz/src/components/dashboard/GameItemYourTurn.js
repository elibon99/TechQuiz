import React from 'react'
import {Link} from "react-router-dom";

/**
 * This components main focus is displaying all games where it's the USERS turn.
 * @param game - the game.
 * */
const GameItemYourTurn = ({game}) => {
    console.log(game, 'game');
    return(
        game ?
        <div className="gameitem-container">
                <div className="gameitem-col">
                    {game[2].opponentName !== "" ? game[2].opponentName : "Random Player"}
                </div>
                <div className="gameitem-col">
                    <Link to={'/game-landing/' + game[0]}><button className="right btn waves-effect waves-light #64b5f6 blue lighten-2">Play</button></Link>
                </div>
        </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameItemYourTurn;
