import React from 'react';
import {NavLink} from "react-router-dom";
import NotificationBell from "./NotificationBell";
import AccountImg from "../Notifications/AccountImg";


const LoggedInLinks = (props) => {
    return(
        <>
            <li><NavLink to='/findgame'>Find a game</NavLink></li>
            <li><NavLink to='/friends'>Friends</NavLink></li>
            <li><NavLink to='/leaderboard'>Leaderboards</NavLink></li>
            <li><a href="/signin" onClick={props.signOut}>Log out</a></li>
            <li><NotificationBell ammountOfNotifications={props.ammountOfNotifications} className="notification-bell-div"/></li>
            <li><NavLink className="profile-pic-navbar-link" to='/profile' >
                <div className="profile-pic-navbar-container">
                    {props.profile.photoURL ?  <img className="profile-pic-navbar" src={props.profile.photoURL} alt="profile-pic-navbar"/> :
                    <AccountImg className="profile-pic-navbar"/>}

                </div>

            </NavLink></li>
        </>
    )
}

export default LoggedInLinks;

