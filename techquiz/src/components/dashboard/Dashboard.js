import React from 'react';
import PlayerStats from "./PlayerStats";


const Dashboard = (props) => {
    return (
        <div className="dashboard container">
            <h1>Adam Svensson</h1>
            <div className="row">
                <div className="dashboard-item col s12 m12">
                    <PlayerStats/>
                </div>
                <div className="dashboard-item col s12 m12">
                    Current Games
                </div>
            </div>
        </div>
    )
}

export default Dashboard;