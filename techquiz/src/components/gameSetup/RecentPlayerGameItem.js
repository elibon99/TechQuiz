import React from 'react'
import {Link} from "react-router-dom";
import ThumbsUp from "../friends/ThumbsUp";
import ThumbsDown from "../friends/ThumbsDown";

const RecentPlayerGameItem = ({acceptGameInvitation, rejectGameInvitation, opponentInfo, createGameInvitation}) => {
    return(
        opponentInfo ?
            <div className="gameitem-container">
                <div className="gameitem-col">
                    {opponentInfo.opponentName}
                </div>
                <div className="gameitem-col">
                    {(opponentInfo && !opponentInfo.inGameWith && !opponentInfo.hasBeenInvited && !opponentInfo.iGotInvited) ?
                    <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2"
                            onClick={() => createGameInvitation(opponentInfo.opponentID, opponentInfo.opponentName)}>Invite to a game
                    </button>
                        : opponentInfo.hasBeenInvited ?
                        <button disabled="true" className="right btn waves-effect waves-light #64b5f6 blue lighten-2"> Pending game invitation... </button>
                            : opponentInfo.iGotInvited ? <div className="thumbs-container right">
                                    <ThumbsUp className="thumbs-up" acceptAction={acceptGameInvitation} requestID={opponentInfo.invitationID}/>
                                    <ThumbsDown className="thumbs-down" rejectAction={rejectGameInvitation} requestID={opponentInfo.invitationID}/>
                                </div>
                                : opponentInfo.isMyTurn ? <Link to={'/game-landing/' + opponentInfo.gamingID}>
                                        <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2"> In a game. Your turn.</button>
                                    </Link>
                                    :
                        <Link to={'/game-landing/' + opponentInfo.gamingID}>
                            <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2"> In a game. Their turn.</button>
                        </Link> }
                </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default RecentPlayerGameItem;
