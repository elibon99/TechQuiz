import React from 'react';

const GameVsInfo = ({game, opponent, profile, userStat,score}) => {

    return(
        (profile && opponent) ?
        <div className="card-content">
            <div className="container">
            <div className="row flex">
                <div className="col s12 m5 player-content">
                    {profile.photoURL? <img className="profile-info-pic" src={profile.photoURL} alt="profile-pic"/>:
                        <i className="large material-icons profile-standard-pic">account_circle</i>}
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
                    {opponent.photoURL ? <img className="profile-info-pic" src={opponent.photoURL} alt="profile-pic"/>:
                        <i className="large material-icons profile-standard-pic">account_circle</i>}
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
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameVsInfo;
