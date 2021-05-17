import React from 'react'
import {Link} from "react-router-dom";
import ThumbsUp from "../friends/ThumbsUp";
import ThumbsDown from "../friends/ThumbsDown";

const RecentPlayerGameItem = ({acceptGameInvitation, rejectGameInvitation, opponentInfo, createGameInvitation}) => {
    return(
        opponentInfo ?
            <div className="gameitem-container">
                <Link to={"/profile-preview/" + opponentInfo.opponentID} className="game-invitation-link">
                    <div className="recent-player-item-opponent-title">
                        {opponentInfo.opponentName}
                    </div>
                </Link>
                <div className="recent-player-item-btn-container">
                    {(opponentInfo && !opponentInfo.inGameWith && !opponentInfo.hasBeenInvited && !opponentInfo.iGotInvited) ?
                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn"
                            onClick={() => createGameInvitation(opponentInfo.opponentID, opponentInfo.opponentName)}>Invite to a game
                    </button>
                        : opponentInfo.hasBeenInvited ?
                        <button disabled={true} className="btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn"> Pending invitation... </button>
                            : opponentInfo.iGotInvited ? <div className="thumbs-container">
                                    <ThumbsUp className="thumbs-up" acceptAction={acceptGameInvitation} requestID={opponentInfo.invitationID}/>
                                    <ThumbsDown className="thumbs-down" rejectAction={rejectGameInvitation} requestID={opponentInfo.invitationID}/>
                                </div>
                                : opponentInfo.isMyTurn ? <Link to={'/game-landing/' + opponentInfo.gamingID}>
                                        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn"> In game. Your turn.</button>
                                    </Link>
                                    :
                        <Link to={'/game-landing/' + opponentInfo.gamingID}>
                            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn"> In game. Their turn.</button>
                        </Link> }

            </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default RecentPlayerGameItem;
