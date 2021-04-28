import React from 'react';
import PlayerStats from "./PlayerStats";
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import GameInvitations from "./GameInvitations";
import {Redirect} from "react-router-dom";



/**
 * This components main focus is displaying all things regarding the current users profile.
 * @param auth - an object containing the auth info,
 * @param userStat - an object containing the userstats,
 * @param profile - an object containing the current users profile,
 * @param winLossRatio - the current users win loss ratio,
 * @param currentGamesYourTurn - all the active games of the current user where its the users turn,
 * @param currentGamesTheirTurn - all the active games of the current user where its NOT the users turn,
 * @param finishedGames - all finished games of the current user,
 * @param userName - the current users username,
 * @param gameInvitations - the current users gameInviations,
 * @param acceptGameInvitation - a method accepting a game invitation
 * @param rejectGameInvitation - a method rejecting a game invitation.
 * */
const Dashboard = ({auth, userStat, profile, winLossRatio, currentGamesYourTurn, currentGamesTheirTurn, finishedGames, userName, gameInvitations, acceptGameInvitation, rejectGameInvitation}) => {
    //console.log(gameInvitations, "your game invitation")
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
                        <div className="card">
                            <div className="card-content">
                                <PlayerStats stats={userStat} winLossRatio={winLossRatio}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-item col s12 m12">
                        <div className="card">
                            <div className="card-content">
                                <GameInvitations acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} gameInvitations={gameInvitations}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-item col s12 m12">
                        <div className="card">
                            <div className="card-content">
                                <CurrentGames currentGamesYourTurn={currentGamesYourTurn} currentGamesTheirTurn={currentGamesTheirTurn}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="dashboard-item col s12 m12">
                        <div className="card">
                            <div className="card-content">
                                <FinishedGames finishedGames={finishedGames}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>:
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default Dashboard;
