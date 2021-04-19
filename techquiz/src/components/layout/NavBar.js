import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks'
import M from 'materialize-css';



const Navbar = (props) => {
    const links = props.auth.uid ? <LoggedInLinks signOut={props.signOut} profile={props.profile} id={props.auth.uid}/> : <LoggedOutLinks />;
    const brandlogo = props.auth.uid ?
        <Link to={'/profile/' + props.auth.uid} className="brand-logo">TechQuiz</Link>:
        <Link to='/' className="brand-logo">TechQuiz</Link>

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }, [])


    return (
        <nav className="wrapper grey darken-3">
            <div className="nav-wrapper container">
                {brandlogo}
                <a href="/" className="sidenav-trigger" data-target="mobile-demo">
                    <i className="material-icons">menu</i>
                </a>

                <ul className="right hide-on-med-and-down">
                    {links}
                </ul>
                <ul className="sidenav sidenav-close" id="mobile-demo">
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
