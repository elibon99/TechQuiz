import React from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks'


const Navbar = (props) => {
    return (
        <nav className="wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">TechQuiz</Link>
                <LoggedInLinks />
                <LoggedOutLinks/>
            </div>
        </nav>

    )
}

export default Navbar;
