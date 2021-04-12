import React from 'react';

const GameVsCategoryInfo = () => {
    return(
        <div className="card-content">
            <div className="container">
                <div className="row category-selection-title">
                    <h3>Your turn</h3>
                    <h5>Choose category</h5>
                </div>
                <div className="row flex">
                    <div className="col s12 m5 player-content">
                        <i className="large material-icons">account_circle</i>
                        <h5>
                            Elias
                        </h5>
                        <h5>
                            Rating: 102
                        </h5>
                    </div>
                    <div className="col s12 m2 score-content">
                        <span>VS</span>
                    </div>
                    <div className="col s12 m5 player-content">
                        <i className="large material-icons">account_circle</i>
                        <h5>
                            Pelle
                        </h5>
                        <h5>
                            Rating: 120
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameVsCategoryInfo;