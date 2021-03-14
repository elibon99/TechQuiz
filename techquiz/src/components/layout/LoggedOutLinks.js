import React from 'react';
import {NavLink} from "react-router-dom";

const LoggedOutLinks = (props) => {
    return(
        <ul className="left">
            <li><NavLink to='/'>Log in</NavLink></li>
            <li><NavLink to='/'>Sign up</NavLink></li>
        </ul>
    )
}

export default LoggedOutLinks;
