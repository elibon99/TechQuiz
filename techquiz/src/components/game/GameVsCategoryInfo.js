import React from 'react';

const GameVsCategoryInfo = ({game, opponent, profile, userStat, hasChosenCategory}) => {
    return(
        <div className="card-content">
            <div className="container">
                <div className="row category-selection-title">
                    <h3>Your turn</h3>
                    <h5>{hasChosenCategory ? "Category is already chosen" : "Choose category"}</h5>
                </div>
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
                        <span>VS</span>
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
                        </div> : <h5>Random Player</h5>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameVsCategoryInfo;
