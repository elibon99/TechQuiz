import React from 'react';

const GameVsInfo = ({game, opponent, profile, userStat,score}) => {

    console.log(opponent, " opponent data")

    return(
        <div className="card-content">
            <div className="container">
            <div className="row flex">
                <div className="col s12 m5 player-content">
                    <i className="large material-icons">account_circle</i>
                    <h5>
                        {profile.userName}
                    </h5>
                    <h5>
                        Rating: {userStat.mlRating}
                    </h5>
                </div>
                <div className="col s12 m2 score-content">
                    <span>{score.userScore}-{score.opponentScore}</span>
                </div>
                <div className="col s12 m5 player-content">
                    <i className="large material-icons">account_circle</i>
                    {opponent ?
                        <div>
                        <h5>
                            {opponent.username}
                        </h5>
                        <h5>
                            Rating: {opponent.rating}
                        </h5>
                        </div> : <h5>Random player</h5>}
                </div>
            </div>
            </div>
        </div>
    )
}

export default GameVsInfo;