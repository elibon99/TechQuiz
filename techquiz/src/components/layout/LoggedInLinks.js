import React from 'react';
import {NavLink} from "react-router-dom";
import NotificationBell from "./NotificationBell";


const LoggedInLinks = (props) => {
    return(
        <>
            <li><NavLink to='/findgame'>Find a game</NavLink></li>
            <li><NavLink to='/friends'>Friends</NavLink></li>
            <li><NavLink to='/leaderboard'>Leaderboards</NavLink></li>
            <li><a href="/signin" onClick={props.signOut}>Log out</a></li>
            <li><NotificationBell ammountOfNotifications={props.ammountOfNotifications} className="notification-bell-div"/></li>
            <li><NavLink to='/profile' className='btn btn-floating blue lighten-1'>
                <img className="profile-pic-navbar" src={props.profile.photoURL} alt="profile-pic-navbar"/>
            </NavLink></li>
        </>
    )
}

export default LoggedInLinks;

