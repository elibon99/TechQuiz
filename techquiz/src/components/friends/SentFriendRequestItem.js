import React from 'react';
import {Link} from "react-router-dom";

const SentFriendRequestItem = ({request}) => {
    return(
        request ?
        <div>
            <Link to={"/profile-preview/" + request.gotRequest}>
                <div className="friend-req-container link-to-profile-friend-req">
                    <div>
                        {request.gotReqUserName}
                    </div>
              </div>
            </Link>
        </div> : ""
    )
}

export default SentFriendRequestItem;
