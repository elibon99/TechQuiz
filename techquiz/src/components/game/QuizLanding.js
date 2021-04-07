import React from 'react';
import {Link, Redirect} from "react-router-dom";

const QuizLanding = ({auth}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        <div className="container">
            <div className="card-content">
                <div className="row category-display-container">
                    <h5>Linux</h5>
                </div>
                <div className="row">
                    <Link to="/quiz-question">
                        <button className="btn blue lighten-1 z-depth-0 play-button">Click here to begin quiz</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuizLanding;
