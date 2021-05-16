import React from 'react';
import {NavLink} from "react-router-dom";
import Trophy from "./Trophy";
import AccountImg from "../Notifications/AccountImg";

const CategoryScore = ({scores, title, users}) => {
    return(
        <div className="col s12 m12 l6 xl4">
            <div className="card leaderboard-card">
            <div className="leaderboard-small-category-container category-score-small-container">
                <h6 className="leaderboard-small-title">{title.toUpperCase()}</h6>
                <table>
                    <thead>
                    <tr>
                        <th className="width-col1" scope="col">Rank</th>
                        <th className="width-col2" scope="col">Player</th>
                        <th className="width-col3" scope="col">{title === "Multiplayer rating" ? "Rating" : "Score"}</th>
                    </tr>
                    </thead>
                    {scores && users ?
                        <tbody className="tbody-small-leaderboard">
                        {scores.map((score, index) => {
                            return (
                                <NavLink className="navlink-leaderboard" to={'/profile-preview/' + score.id}>
                                    <tr key={score.id}>
                                        <th className="width-col1">
                                            <div className="ranking-trohpy-container">
                                                {index+1 === 1 ?
                                                    <span><Trophy className="trophy"/></span>
                                                    : index+1 === 2 ?
                                                        <span><Trophy className="trophy trophy-silver"/></span>
                                                        : index+1 === 3 ?
                                                            <span><Trophy className="trophy trophy-bronze"/></span>
                                                            : ""} {index+1}
                                            </div>
                                        </th>
                                        <th className="width-col2">
                                            <div className="username-photo-container">
                                                {(users[score.id] !== undefined) && (users[score.id].photoURL !== null) ?
                                                    <img className="profile-pic-leaderboard" src={users[score.id].photoURL} alt="profile-pic"/>:
                                                    <AccountImg className="default-pic-leaderboard"/>}
                                                {score.username !== undefined ? score.username : ""}
                                            </div>
                                        </th>
                                        <th className="width-tbody-col3">{score.score}</th>
                                    </tr>
                                </NavLink>
                            )
                        })
                        }
                        </tbody> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/> }
                </table>
            </div>
            </div>
        </div>
    )
}

export default CategoryScore;
