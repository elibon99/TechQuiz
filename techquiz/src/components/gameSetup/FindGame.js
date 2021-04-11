import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from "react-router-dom";

const FindGame = ({auth, addToQueue, userStats}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
            <div className="container find-game-margin">
                <input placeholder ="Search for player" type="text" id="searchForPlayer"/>
                <button disabled={userStats === null} className="btn blue lighten-1 z-depth-0" onClick={userStats ? addToQueue(userStats.mlRating) : null}>Random Match</button>
                <QuickMatch/>
            </div>
    )
}

export default FindGame
