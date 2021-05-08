import React from 'react';

/**
 * This components main focus is displaying all game requests/invitations to the user.
 * @param profile - the users profile,
 * @param userStats - the users stats
 * */
const ProfileInfo = ({setProfilePicture, profile, profilePicURL}) => {
    return(
        profile ?
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
                        {profile.biography}
                    </div>
                </div>
            </div>
        </div> :  <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default ProfileInfo;
