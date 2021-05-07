import React from 'react';

/**
 * This components main focus is displaying all game requests/invitations to the user.
 * @param profile - the users profile,
 * @param userStats - the users stats
 * */
const ProfileInfo = ({setProfilePicture, profile, userStat, winLossRatio, profilePicURL}) => {
    return(
        <div className="card profile-info-card">
            <div className="card-content">
                <div className="profile-info-container">
                    <div className="profile-info-logo-title-container">

                        <label htmlFor="file-input">
                            {profilePicURL? <img className="profile-info-pic" src={profilePicURL} alt="profile-pic"/>:
                                <i className="large material-icons profile-standard-pic">account_circle</i>}
                        </label>
                        <input id="file-input" type='file'
                               onChange={(event) => setProfilePicture(event.target.files[0])}/>
                        <h5>{profile.userName}</h5>
                    </div>
                    <div className="profile-info-bio-container">
                        <p contentEditable={true} id="userBio">
                            I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                            I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                            I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                            I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
