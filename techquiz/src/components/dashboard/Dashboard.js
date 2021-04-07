import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import {Redirect} from "react-router-dom";




const Dashboard = ({auth, userStat, profile}) => {

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        userStat ?
            <div className="dashboard container">
                <h1>{profile.userName}</h1>
                <div className="row">
                    <div className="dashboard-item col s12 m12">
                        <PlayerStats stats={userStat}/>
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
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default Dashboard;
