import React from 'react';

const FriendItem = ({user}) => {
    return (
        <div className="col s12 m3 player-content">
            <div className="card card-friend-item">
                <div className="card-content friends-card-padding">
                    <i className="medium material-icons">account_circle</i>
                    <h6>{user.userName}</h6>
                </div>
            </div>
        </div>
    )
}

export default FriendItem;