import React from 'react';
import {Link} from "react-router-dom";

const QuizLanding = () => {
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
