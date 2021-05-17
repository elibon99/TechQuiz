import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from 'react-router-dom';

const FindGame = ({acceptGameInvitation, rejectGameInvitation, createGameInvitation, auth, addToQueue, restoreRedirectTo, userStats, user, matchQueue, createFriendGame, friends, setUsername, restoreRedirectToFriendGame, friendGameStatus, recentPlayers, friendsTemp, friendSearch}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }


    if(matchQueue.redirectTo){
        const path = matchQueue.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }


    return(
        userStats ?
            <div>
                <h5 className="page-title">Find a game</h5>
                <div className="container general-container">
                    <button className="btn blue lighten-1 z-depth-0" onClick={() => {addToQueue(userStats.mlRating)}}>Random Match</button>
                    <QuickMatch acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} createGameInvitation={createGameInvitation} friendsTemp={friendsTemp} setUsername={setUsername} recentPlayers={recentPlayers} friends={friends} createFriendGame={createFriendGame} friendGameStatus={friendGameStatus} restoreRedirectTo={restoreRedirectToFriendGame}/>
                </div>
            </div>:
                <img className="loading-wheel-general-view" src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FindGame
