import React from 'react';
import {NavLink} from "react-router-dom";

const LoggedOutLinks = (props) => {
    return(
        <>
            <li><NavLink to='/signin'>Login</NavLink></li>
            <li><NavLink to='/signup'>Signup</NavLink></li>
        </>
    )
}

export default LoggedOutLinks;
