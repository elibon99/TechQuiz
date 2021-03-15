import React from 'react';

const GameSetItem = () => {
    return(
        <div className="container">
            <div className="row flex">
                <div className="col s12 m12">
                    <div className="row game-item">
                        <div className="col s12 m5">
                            Your Turn
                        </div>
                        <div className="col s12 m2">
                            Linux
                        </div>
                        <div className="col s12 m5">
                            Waiting
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSetItem;