import React from 'react';
import Square from "./Square";

const scoresPerQuestion = [
    {questionID: 1, score: 10},
    {questionID: 2, score: 5},
    {questionID: 3, score: 2},

]

const CurrentGameSetItem = () => {
    return(
        <div className="container">
            <div className="row flex">
                <div className="col s12 m12">
                    <div className="row game-item">
                        <div className="col s12 m5">
                            <ol>
                                <li>10 pts</li>
                                <li>10 pts</li>
                                <li>10 pts</li>
                            </ol>
                        </div>
                        <div className="col s12 m2">
                            Linux
                        </div>
                        <div className="col s12 m5">
                            {scoresPerQuestion.map((score) => {
                                return <Square value={score.score}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentGameSetItem;