import React from 'react';
import {Link, Redirect} from "react-router-dom";


const QuizLanding = ({auth, gameSet, userShouldSelectCategory, gameID, startTimer ,gameSetID, localGame, hasForfitted, selectedCategory, resetHasChosenCategory, categoriesToImg, isYourTurn, hasChosenCategory}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    if(isYourTurn !== null){

        if(isYourTurn === false){
            return <Redirect to={"/game-landing/" + gameID}/>
        }
    }

    if(gameSet){
        if(gameSet.gameID === gameID && gameSet.hasBeenAnsweredBy >= 1 && !userShouldSelectCategory){
            if(hasForfitted){
                return <Redirect to={"/game-landing/" + gameID}/>
            }
        }

    }

    return(
        (gameSet && gameID && gameSetID) ?
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="container">
                        <div className="row category-display-container">
                            {categoriesToImg && gameSet.category ?
                                <div className="quiz-landing-card">
                                    <img className="category-background-image category-background-image-quiz-landing" src={categoriesToImg[gameSet.category]} alt="catSrc"/>
                                    <div>
                                         <h5>{gameSet.category}</h5>
                                    </div>
                                </div>: <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}

                        </div>
                        <div className="row">
                            <Link to={"/quiz-question/" + gameID}>
                                <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => {startTimer(gameID, gameSetID); resetHasChosenCategory(gameID);}}>Click here to begin quiz</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <img className='loading-wheel-general-view' src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )

}

export default QuizLanding;
