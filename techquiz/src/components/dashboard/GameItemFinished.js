import React from 'react'

const GameItemFinished = (props) => {
    return(
        <div className="gameitem-container">
            <div className="gameitem-col">
                Played against Adam
            </div>
            <div className="gameitem-col">
                <div className="right">
                    <div className="game-status-title">You won!</div>
                    <div className="rating">Rating 102(+2)</div>
                </div>
            </div>
        </div>
    )
}

export default GameItemFinished;
