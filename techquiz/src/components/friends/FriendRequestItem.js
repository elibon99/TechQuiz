import React from 'react';
import ThumbsDown from "./ThumbsDown";
import ThumbsUp from "./ThumbsUp";

const FriendRequestItem = ({request, requestID, rejectFriendRequest, acceptFriendRequest}) => {
    return(
        <div className="friend-req-container">
            <div>
                {request.sentReqUserName}
            </div>

            <div className="thumbs-container">
                <button onClick={() => acceptFriendRequest(requestID)}>
                    <ThumbsUp className="thumbs-up"/>
                </button>
                <button onClick={() => rejectFriendRequest(requestID)}>
                    <ThumbsDown className="thumbs-down"/>
                </button>
            </div>
        </div>
    )
}

export default FriendRequestItem;
