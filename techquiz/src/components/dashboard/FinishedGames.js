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
        <div className="card profile-info-card">
            <div className="card-content profile-info-card-content">
                <h5 className="profile-info-card-title">Finished games</h5>
                <div className="profile-info-finished-games-container">
                    {finishedGames ? finishedGames.map((entry) => {
                        return (
                            <GameItemFinished game={entry} key={entry[0]}/>
                        )
                    }) : <h6 className="profile-info-no-data-title"> You don't have any finished games. Go find a game <Link to= "/findgame"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2 "> here </button></Link>! </h6>}
                </div>
            </div>
        </div>
    )
}

export default FinishedGames;
