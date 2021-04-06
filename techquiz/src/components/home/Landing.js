import React from 'react'
import {Redirect} from "react-router-dom";

const Landing = ({auth}) => {
    if(auth.uid) {
        return <Redirect to="/profile"/>
    }
    return (
        <div className="homepage-container">
            <p>
                <span className="homepage-title-1">Welcome to </span>
                <span className="homepage-title-2">TechQuiz</span>
            </p>
            <p className="homepage-title-3">
                Your multiplayer tech quiz app
            </p>
        </div>
    )
}

export default Landing;
