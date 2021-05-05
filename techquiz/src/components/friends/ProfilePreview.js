import React from 'react';
import PlayerStats from "../dashboard/PlayerStats";
import {Redirect} from "react-router-dom";

const ProfilePreview = ({friendPicURL, auth, userStat, winLossRatio, userName, addFriend, userID, isFriend, isPending, removeFriend, friendEntryID}) => {

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (userStat && userName) ?
            <div className="dashboard container">
                <div className="profile-preview-top">
                    <img className="friend-profile-pic" src={friendPicURL} alt="friend-profile-pic"/>
                    <h1 className="profile-preview-userName">{userName}</h1>
                    {isFriend ?
                        <div>
                            <h5>You are friends</h5>
                            <button onClick={() => {removeFriend(userID)}}>Remove friend</button>
                        </div>: isPending ?
                        <h5>Pending request</h5> :
                        <button onClick={() => {addFriend(userID, userName)}}>
                            Add friend :)
                        </button>
                    }
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
