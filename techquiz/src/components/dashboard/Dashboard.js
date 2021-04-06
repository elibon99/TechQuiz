import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import {Redirect} from "react-router-dom";


const Dashboard = ({stats, auth}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
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
