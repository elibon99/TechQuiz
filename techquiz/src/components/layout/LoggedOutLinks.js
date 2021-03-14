import React from 'react';
import {NavLink} from "react-router-dom";

const LoggedOutLinks = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/'>Login</NavLink></li>
            <li><NavLink to='/'>Signup</NavLink></li>
        </ul>
    )
}

export default LoggedOutLinks;
