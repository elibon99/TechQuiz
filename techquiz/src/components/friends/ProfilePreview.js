import React from 'react';
import PlayerStats from "../dashboard/PlayerStats";
import {Redirect} from "react-router-dom";


const ProfilePreview = ({friendPicURL, auth, userStat, winLossRatio, userName, addFriend, userID, isFriend, isPending, removeFriend, friendEntryID, hasSentMeRequest, requestID, acceptFriendRequest, rejectFriendRequest}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (userStat && userName) ?
            <div>
                <h5 className="page-title">{userName} profile</h5>
                <div className="container general-container">
                    <div className="row">
                        <div className="card profile-info-card">
                            <div className="card-content">
                                <div className="profile-info-container">
                                    <div className="profile-info-logo-title-container">
                                        {friendPicURL ? <img className="profile-info-pic" alt="friend-profile-pic" src={friendPicURL}/>
                                            : <i className="large material-icons">account_circle</i>}
                                        <h5>{userName}</h5>
                                    </div>
                                    <div className="profile-bio-friend-status-container">
                                        <div className="profile-preview-bio-container">
                                            <p contentEditable={true} id="userBio">
                                                I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                                                I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                                                I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                                                I am the greatest techquiz player ever. Challenge me if you dare. Tread lightly.
                                            </p>
                                        </div>
                                        {isFriend ?
                                            <div>
                                                <h5>You are friends</h5>
                                                <button className="btn waves-effect waves-light red lighten-2" onClick={() => {removeFriend(userID)}}>Remove friend</button>
                                            </div>: isPending ?
                                                <h5>Pending request...</h5> :
                                                hasSentMeRequest ?
                                                    <div className="profile-preview-friend-req-container">
                                                        <h6>{userName} has sent you a friend request</h6>
                                                        <div>
                                                            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-full-height" onClick={() => acceptFriendRequest(requestID)}>Accept</button>
                                                            <button className="btn waves-effect waves-light red lighten-2 btn-full-height" onClick={() => rejectFriendRequest(requestID)}>Reject</button>
                                                        </div>
                                                    </div> :
                                                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {addFriend(userID, userName)}}>
                                                        Add friend :)
                                                    </button>
                                        }
                                    </div>
                                </div>
                            </div>

                    </div>
                        <PlayerStats stats={userStat} winLossRatio={winLossRatio} userName={userName}/>
                </div>
            </div>
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default ProfilePreview;
