import React from 'react';
import {Link, Redirect} from "react-router-dom";

const QuizLanding = ({auth, gameSet, gameID}) => {

    // if(gameSet){
    //     console.log(gameSet, "in quiz landing")
    // }

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="container">
                        <div className="row category-display-container">
                            <h5>{gameSet ? gameSet.category : ""}</h5>
                        </div>
                        <div className="row">
                            <Link to={"/quiz-question/" + gameID}>
                                <button className="btn blue lighten-1 z-depth-0 play-button">Click here to begin quiz</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizLanding;
