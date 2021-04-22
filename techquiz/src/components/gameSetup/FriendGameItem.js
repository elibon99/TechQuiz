import React from 'react'
import {Link} from "react-router-dom";

const FriendGameItem = ({friendInfo, createFriendGame}) => {
    return(
        friendInfo ?
            <div className="gameitem-container">
                <div className="gameitem-col">
                    {friendInfo.username}
                </div>
                <div className="gameitem-col">
                    {friendInfo.inGameWith ?
                        <div className="friend-game-item-container">
                        <h5 className="friend-game-item-title">You guys are in a game</h5>
                            <Link to={'/game-landing/' + friendInfo.gamingID}>
                            <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2" >View Game</button>
                            </Link>
                        </div> : <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {createFriendGame(friendInfo.userID, friendInfo.userName)}}>Play</button>
                    }

                </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FriendGameItem;
