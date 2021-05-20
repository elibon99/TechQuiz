import React from 'react';
import AccountImg from "../Notifications/AccountImg";

const GameVsCategoryInfo = ({game, opponent, profile, userStat, hasChosenCategory}) => {
    return(
        profile ?
            <div className="container">
                <div className="row category-selection-title">
                    <h3 className="choose-category-title">YOUR TURN</h3>
                    <h5 className="category-has-chosen-or-not-title">{hasChosenCategory ? "Category is already chosen" : "Choose category"}</h5>
                </div>
                <div className="row flex">
                    <div className="col s4 m4 player-content">
                        {profile.photoURL? <img className="profile-info-pic" src={profile.photoURL} alt="profile-pic"/>:
                            <AccountImg className="default-photo"/>}
                        <h5>
                            {profile.userName}
                        </h5>
                        <h5>
                            Rating: {userStat.mlRating}
                        </h5>
                    </div>
                    <div className="col s4 m4 score-content">
                        <span>VS</span>
                    </div>
                    <div className="col s4 m4 player-content">
                        {opponent && opponent.photoURL ? <img className="profile-info-pic" src={opponent.photoURL} alt="profile-pic"/>:
                            <AccountImg className="default-photo"/>}
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
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameVsCategoryInfo;
