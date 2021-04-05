import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";


const Dashboard = ({stats}) => {
    console.log(stats.wins);
    return (
        <div className="dashboard container">
            <h1>Adam Svensson</h1>
            <div className="row">
                <div className="dashboard-item col s12 m12">
                    <PlayerStats stats={stats}/>
                </div>
                <div className="dashboard-item col s12 m12">
                    <CurrentGames/>
                </div>
            </div>
            <div className="row">
                <div className="dashboard-item col s12 m12">
                    <FinishedGames/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
