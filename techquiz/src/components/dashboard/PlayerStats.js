import React from 'react';

const PlayerStats = ({stats}) => {
    return(
        <div className="dashboard-item-container container section">
            <h5>Stats:</h5>
            <div className="row">
                <div className="col s12 m7">
                    Wins: {stats.wins}
                </div>
                <div className="col s12 m5">
                    Current multiplayer rating: {stats.MlRating}
                </div>
            </div>
            <div className="row">
                <div className="col s12 m7">
                    Losses: {stats.losses}
                </div>
                <div className="col s12 m5">
                    Lifetime best single score: {stats.bestSingleScore}
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12">
                    W/L-ratio: {stats.WlRatio}
                </div>
            </div>
        </div>
    )
}

export default PlayerStats;
