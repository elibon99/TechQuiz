import React from 'react'
import GameItemYourTurn from "./GameItemYourTurn";
import GameItemTheirTurn from "./GameItemTheirTurn";

/**
 * This components main focus is displaying the current games of the current user.
 * @param currentGamesYourTurn - all the active games of the current user where its the users turn,
 * @param currentGamesTheirTurn - all the active games of the current user where its NOT the users turn,
 * */
const CurrentGames = ({currentGamesYourTurn, currentGamesTheirTurn}) => {
    return(
        <div className="dashboard-item-container container section">
            <h5>Current Games</h5>
            <div className="row">
                <div className="col s12 m5 profile-current-games-col">
                    Your turn:
                    {currentGamesYourTurn && currentGamesYourTurn.map((entry) => {
                        return (
                                <GameItemYourTurn game={entry} key={entry[0]}/>
                            )
                    })}

                </div>
                <div className="col s12 m5 offset-m2 profile-current-games-col">
                    Their turn:
                    {currentGamesTheirTurn && currentGamesTheirTurn.map((entry) => {
                        return(
                            <GameItemTheirTurn game={entry} key={entry[0]}/>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrentGames;
