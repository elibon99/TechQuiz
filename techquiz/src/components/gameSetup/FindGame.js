import React from 'react'
import QuickMatch from "./QuickMatch";

const FindGame = () => {
    return(
            <div className="container find-game-margin">
                <input placeholder ="Search for player" type="text" id="searchForPlayer"/>
                <button className="btn blue lighten-1 z-depth-0">Random Match</button>
                <QuickMatch/>
            </div>
    )
}

export default FindGame
