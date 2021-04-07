import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import {Redirect} from "react-router-dom";


const Dashboard = ({stats, auth, stats2}) => {
    try {
        const placeholder = auth.uid;
        console.log(stats2[placeholder]);
        stats2 = stats2[placeholder];
        console.log(stats2, 'that was the updated playerstats') }
    catch {
        console.log('data hasnt been loaded yet. Will try again soon maybe');
    }
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
