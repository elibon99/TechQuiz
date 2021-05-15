import React from 'react';
import {Link, Redirect} from "react-router-dom";
import ThumbsUp from "../friends/ThumbsUp";
import ThumbsDown from "../friends/ThumbsDown";

const GameFinished = ({weAreInGameID, weAreInAGame, itsMyTurn, auth, whoWon, userStats, opponentCredentials, username, createGameInvitation, opponentHasBeenInvited, iGotInvitedByOpponent, acceptGameInvitation, rejectGameInvitation, reqID}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        <div className="container game-finished-container">
            <h3 className="center">Game Finished</h3>

            <h5 className="center">{whoWon ? whoWon : ""}</h5>

            <br/>
            <br/>

            <p className="center">{username ? username : ""} rating: {userStats ? userStats.mlRating : ""}</p>
            <p className="center">{opponentCredentials ? opponentCredentials.username : ""} rating: {opponentCredentials ? opponentCredentials.rating : ""}</p>

            <div className="container game-finished-btn">
                {(!opponentHasBeenInvited && !iGotInvitedByOpponent && !weAreInAGame) ?
                        <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => createGameInvitation(opponentCredentials.userID, opponentCredentials.username)}>Invite to a rematch</button>
                    :
                    opponentHasBeenInvited ?
                    <button disabled={true} className="btn blue lighten-1 z-depth-0 play-button">Has already been invited</button>
                        : iGotInvitedByOpponent ?
                        <div className="game-finished-accept-invitation">
                            <h6> {opponentCredentials.username} invited you to a new game. Accept?</h6>
                            <div className="thumbs-container">
                                <ThumbsUp className="thumbs-up" acceptAction={acceptGameInvitation} requestID={reqID[0][0]}/>
                                <ThumbsDown className="thumbs-down" rejectAction={rejectGameInvitation} requestID={reqID[0][0]}/>
                            </div>
                        </div>
                        : itsMyTurn ? <Link to={'/game-landing/' + weAreInGameID}>
                            <button className="btn blue lighten-1 z-depth-0 play-button"> In game. Your turn.</button>
                        </Link> : <Link to={'/game-landing/' + weAreInGameID}>
                            <button className="btn blue lighten-1 z-depth-0 play-button"> In game. Their turn.</button>
                        </Link>
                }
            </div>
            <div className="container game-finished-btn">
                <Link to='/'>
                    <button className="btn blue lighten-1 z-depth-0 play-button">Return to your profile</button>
                </Link>
            </div>
        </div>
    )
}

export default GameFinished;
