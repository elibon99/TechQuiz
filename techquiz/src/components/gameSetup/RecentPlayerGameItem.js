import React from 'react'


const RecentPlayerGameItem = ({opponentInfo, createFriendGame}) => {
    return(
        opponentInfo ?
            <div className="gameitem-container">
                <div className="gameitem-col">
                    {opponentInfo.opponentName}
                </div>
                <div className="gameitem-col">
                    <button className="right btn waves-effect waves-light #64b5f6 blue lighten-2" >Invite to a game</button>
                </div>
            </div>
            : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default RecentPlayerGameItem;