import React from 'react';
import Trophy from "./Trophy";
import {NavLink} from "react-router-dom";
import AccountImg from "../Notifications/AccountImg";

const leaderboardPerCategory = ({category, categoryScore, users}) => {
    return(
        <div className="container general-container">
        <div className="card profile-info-card">
            <div className="card-content leaderboard-card-content">
                <div className="leaderboard-category-container">
                <h5>{category.toUpperCase()}</h5>
                    <table className="z-depth-5">
                        <thead>
                        <tr>
                            <th className="width-col1" scope="col">Rank</th>
                            <th className="width-col2" scope="col">Player</th>
                            <th className="width-col3" scope="col">{category === "Multiplayer rating" ? "Rating" : "Score"}</th>
                        </tr>
                        </thead>
                        {categoryScore ?
                            <tbody>
                                {category === "Singleplayer score" ? Object.entries(categoryScore).map((score, index) => {
                                    return(
                                        <NavLink className="navlink-leaderboard" to={'/profile-preview/' + score[0]}>
                                        <tr key={score[0]}>
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
                                                    {(users[score[0]] !== undefined) && (users[score[0]].photoURL !== null) ?
                                                        <img className="profile-pic-leaderboard" src={users[score[0]].photoURL} alt="profile-pic"/>:
                                                        <AccountImg className="default-pic-leaderboard"/>}
                                                    {users[score[0]] !== undefined ? users[score[0]].userName : ""}
                                                </div>
                                            </th>
                                            <th className="width-tbody-col3">{score[1].slScore}</th>
                                        </tr>
                                        </NavLink>
                                    )
                                }):
                                category === "Multiplayer rating" ? Object.entries(categoryScore).map((score,index) => {
                                    return(
                                        <NavLink className="navlink-leaderboard" to={'/profile-preview/' + score[0]}>
                                        <tr key={score[0]}>
                                            <th className="width-col1"><div className="ranking-trohpy-container">{index+1 === 1 ?
                                            <span><Trophy className="trophy"/></span> : index+1 === 2 ?
                                            <span><Trophy className="trophy trophy-silver"/></span> : index+1 === 3 ?
                                            <span><Trophy className="trophy trophy-bronze"/></span> : ""} {index+1}</div></th>
                                            <th className="width-col2">
                                                <div className="username-photo-container">
                                                    {(users[score[0]] !== undefined) && (users[score[0]].photoURL !== null) ?
                                                        <img className="profile-pic-leaderboard" src={users[score[0]].photoURL} alt="profile-pic"/>:
                                                        <AccountImg className="default-pic-leaderboard"/>}
                                                    {users[score[0]] !== undefined ? users[score[0]].userName : ""}
                                                </div>
                                            </th>
                                            <th className="width-tbody-col3">{score[1].rating}</th>

                                        </tr>
                                        </NavLink>
                                    )
                                }):
                                    (categoryScore) && Object.entries(categoryScore).map((score,index) => {
                                        return(
                                            <NavLink className="navlink-leaderboard" to={'/profile-preview/' + score[0]}>
                                            <tr key={score[0]}>
                                                <th className="width-col1"><div className="ranking-trohpy-container">{index+1 === 1 ?
                                                    <span><Trophy className="trophy"/></span> : index+1 === 2 ?
                                                     <span><Trophy className="trophy trophy-silver"/></span> : index+1 === 3 ?
                                                     <span><Trophy className="trophy trophy-bronze"/></span> : ""} {index+1}</div></th>
                                                <th className="width-col2">
                                                    <div className="username-photo-container">
                                                        {(users[score[0]] !== undefined) && (users[score[0]].photoURL !== null) ?
                                                            <img className="profile-pic-leaderboard" src={users[score[0]].photoURL} alt="profile-pic"/>:
                                                            <AccountImg className="default-pic-leaderboard"/>}
                                                        {users[score[0]] !== undefined ? users[score[0]].userName : ""}
                                                    </div>
                                                </th>
                                                <th className="width-tbody-col3">{score[1].score !== null ? score[1].score : ""}</th>

                                            </tr>
                                            </NavLink>
                                        )
                                    })}
                            </tbody> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
                        }

                    </table>
            </div>
            </div>
        </div>
        </div>
    )
}

export default leaderboardPerCategory;
