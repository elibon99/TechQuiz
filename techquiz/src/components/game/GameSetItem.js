import React from 'react';

const GameSetItem = () => {
    return(
        <div className="card-content">
            <div className="container">
                <div className="card">
                <div className="row flex game-item">
                      <div className="col s12 m5 game-set-item">
                                Your Turn
                      </div>
                      <div className="col s12 m2 game-set-item">
                                Linux
                      </div>
                      <div className="col s12 m5 game-set-item">
                                Waiting
                      </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GameSetItem;