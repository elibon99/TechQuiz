import React from 'react';

const GameSetItem = ({isYourTurn}) => {
    if(isYourTurn){
        console.log("It is your turn")
    }else{
        console.log("It is not your turn")
    }
    return(
        <div className="card-content">
            <div className="container">
                <div className="card">
                <div className="row flex game-item">
                      <div className="col s12 m5 game-set-item">
                          {isYourTurn ? "Your turn" : ""}
                      </div>
                      <div className="col s12 m2 game-set-item">
                                Linux
                      </div>
                      <div className="col s12 m5 game-set-item">
                          {!isYourTurn ? "Playing" : ""}
                      </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GameSetItem;