import React from 'react';
import GameItemFinished from "./GameItemFinished";
import {Link} from "react-router-dom";

/**
 * This components main focus is displaying the finished games of the current user.
 * They are ordered by date.
 * @param finishedGames - all the finished games of the current user.
 * */
const FinishedGames = ({finishedGames}) => {
    return (
        <div className="dashboard-item-container section">
            <h5>Finished games</h5>
            <div className="row">
                <div className="col s12 m12 profile-finished-games-col">
                    {finishedGames ? finishedGames.map((entry) => {
                        return (
                            <GameItemFinished game={entry} key={entry[0]}/>
                        )
                    }) : <h6> You don't have any finished games. Go find a game <Link to= "/findgame"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2"> here </button></Link>! </h6>}
                </div>
            </div>
        </div>
    )
}

export default FinishedGames;
