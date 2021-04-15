import React from 'react';
import {Redirect} from "react-router-dom";
//
/*const answers = [
    {name: "ls", id: 1},
    {name: "delete", id: 2},
    {name: "remove", id: 3},
    {name: "rmdir", id: 4},
]*/

const QuizQuestions = ({auth, gameSet, verifyQuestion, gameSetID, gameID}) => {

    if(gameSet){
        console.log(gameSet, "gameset")
        console.log(gameSet.questions, "question")
        console.log(gameSet.questions.resp, "resp")
        console.log(Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers) , "answer")
        Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers).map((entry) => {
            return console.log(entry[1], "  Answer")
        })
    }

    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        <div className="container">
            <div className="card-content">
                <div className="row answer-display-container">
                    <div className="col s6 m6"><h6 className="left">Current Score: {gameSet ? gameSet.score : ""}</h6></div>
                    <div className="col s6 m6"><h6 className="right">Question : {gameSet ? gameSet.activeQuestion +1 : ""}</h6></div>
                    <div className="col s12 m12">
                        <p className="center">{gameSet ? gameSet.questions.resp[gameSet.activeQuestion].question : ""}</p>
                    </div>
                </div>
                <div className="row">
                    <p className="center">Placeholder</p>
                </div>
                <div className="row">
                    {gameSet && Object.entries(gameSet.questions.resp[gameSet.activeQuestion].answers).map((entry => {
                        return (
                            entry[1] ?
                            <div key={entry[0]} className="col s12 m6">
                                <div className="card category-title-container" tabIndex="1">
                                    <div className="category-title">
                                        {entry[1]}
                                    </div>
                                </div>
                            </div> : null)
                    }))}
                </div>
                <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => {verifyQuestion(gameID,"answer_a", gameSetID )}}>Play</button>
            </div>
        </div>
    )
}

export default QuizQuestions;
