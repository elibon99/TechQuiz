import React from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks'


const Navbar = (props) => {
    const links = props.auth.uid ? <LoggedInLinks signOut={props.signOut}/> : <LoggedOutLinks />;
    return (
        <nav className="wrapper grey darken-3">
            <div className="nav-wrapper container">
                <Link to='/' className="brand-logo">TechQuiz</Link>
                <a href="/" className="sidenav-trigger" data-target="mobile-nav">
                    <i className="material-icons">menu</i>
                </a>

                <ul className="right hide-on-med-and-down">
                    {links}
                </ul>
                <ul className="sidenav" id="mobile-nav">
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
