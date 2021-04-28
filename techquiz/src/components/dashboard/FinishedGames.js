import React from 'react';
import GameItemFinished from "./GameItemFinished";

const FinishedGames = ({finishedGames}) => {
    return (
        <div className="dashboard-item-container container section">
            <h5>Finished games</h5>
            <div className="row">
                <div className="col s12 m12">
                    {finishedGames && finishedGames.map((entry) => {
                        return (
                            <GameItemFinished game={entry} key={entry[0]}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FinishedGames;
