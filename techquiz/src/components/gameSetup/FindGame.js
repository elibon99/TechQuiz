import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from 'react-router-dom';

const FindGame = ({auth, addToQueue, restoreRedirectTo, userStats, user, matchQueue, createFriendGame, friends, setUsername, restoreRedirectToFriendGame, friendGameStatus, recentPlayers, friendsTemp}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    //console.log(matchQueue.redirectTo)

    if(matchQueue.redirectTo){
        const path = matchQueue.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }

    return(
        userStats ?
            <div><h5 className="page-title">Find a game</h5>
                <div className="container find-game-margin">
                    <button className="btn blue lighten-1 z-depth-0" onClick={() => {addToQueue(userStats.mlRating)}}>Random Match</button>
                    <QuickMatch friendsTemp={friendsTemp} setUsername={setUsername} recentPlayers={recentPlayers} friends={friends} createFriendGame={createFriendGame} friendGameStatus={friendGameStatus} restoreRedirectTo={restoreRedirectToFriendGame}/>
                </div>
            </div>:
                <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FindGame
