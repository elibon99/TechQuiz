import React from 'react';
import {Redirect} from "react-router-dom";

const QuizQuestions = ({auth, gameSet, verifyQuestion, gameSetID, gameID, game, restoreRedirectTo, correctAnswers, answer}) => {
    if(game.redirectTo){
        const path = game.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }

/*    if(correctAnswers && answer){
        if(correctAnswers[answer] === "true"){
            console.log('correct, make it green');
            document.getElementById(answer).style.backgroundColor = "green";
        }
        else {
            console.log('wrong answer, light up the correct ones and the one u chose red.')
            Object.entries(correctAnswers).forEach((entry) => {
                console.log(entry, 'entry inside for loop');
                if(entry[1] === "true"){
                    console.log(entry, ' it was a true answer');
                    document.getElementById(entry[0]).style.backgroundColor = "green";
                }
            })
            try{
                document.getElementById(answer).style.backgroundColor = "red";
            }
            catch {console.log('didnt work, bad index');}
        }
    }*/
    if((gameSet !== null) && (correctAnswers === null)){
        console.log(Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers), 'logging gameseasdfasdft');
        Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers).forEach((entry) =>{
            console.log(entry, ' entire entry in for each');
            try{
                document.getElementById(entry[0]).style.backgroundColor = "gray";
            }
            catch{
                console.log('index out of bounds');
            }

        })
    }
    const mouseDownHandler = (event) => {
        if(event.button === 1 || event.button === 2 || event.button === 0){
            console.log("Trying to click in middle with category, :", event.target.id)
            verifyQuestion(gameID, event.target.id, gameSetID);
        }
    }

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        <div className="container">
            <div className="card-content">
                <div className="row answer-display-container">
                    <div className="col s6 m6"><h6 className="left">Current Score: {gameSet ? gameSet.score : ""}</h6></div>
                    <div className="col s6 m6"><h6 className="right">Question : {(gameSet && game.redirectTo === null) ? gameSet.activeQuestion +1 : ""}</h6></div>
                    <div className="col s12 m12">
                        <p className="center">{(gameSet && game.redirectTo === null)? gameSet.questions.resp[gameSet.activeQuestion].question : ""}</p>
                    </div>
                </div>
                <div className="row">
                    <p className="center">Placeholder</p>
                </div>
                <div className="row">
                    {gameSet && (game.redirectTo === null) && Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers).map((entry => {
                        return (
                            entry[1] ?
                            <div key={entry[0]} className="col s12 m6">
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
