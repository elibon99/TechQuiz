import React from 'react';

const FriendRequestItem = () => {
    return(
        <div className="friend-req-container">
            <div>
                Per
            </div>

            <div>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-full-height friend-req-btn">Accept</button>
                <button className="btn waves-effect waves-light red lighten-2 btn-full-height">Reject</button>
            </div>
        </div>
    )
}

export default FriendRequestItem;