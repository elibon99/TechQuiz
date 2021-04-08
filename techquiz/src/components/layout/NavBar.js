import React from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks'


const Navbar = (props) => {
    const links = props.auth.uid ? <LoggedInLinks signOut={props.signOut} profile={props.profile}/> : <LoggedOutLinks />;
    const brandlogo = props.auth.uid ?
        <Link to='/profile' className="brand-logo">TechQuiz</Link>:
        <Link to='/' className="brand-logo">TechQuiz</Link>

    return (
        <nav className="wrapper grey darken-3">
            <div className="nav-wrapper container">
                {brandlogo}
                <a href="#" className="sidenav-trigger" data-target="slide-out">
                    <i className="material-icons">menu</i>
                </a>

                <ul className="right hide-on-med-and-down">
                    {links}
                </ul>
                <ul className="sidenav" id="slide-out">
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
