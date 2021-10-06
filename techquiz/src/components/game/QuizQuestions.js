import React from 'react';
import {Prompt, Redirect} from "react-router-dom";

const QuizQuestions = ({auth, gameSet, verifyQuestion, gameSetID, gameID, game, restoreRedirectTo, timer, stopTimer, isYourTurn}) => {

    if(game.redirectTo){
        const path = game.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }


    const mouseDownHandler = (event) => {
        if(event.button === 1 || event.button === 2 || event.button === 0){
            stopTimer();
            verifyQuestion(gameID, event.target.id, gameSetID);
        }
    }

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    if(isYourTurn !== null){
        if(isYourTurn === false){
            return <Redirect to={"/game-landing/" + gameID}/>
        }
    }

    return(
        <div className="container">
            <Prompt
                when={true}
                message={(location, action) =>{
                    return `Are you sure you want to leave the game. You will receive 0 points for this gameset ${location.pathname}`}
                }
            />
            <div className="card-content">
                <div className="row answer-display-container">
                    <div className="col s6 m6"><h6 className="left">Current Score: {gameSet ? gameSet.score : ""}</h6></div>
                    <div className="col s6 m6"><h6 className="right">Question : {(gameSet && game.redirectTo === null) ? gameSet.activeQuestion +1 : ""}/3</h6></div>
                    <div className="col s12 m12">
                        <p className="question-text">{(gameSet && game.redirectTo === null)? gameSet.questions.resp[gameSet.activeQuestion].question : ""}</p>
                    </div>
                </div>
                <div className="row">
                    <p className="center">{timer ? timer : "Time's up"}</p>
                </div>
                <div className="row flex">
                    {gameSet && (game.redirectTo === null) && Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers).sort((entry1, entry2) => {
                        return entry1[0] > entry2[0] ? 1 : -1 ;
                    }).map((entry => {
                        return (
                            entry[1] ?
                            <div key={entry[0]} className="col s6 m6">
                                <div id={entry[0]} onClick={mouseDownHandler} className="card category-title-container" >
                                    <div id={entry[0]} className="category-title">
                                        {entry[1]}
                                    </div>
                                </div>
                            </div> : null)
                    }))}
                </div>
            </div>
        </div>
    )
}

export default QuizQuestions;
