import React from 'react';
import ThumbsDown from "../friends/ThumbsDown";
import ThumbsUp from "../friends/ThumbsUp";
import {Link} from "react-router-dom";
/**
 * This components main focus is displaying all game requests/invitations to the user.
 * @param invitation - the invitation,
 * @param invitationID - the invitationID,
 * @param acceptGameInvitation - a method accepting a game invitation,
 * @param rejectGameInvitation - a method rejecting a game invitation.
 * */
const GameRequestItem = ({invitation, invitationID, acceptGameInvitation, rejectGameInvitation}) => {
    return(
        <div className="gameitem-container">
            <Link className="game-invitation-link" to={"/profile-preview/" + invitation.sentRequestID}>
                <div className="game-invitation-opponent-title">
                    {invitation.sentReqUserName}
                </div>
            </Link>

            <div className="thumbs-container">
                <ThumbsUp className="thumbs-up" acceptAction={acceptGameInvitation} requestID={invitationID}/>
                <ThumbsDown className="thumbs-down" rejectAction={rejectGameInvitation} requestID={invitationID}/>
            </div>
        </div>
    )
}

export default GameRequestItem;
