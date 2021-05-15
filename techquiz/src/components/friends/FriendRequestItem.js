import React from 'react';
import ThumbsDown from "./ThumbsDown";
import ThumbsUp from "./ThumbsUp";
import {Link} from "react-router-dom";

const FriendRequestItem = ({request, requestID, rejectFriendRequest, acceptFriendRequest}) => {
    return(
        <div className="friend-request-container">
            <div className="friend-req-container link-to-profile-friend-req">
                <Link to={"/profile-preview/" + request.sentRequest}>
                    <div className="friend-req-name-title">
                        {request.sentReqUserName}
                    </div>
                 </Link>
                <div className="thumbs-container">
                        <ThumbsUp className="thumbs-up" acceptAction={acceptFriendRequest} requestID={requestID}/>
                        <ThumbsDown className="thumbs-down" rejectAction={rejectFriendRequest} requestID={requestID}/>
                </div>
            </div>
        </div>
    )
}

export default FriendRequestItem;
