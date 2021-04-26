import React from 'react'
import FriendGameItem from "./FriendGameItem";
import RecentPlayerGameItem from "./RecentPlayerGameItem";
import {Link, Redirect} from "react-router-dom";

const QuickMatch = ({friends, createFriendGame, friendGameStatus, restoreRedirectTo, recentPlayers, setUsername, friendsTemp}) => {
    if(friendGameStatus.redirectTo){
        const path = friendGameStatus.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }
    return (
        <div>
            <div className="card card-quick-match">
                <div className="card-content">
                    <h5>Friends</h5>
                    {friendsTemp ? <input placeholder ="Search for player" type="text" id="searchForPlayer" onChange={e => {setUsername(e.target.value)}}/> : null}
                    {friends ?
                        Object.entries(friends).map((friend) => {
                            return <FriendGameItem key={friend[0]} friendInfo={friend[1]} createFriendGame={createFriendGame}/>
                        }) : friendsTemp === null ? <h6>You haven't added any friends. Go to the <Link to= "/friends"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2"> friends </button></Link> page and make some friends!</h6>
                            : <div>Couldn't find this player</div> }
                </div>
            </div>
            <div className="card card-quick-match">
                <div className="card-content">
                    <h5>Recent Players</h5>
                    {recentPlayers.length !== 0 ? recentPlayers.map((player) => {
                            return <RecentPlayerGameItem key={player.opponentID} opponentInfo={player}/>
                        }) :
                        <h6>You don't have any recent players. Press the <span className="text-title-recentplayers">Random Match</span> button at the top of this page to find a game against a random opponent!</h6>

                    }
                </div>
            </div>
        </div>
    )

}

export default QuickMatch
