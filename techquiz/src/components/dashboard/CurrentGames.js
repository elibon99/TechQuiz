import React from 'react'
import GameItemYourTurn from "./GameItemYourTurn";
import GameItemTheirTurn from "./GameItemTheirTurn";
import {Link} from "react-router-dom";

/**
 * This components main focus is displaying the current games of the current user.
 * @param currentGamesYourTurn - all the active games of the current user where its the users turn,
 * @param currentGamesTheirTurn - all the active games of the current user where its NOT the users turn,
 * */
const CurrentGames = ({currentGamesYourTurn, currentGamesTheirTurn}) => {
    console.log(currentGamesYourTurn, 'cgurturn');
    return(
        <div className="dashboard-item-container">
            <div className="row current-games-container">
                <h6 className="h6-title-current-games">Your turn:</h6>
                <div className="col s12 m12 profile-current-games-col-your-turn">
                    {currentGamesYourTurn ? currentGamesYourTurn.map((entry) => {
                        return (
                                <GameItemYourTurn game={entry} key={entry[0]}/>
                            )
                    }) : <h6> You don't have any games where it's your turn. Come back later or start a new game <Link to= "/findgame"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2"> here </button></Link></h6>}
                </div>
                <h6 className="h6-title-current-games">Their turn: </h6>
                <div className="col s12 m12 profile-current-games-col-their-turn">
                    {currentGamesTheirTurn ? currentGamesTheirTurn.map((entry) => {
                        return(
                            <GameItemTheirTurn game={entry} key={entry[0]}/>
                        )
                    }) : <h6> You don't have any games where it's your opponents turn to play. </h6>
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrentGames;
