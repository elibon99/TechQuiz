import React from 'react';
import PlayerStats from "../dashboard/PlayerStats";
import {Redirect} from "react-router-dom";

const ProfilePreview = ({auth, userStat, winLossRatio, userName}) => {

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (userStat && userName) ?
            <div className="dashboard container">
                <h1>{userName}</h1>
                <div className="row">
                    <div className="dashboard-item col s12 m12">
                        <PlayerStats stats={userStat} winLossRatio={winLossRatio}/>
                    </div>
                </div>
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default ProfilePreview;
