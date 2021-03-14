import React from 'react';
import {Link} from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";


const Navbar = (props) => {
    return (
        <nav className="wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="logo">TechQuiz</Link>
                <LoggedInLinks />
            </div>
        </nav>

    )
}

export default Navbar;