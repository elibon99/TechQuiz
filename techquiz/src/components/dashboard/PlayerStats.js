import React from 'react';

/**
 * This components main focus is displaying the current users player stats.
 * @param stats - the stats of the user,
 * @param winLossRatio - the win loss ratio of the user.
 * */
const PlayerStats = ({stats, winLossRatio, userName}) => {
    return(
        <div className="card profile-info-card">
            <div className="card-content">
                <h5 className="profile-info-card-title">{userName ? userName + " stats" : "Your stats"}</h5>
                <div className="row">
                    <div className="col s6 m6 l3 column-bottom-padding">
                        <div className="profile-info-stats-card-container">
                            <h5 className="profile-info-stats-number">
                                {stats.wins}
                            </h5>
                            <h6 className="profile-info-stats-title">
                                Wins
                            </h6>
                        </div>
                    </div>
                    <div className="col s6 m6 l3 column-bottom-padding">
                        <div className="profile-info-stats-card-container">
                            <h5 className="profile-info-stats-number">
                                {stats.losses}
                            </h5>
                            <h6 className="profile-info-stats-title">
                                Losses
                            </h6>
                        </div>
                    </div>
                    <div className="col s6 m6 l3 column-bottom-padding">
                        <div className="profile-info-stats-card-container">
                            <h5 className="profile-info-stats-number">
                                {winLossRatio.toFixed(2)}
                            </h5>
                            <h6 className="profile-info-stats-title">
                                Win/Loss - Ratio
                            </h6>
                        </div>
                    </div>
                    <div className="col s6 m6 l3 column-bottom-padding">
                        <div className="profile-info-stats-card-container">
                            <h5 className="profile-info-stats-number">
                                {stats.mlRating}
                            </h5>
                            <h6 className="profile-info-stats-title">
                                Multiplayer rating
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerStats;
