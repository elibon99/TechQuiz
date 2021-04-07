import React from 'react'

const GameItemTheirTurn = () => {
    return(
        <div className="gameitem-container">
            <div className="gameitem-col">
                Elsa
            </div>
            <div className="gameitem-col">
                <button disabled className="right btn waves-effect waves-light #64b5f6 blue lighten-2">Waiting...</button>
            </div>
        </div>
    )
}

export default GameItemTheirTurn;
