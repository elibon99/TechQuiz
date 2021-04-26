import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from 'react-router-dom';

const FindGame = ({auth, addToQueue, restoreRedirectTo, userStats, user, matchQueue, createFriendGame, friends, setUsername, restoreRedirectToFriendGame, friendGameStatus, recentPlayers}) => {
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
            <div className="container find-game-margin">
                <input placeholder ="Search for player" type="text" id="searchForPlayer" onChange={e => {setUsername(e.target.value)}}/>
                <button className="btn blue lighten-1 z-depth-0" onClick={() => {addToQueue(userStats.mlRating)}}>Random Match</button>
                <QuickMatch recentPlayers={recentPlayers} friends={friends} createFriendGame={createFriendGame} friendGameStatus={friendGameStatus} restoreRedirectTo={restoreRedirectToFriendGame}/>
            </div> :
                <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FindGame
