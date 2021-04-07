import React from 'react';
import {Redirect} from "react-router-dom";

const answers = [
    {name: "ls", id: 1},
    {name: "delete", id: 2},
    {name: "remove", id: 3},
    {name: "rmdir", id: 4},
]

const QuizQuestions = ({auth}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return(
        <div className="container">
            <div className="card-content">
                <div className="row answer-display-container">
                    <div className="col s6 m6"><h6 className="left">Current Score: 8 (+7)</h6></div>
                    <div className="col s6 m6"><h6 className="right">Question 1/3</h6></div>
                    <div className="col s12 m12">
                        <p className="center">How to delete a directory in Linux?</p>
                    </div>
                </div>
                <div className="row">
                    <p className="center">Time left: 0:10</p>
                </div>
                <div className="row">
                    {answers.map((answer => {
                        return (
                            <div key={answer.id} className="col s12 m6">
                                <div className="card category-title-container">
                                    <div className="category-title">
                                        {answer.name}
                                    </div>
                                </div>
                            </div>)
                    }))}
                </div>
            </div>
        </div>
    )
}

export default QuizQuestions;
