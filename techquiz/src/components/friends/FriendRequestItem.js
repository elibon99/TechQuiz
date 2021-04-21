import React from 'react';
import ThumbsDown from "./ThumbsDown";
import ThumbsUp from "./ThumbsUp";

const FriendRequestItem = () => {
    return(
        <div className="friend-req-container">
            <div>
                Per
            </div>

            <div className="thumbs-container">
                <ThumbsUp className="thumbs-up"/>
                <ThumbsDown className="thumbs-down"/>
            </div>
        </div>
    )
}

export default FriendRequestItem;