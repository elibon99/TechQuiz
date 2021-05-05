import React from 'react';
import GameRequestItem from "./GameRequestItem";

/**
 * This components main focus is displaying the game invitations of the current user.
 * @param gameInvitations - all the game invitations of the current user,
 * @param acceptGameInvitation - a method accepting a game invitation,
 * @param rejectGameInvitation - a method rejecting a game invitatioin.
 * */
const GameInvitations = ({gameInvitations, acceptGameInvitation, rejectGameInvitation}) => {
    return (
        <div className="dashboard-item-container section">
            <h5>Game Invitations</h5>
            <div className="row">
                <div className="col s12 m12">
                    {gameInvitations ? Object.entries(gameInvitations).map((entry) => {
                        return <GameRequestItem key={entry[0]} invitationID={entry[0]} acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} invitation={entry[1]} />
                    }) : <h6>You don't have any game invitations at the moment</h6>}
                </div>
            </div>
        </div>
    )
}

export default GameInvitations;
