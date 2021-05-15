import React from 'react';
import {Link} from "react-router-dom";

const CategoryScore = ({scores, title}) => {
    return(
        <div className="col s12 m4">
            <Link to={"/leaderboard/" + title} className="leaderboard-category-card">
            <div className="card profile-info-card">
                <div className="card-content">
                    <h5>{title}</h5>
                    {scores ?
                        <ol>
                            {scores && scores.map((score) => {
                                return (
                                    <li key={score.id}>{score.username}  {score.score}</li>
                                )
                            })}
                        </ol> :
                        <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
                </div>
            </div>
            </Link>
        </div>
    )
}

export default CategoryScore;
