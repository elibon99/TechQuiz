import React from 'react';
import GameRequestItem from "./GameRequestItem";

const GameInvitations = ({gameInvitations, acceptGameInvitation, rejectGameInvitation}) => {
    return (
        <div className="dashboard-item-container container section">
            <h5>Game Invitations:</h5>
            <div className="row">
                <div className="col s12 m12">
                    {gameInvitations && Object.entries(gameInvitations).map((entry) => {
                        return <GameRequestItem key={entry[0]} invitationID={entry[0]} acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} invitation={entry[1]} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default GameInvitations;
