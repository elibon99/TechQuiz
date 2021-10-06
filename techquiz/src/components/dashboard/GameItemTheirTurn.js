import React from 'react'

/**
 * This components main focus is displaying all games where it's the opponents turn.
 * @param game - the game.
 * */
const GameItemTheirTurn = ({game}) => {
    return(
        game ?
        <div className="gameitem-container">
            <div className="active-game-opponent-title">
                {game[2].opponentName !== "" ? game[2].opponentName : "Random Player"}
            </div>
            <div className="active-games-btn-container">
                <button disabled className="btn waves-effect waves-light #64b5f6 lighten-2 games-btn">Waiting...</button>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameItemTheirTurn;
