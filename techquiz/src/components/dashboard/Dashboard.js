import React from 'react';
import CurrentGames from "./CurrentGames";
import FinishedGames from "./FinishedGames";
import GameInvitations from "./GameInvitations";
import {Redirect} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import PlayerStats from "./PlayerStats";

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
 * @param gameInvitations - the current users gameInvitations,
 * @param acceptGameInvitation - a method accepting a game invitation
 * @param rejectGameInvitation - a method rejecting a game invitation.
 * */
const Dashboard = ({profileInfoKey, setUserBiography, profilePicURL, setProfilePicture, auth, userStat, profile, winLossRatio, currentGamesYourTurn, currentGamesTheirTurn, finishedGames, userName, gameInvitations, acceptGameInvitation, rejectGameInvitation}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (userStat && profile) ?
            <div>
                <h5 className="page-title">Your Profile</h5>
                <div className="general-container container">
                    <div className="row">
                        <ProfileInfo key={profileInfoKey} setUserBiography={setUserBiography} profilePicURL={profilePicURL} setProfilePicture={setProfilePicture} profile={profile} userStat={userStat} winLossRatio={winLossRatio}/>
                        <PlayerStats stats={userStat} winLossRatio={winLossRatio}/>

                        <div className="col s12 m12 l12 xl3 column-zero-left-padding padding profile-info-padding-small-screens">
                            <GameInvitations acceptGameInvitation={acceptGameInvitation} rejectGameInvitation={rejectGameInvitation} gameInvitations={gameInvitations}/>
                        </div>
                        <div className="col s12 m12 l12 xl4 column-zero-left-padding profile-info-padding-small-screens">
                            <CurrentGames currentGamesYourTurn={currentGamesYourTurn} currentGamesTheirTurn={currentGamesTheirTurn}/>
                        </div>
                        <div className="col s12 m12 l12 xl5 column-zero-right-padding profile-info-padding-small-screens">
                            <FinishedGames finishedGames={finishedGames}/>
                        </div>


                    </div>
                </div>
            </div>:
            <img className='loading-wheel-general-view' src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default Dashboard;
