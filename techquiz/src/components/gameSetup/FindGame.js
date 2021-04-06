import React from 'react'
import QuickMatch from "./QuickMatch";
import {Redirect} from "react-router-dom";

const FindGame = ({auth}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
            <div className="container find-game-margin">
                <input placeholder ="Search for player" type="text" id="searchForPlayer"/>
                <button className="btn blue lighten-1 z-depth-0">Random Match</button>
                <QuickMatch/>
            </div>
    )
}

export default FindGame
