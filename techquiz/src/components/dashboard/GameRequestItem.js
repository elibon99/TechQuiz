import React from 'react';

const GameRequestItem = ({invitation, invitationID, acceptGameInvitation, rejectGameInvitation}) => {
    return(
        <div className="friend-req-container">
            <div>
                {invitation.sentReqUserName} would like to start a game against you
            </div>

            <div className="thumbs-container">
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-full-height" onClick={() => acceptGameInvitation(invitationID)}>Accept</button>
                <button className="btn waves-effect waves-light red lighten-2 btn-full-height" onClick={() => rejectGameInvitation(invitationID)}>Decline</button>
            </div>
        </div>
    )
}

export default GameRequestItem;