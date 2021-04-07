import React from 'react';
import GameItemFinished from "./GameItemFinished";

const FinishedGames = (props) => {
    return (
        <div className="dashboard-item-container container section">
            <h5>Finished games:</h5>
            <div className="row">
                <div className="col s12 m12">
                    <GameItemFinished/>
                    <GameItemFinished/>
                </div>
            </div>
        </div>
    )
}

export default FinishedGames;