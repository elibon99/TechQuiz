import React from 'react';
import PlayerStats from "../dashboard/PlayerStats";
import {Redirect} from "react-router-dom";
import ThumbsUp from "./ThumbsUp";
import ThumbsDown from "./ThumbsDown";

const ProfilePreview = ({friendPicURL, auth, userStat, winLossRatio, userName, addFriend, userID, isFriend, isPending, removeFriend, friendEntryID, hasSentMeRequest, requestID, acceptFriendRequest, rejectFriendRequest}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }

    console.log(hasSentMeRequest, "has sent me request")
    return (
        (userStat && userName) ?
            <div className="dashboard container">
                <div className="profile-preview-top">
                    <div className="profile-preview-logo-title-container">
                        <div className="profile-preview-title-friend-status-container">
                            <h1 className="profile-preview-userName">{userName}</h1>
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

                        {friendPicURL ? <img className="friend-profile-pic" alt="friend-profile-pic" src={friendPicURL}/>
                            : <i className="large material-icons">account_circle</i>}
                    </div>



                </div>
                <div className="row">
                    Placeholder BIO I am the tech quiz god
                    <div className="dashboard-item col s12 m12">
                        <PlayerStats stats={userStat} winLossRatio={winLossRatio}/>
                    </div>
                </div>
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default ProfilePreview;
