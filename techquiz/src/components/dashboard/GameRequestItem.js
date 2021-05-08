import React from 'react';
import ThumbsDown from "../friends/ThumbsDown";
import ThumbsUp from "../friends/ThumbsUp";
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
            <div className="game-invitation-opponent-title">
                {invitation.sentReqUserName}
            </div>

            <div className="thumbs-container">
              {/*  <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-full-height" onClick={() => acceptGameInvitation(invitationID)}>Accept</button>
                <button className="btn waves-effect waves-light red lighten-2 btn-full-height" onClick={() => rejectGameInvitation(invitationID)}>Decline</button>*/}
                <ThumbsUp className="thumbs-up" acceptAction={acceptGameInvitation} requestID={invitationID}/>
                <ThumbsDown className="thumbs-down" rejectAction={rejectGameInvitation} requestID={invitationID}/>
            </div>
        </div>
    )
}

export default GameRequestItem;
