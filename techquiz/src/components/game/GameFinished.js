import React from 'react';
import {Link, Redirect} from "react-router-dom";
import ThumbsUp from "../friends/ThumbsUp";
import ThumbsDown from "../friends/ThumbsDown";
import Trophy from "./Trophy";

const GameFinished = ({weAreInGameID, weAreInAGame, itsMyTurn, auth, whoWon, userStats, opponentCredentials, username, createGameInvitation, opponentHasBeenInvited, iGotInvitedByOpponent, acceptGameInvitation, rejectGameInvitation, reqID}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        <div>
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="game-finished-container">
                    <h3 className="game-finished-title">GAME FINISHED</h3>

                    <div className="who-won-container">
                        <Trophy className="trophy"/>
                        <div className="game-who-won-text">{whoWon ? whoWon : ""}</div>
                    </div>
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
                                <div className="gameitem-container">
                                    <div className="game-invitation-text"> {opponentCredentials.username} invited you to a new game. Accept?</div>
                                    <div className="thumbs-container thumbs-container-game-invitation">
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
                </div>
            </div>

        </div>
        </div>
    )
}

export default GameFinished;
