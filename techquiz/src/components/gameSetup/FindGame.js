import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from "react-router-dom";

const FindGame = ({auth, addToQueue, userStats}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        userStats ?
            <div className="container find-game-margin">
                <input placeholder ="Search for player" type="text" id="searchForPlayer"/>
                <button className="btn blue lighten-1 z-depth-0" onClick={() => addToQueue(userStats.mlRating)}>Random Match</button>
                <QuickMatch/>
            </div> :
                <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default FindGame
