import React from 'react';

const FriendItem = ({friendList}) => {
    return (
        <div className="col s12 m3 player-content">
            <div className="card">
                <div className="card-content friends-card-padding">
                    <i className="medium material-icons">account_circle</i>
                    <h5>Bony</h5>
                </div>
            </div>
        </div>
    )
}

export default FriendItem;
