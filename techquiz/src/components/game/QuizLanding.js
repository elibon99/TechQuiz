import React from 'react';
import {Link, Redirect} from "react-router-dom";

const QuizLanding = ({auth, gameSet, gameID, startTimer ,gameSetID, localGame, selectedCategory, resetHasChosenCategory, categoriesToImg}) => {
    console.log(localGame, 'localgame')
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        (gameSet && gameID && gameSetID) ?
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="container">
                        <div className="row category-display-container">
                            {categoriesToImg && gameSet.category !== null ?
                                <div className="quiz-landing-card">
                                    <img className="category-background-image category-background-image-quiz-landing" src={categoriesToImg[gameSet.category]} alt="catSrc"/>
                                    <div>
                                         <h5>{gameSet.category}</h5>
                                    </div>
                                </div>: <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}

                        </div>
                        <div className="row">
                            <Link to={"/quiz-question/" + gameID}>
                                <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => {startTimer(gameID, gameSetID); resetHasChosenCategory(gameID)}}>Click here to begin quiz</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default QuizLanding;
