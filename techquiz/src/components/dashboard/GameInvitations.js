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
        <div className="card profile-info-card">
            <div className="card-content profile-info-card-content">
                <h5 className="profile-info-card-title">Game Invitations</h5>
                <div className="profile-info-game-invitations-container">
                    <div>
                        {gameInvitations ? Object.entries(gameInvitations).map((entry) => {
                            return <GameRequestItem key={entry[0]} invitationID={entry[0]} acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} invitation={entry[1]} />
                        }) : <h6 className="profile-info-no-data-title">You don't have any incoming game invitations at the moment</h6>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GameInvitations;
