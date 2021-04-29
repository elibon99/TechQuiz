import React from 'react';
import GameItemFinished from "./GameItemFinished";

/**
 * This components main focus is displaying the finished games of the current user.
 * They are ordered by date.
 * @param finishedGames - all the finished games of the current user.
 * */
const FinishedGames = ({finishedGames}) => {
    return (
        <div className="dashboard-item-container container section">
            <h5>Finished games</h5>
            <div className="row">
                <div className="col s12 m12">
                    {finishedGames ? finishedGames.map((entry) => {
                        return (
                            <GameItemFinished game={entry} key={entry[0]}/>
                        )
                    }) : <div> You don't have any finished games. Go play some games! </div>}
                </div>
            </div>
        </div>
    )
}

export default FinishedGames;
