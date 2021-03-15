import React from 'react';
import {NavLink} from "react-router-dom";

const LoggedOutLinks = (props) => {
    return(
        <>
            <li><NavLink to='/'>Login</NavLink></li>
            <li><NavLink to='/'>Signup</NavLink></li>
        </>
    )
}

export default LoggedOutLinks;
