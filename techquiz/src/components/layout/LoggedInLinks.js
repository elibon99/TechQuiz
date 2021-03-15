import React from 'react';
import {NavLink} from "react-router-dom";


const LoggedInLinks = (props) => {
    return(
        <>
            <li><NavLink to='/'>Find a game</NavLink></li>
            <li><NavLink to='/leaderboard'>Leaderboards</NavLink></li>
            <li><NavLink to='/'>Log out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-1'>AS</NavLink></li>
        </>
    )
}

export default LoggedInLinks;