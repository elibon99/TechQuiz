import React from 'react'

/**
 * This components main focus is displaying all games where it's the opponents turn.
 * @param game - the game.
 * */
const GameItemTheirTurn = ({game}) => {
    return(
        game ?
        <div className="gameitem-container">
            <div className="gameitem-col">
                {game[2].opponentName !== "" ? game[2].opponentName : "Random Player"}
            </div>
            <div className="gameitem-col">
                <button disabled className="right btn waves-effect waves-light #64b5f6 blue lighten-2">Waiting...</button>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameItemTheirTurn;
