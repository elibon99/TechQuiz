import React from 'react';
import {Redirect} from "react-router-dom";
//
/*const answers = [
    {name: "ls", id: 1},
    {name: "delete", id: 2},
    {name: "remove", id: 3},
    {name: "rmdir", id: 4},
]*/

const QuizQuestions = ({auth, gameSet, verifyQuestion, gameSetID, gameID, game, restoreRedirectTo}) => {
    const [selectedAnswer, setSelectedAnswer]= React.useState("");

    //console.log(game.redirectTo, 'trying to redirect eh?');

    if(game.redirectTo){
        const path = game.redirectTo;
        restoreRedirectTo();
        return <Redirect to={path}/>
    }

    //console.log(selectedAnswer, "chosen category")

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
                                <div id={entry[0]} onClick={e => {setSelectedAnswer(e.target.id); console.log(selectedAnswer, "this was the selected answer"); verifyQuestion(gameID, selectedAnswer, gameSetID )}} className="card category-title-container" tabIndex="1">
                                    <div id={entry[0]} onClick={e => {setSelectedAnswer(e.target.id); console.log(selectedAnswer, "this was the selected answer"); verifyQuestion(gameID, selectedAnswer, gameSetID)}} className="category-title">
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
