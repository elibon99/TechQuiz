import React from 'react';
import PlayerStats from "./PlayerStats";

/**
 * This components main focus is displaying all game requests/invitations to the user.
 * @param profile - the users profile,
 * @param userStats - the users stats
 * */
const ProfileInfo = ({profile, userStat, winLossRatio}) => {
    return(
        <div>
            <div className="profile-info-stats-container">
                <div className="profile-logo-title-container">
                    <i className="large material-icons" onClick={() => {console.log('hello')}}>account_circle</i>
                    <h4>{profile.userName}</h4>
                </div>
                <div className="profile-stats-container">
                    <div className="profile-stats-content">
                        <h6>
                            Wins
                        </h6>
                        <h6>
                            {userStat.wins}
                        </h6>
                    </div>
                    <div className="profile-stats-content">
                        <h6>
                            Losses
                        </h6>
                        <h6>
                            {userStat.losses}
                        </h6>
                    </div>
                    <div className="profile-stats-content">
                        <h6>
                            W/L - ratio
                        </h6>
                        <h6>
                            {winLossRatio}
                        </h6>
                    </div>
                </div>
                <div className="profile-stats-container-ratings">
                    <div className="profile-stats-content">
                        <h6>
                            Multiplayer Rating
                        </h6>
                        <h6>
                            {userStat.mlRating}
                        </h6>
                    </div>
                    <div className="profile-stats-content">
                        <h6>
                            Singleplayer Score
                        </h6>
                        <h6>
                            9999
                        </h6>
                    </div>
                </div>
            </div>
            <div>
                <p contentEditable={true} id="userBio">
                    I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                </p>
            </div>
        </div>
    )
}

export default ProfileInfo;
