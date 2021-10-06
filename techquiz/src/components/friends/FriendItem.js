import React from 'react';
import AccountImg from "../Notifications/AccountImg";

const FriendItem = ({user}) => {
    return (
        <div className="col s6 m3 player-content">
            <div className="card card-friend-item">
                <div className="card-content friends-card-padding">
                    {user.photoURL ? <img className="profile-pic-friend-frienditem" alt="profile-pic" src={user.photoURL}/>
                    : <AccountImg className="friend-default-photo"/>}
                    <h6>{user.userName}</h6>
                </div>
            </div>
        </div>
    )
}

export default FriendItem;
