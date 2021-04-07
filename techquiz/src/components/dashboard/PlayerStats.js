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
                        Current multiplayer rating: {stats.mlRating}
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m7">
                        Losses: {stats.losses}
                    </div>
                    <div className="col s12 m5">
                        Lifetime best single score: {stats.slScore}
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m12" title={"Your Win / Loss ratio is your expected amount of wins per loss"}>
                        W/L-ratio: {stats.wlRatio}
                    </div>
                </div>
            </div>
    )
}

export default PlayerStats;
