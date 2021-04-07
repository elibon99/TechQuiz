import React from 'react'
import GameItemYourTurn from "./GameItemYourTurn";
import GameItemTheirTurn from "./GameItemTheirTurn";

const CurrentGames = () => {
    return(
        <div className="dashboard-item-container container section">
            <h5>Current Games:</h5>
            <div className="row">
                <div className="col s12 m5">
                    Your turn:
                    <GameItemYourTurn/>
                    <GameItemYourTurn/>
                </div>
                <div className="col s12 m5 offset-m2">
                    Their turn:
                    <GameItemTheirTurn/>
                </div>
            </div>
        </div>
    )
}

export default CurrentGames;
