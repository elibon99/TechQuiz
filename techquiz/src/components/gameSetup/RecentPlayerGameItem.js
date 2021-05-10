import React from 'react'


const RecentPlayerGameItem = ({opponentInfo, createFriendGame}) => {
    return(
        opponentInfo ?
            <div className="gameitem-container">
                <div className="recent-player-item-opponent-title">
                    {opponentInfo.opponentName}
                </div>
                <div className="recent-player-item-btn-container">
                    <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2 games-btn">Invite to a game</button>
                </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default RecentPlayerGameItem;