import React from 'react';

const PlayerStats = (props) => {
    return(
        <div className="container section">
            <div className="row">
                <div className="col s12 m6">
                    Wins: 26
                </div>
                <div className="col s12 m6">
                    Current multiplayer rating: 102
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12">
                    Losses: 4
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    W/L-ration: 6.5
                </div>
                <div className="col s12 m6">
                    Lifetime best single score: 5
                </div>
            </div>
        </div>
    )
}

export default PlayerStats;