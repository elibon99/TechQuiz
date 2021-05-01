import React from 'react';
import {Link, Redirect} from "react-router-dom";

const GameFinished = ({auth, whoWon, userStats, opponentCredentials, username, createGameInvitation}) => {
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
                <Link to='/'>
                    <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => createGameInvitation(opponentCredentials.userID, opponentCredentials.username)}>Rematch</button>
                </Link>
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
