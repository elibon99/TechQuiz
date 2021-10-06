import React from 'react'
import {Link} from "react-router-dom";

const FriendGameItem = ({friendInfo, createFriendGame}) => {
    return(
        friendInfo ?
            <div className="gameitem-container">
                <div className="friend-game-item-opponent-title">
                    {friendInfo.username}
                </div>
                <div className="friend-game-item-status">
                    {friendInfo.inGameWith ? <h5 className="friend-game-item-title">Active game</h5> : ""}
                </div>
                <div className="btn-container">
                    {friendInfo.inGameWith ?
                        <Link to={'/game-landing/' + friendInfo.gamingID}>
                            <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn" >View</button>
                        </Link>:
                        <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn" onClick={() => {createFriendGame(friendInfo.userID, friendInfo.username)}}>Play</button>
                        }
                </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FriendGameItem;
