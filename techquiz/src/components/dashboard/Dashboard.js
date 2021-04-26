import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import {Redirect} from "react-router-dom";




const Dashboard = ({auth, userStat, profile, winLossRatio, currentGamesYourTurn, currentGamesTheirTurn, finishedGames, userName}) => {

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (userStat && profile) ?
            <div>
                <h5 className="page-title">Your Profile</h5>
            <div className="dashboard container find-game-margin">
                <h4>{profile.userName}</h4>
                <div className="row">
                    <div className="dashboard-item col s12 m12">
                        <PlayerStats stats={userStat} winLossRatio={winLossRatio}/>
                    </div>
                    <div className="dashboard-item col s12 m12">
                        <CurrentGames currentGamesYourTurn={currentGamesYourTurn} currentGamesTheirTurn={currentGamesTheirTurn}/>
                    </div>
                </div>
                <div className="row">
                    <div className="dashboard-item col s12 m12">
                        <FinishedGames finishedGames={finishedGames}/>
                    </div>
                </div>
            </div>
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default Dashboard;
