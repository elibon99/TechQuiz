import React from 'react';
import ThumbsDown from "./ThumbsDown";
import ThumbsUp from "./ThumbsUp";
import {Link} from "react-router-dom";

const FriendRequestItem = ({request, requestID, rejectFriendRequest, acceptFriendRequest}) => {
    return(
        <div>
            <div className="friend-req-container link-to-profile-friend-req">
                <Link to={"/profile-preview/" + request.sentRequest}>
                    <div className="friend-req-name-title">
                        {request.sentReqUserName}
                    </div>
                 </Link>
                <div className="thumbs-container">
                    <button onClick={() => acceptFriendRequest(requestID)}>
                        <ThumbsUp className="thumbs-up"/>
                    </button>
                    <button onClick={() => rejectFriendRequest(requestID)}>
                        <ThumbsDown className="thumbs-down"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FriendRequestItem;
