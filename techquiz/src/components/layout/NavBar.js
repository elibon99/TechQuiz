import React from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks'


const Navbar = (props) => {
    return (
        <nav className="wrapper grey darken-3">
            <div className="nav-wrapper container">
                <Link to='/' className="brand-logo">TechQuiz</Link>
                <a href="/" className="sidenav-trigger" data-target="mobile-nav">
                    <i className="material-icons">menu</i>
                </a>

                <ul className="right hide-on-med-and-down">
                    <LoggedOutLinks/>
                    <LoggedInLinks/>
                </ul>
                <ul className="sidenav" id="mobile-nav">
                    <LoggedOutLinks/>
                    <LoggedInLinks/>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
