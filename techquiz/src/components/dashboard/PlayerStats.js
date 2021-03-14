import React from 'react';

const PlayerStats = (props) => {
    return(
        <div className="dashboard-item-container container section">
            <h5>Stats:</h5>
            <div className="row">
                <div className="col s12 m7">
                    Wins: 26
                </div>
                <div className="col s12 m5">
                    Current multiplayer rating: 102
                </div>
            </div>
            <div className="row">
                <div className="col s12 m7">
                    Losses: 4
                </div>
                <div className="col s12 m5">
                    Lifetime best single score: 5
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12">
                    W/L-ratio: 6.5
                </div>
            </div>
        </div>
    )
}

export default PlayerStats;
