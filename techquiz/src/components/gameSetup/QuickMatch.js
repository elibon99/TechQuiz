import React from 'react'
import FriendGameItem from "./FriendGameItem";
import RecentPlayerGameItem from "./RecentPlayerGameItem";
import {Redirect} from "react-router-dom";

const QuickMatch = ({friends, createFriendGame, friendGameStatus, restoreRedirectTo, recentPlayers}) => {
    if(friendGameStatus.redirectTo){
        const path = friendGameStatus.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }
    return (
        <div className="card">
            <div className="card-content">
                <h4 className="quick-match-title">Quick match</h4>
                <h5>Friends</h5>
                {friends && Object.entries(friends).map((friend) => {
                    return <FriendGameItem key={friend[0]} friendInfo={friend[1]} createFriendGame={createFriendGame}/>
                })}
            </div>
            <div className="card-content">
                <h5>Recent Players</h5>
                {recentPlayers && recentPlayers.map((player) => {
                    return <RecentPlayerGameItem key={player.opponentID} opponentInfo={player}/>
                })}
            </div>
        </div>
    )

}

export default QuickMatch
