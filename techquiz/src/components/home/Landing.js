import React from 'react'
import {Link, Redirect} from "react-router-dom";

const Landing = ({auth}) => {
    if(auth.uid) {
        return <Redirect to="/profile"/>
    }
    return (
        <div>
            <div className="homepage-container">
                <p>
                    <span className="homepage-title-1">Welcome to </span>
                    <span className="homepage-title-2">TechQuiz</span>
                </p>
                <p className="homepage-title-3">
                    Your multiplayer tech quiz app
                </p>
            </div>
            <div className="homepage-buttons-div">
                <div className="homepage-buttons-signup">
                    Ready to play? Sign up here!
                    <Link to="/signup">
                        <button className="btn blue lighten-1 z-depth-0 homepage-sign-up-button"> Click here to sign up </button>
                    </Link>
                </div>
                <div className="homepage-buttons-signin">
                Already a user? Sign in here!
                <Link to="/signin">
                    <button className="btn blue lighten-1 z-depth-0 homepage-sign-in-button"> Click here to log in </button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;
