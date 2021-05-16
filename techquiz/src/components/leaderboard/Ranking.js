import React from 'react';
import {NavLink} from "react-router-dom";
import Trophy from "./Trophy";
import AccountImg from "../Notifications/AccountImg";

const Ranking = ({ratings, title, type, users}) => {
    return(
        <div className="card profile-info-card">
            <div className="leaderboard-small-category-container">
                <h6 className="leaderboard-small-title">{title.toUpperCase()}</h6>
                <table>
                    <thead>
                        <tr>
                            <th className="width-col1" scope="col">Rank</th>
                            <th className="width-col2" scope="col">Player</th>
                            <th className="width-col3" scope="col">{title === "Multiplayer rating" ? "Rating" : "Score"}</th>
                        </tr>
                    </thead>
                    {ratings && users ?
                     <tbody>
                        {title === "Singleplayer score" ? ratings.map((rating, index) => {
                            return (
                                <NavLink className="navlink-leaderboard" to={'/profile-preview/' + rating.id}>
                                    <tr key={rating.id}>
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
                                                {(users[rating.id] !== undefined) && (users[rating.id].photoURL !== null) ?
                                                    <img className="profile-pic-leaderboard" src={users[rating.id].photoURL} alt="profile-pic"/>:
                                                    <AccountImg className="default-pic-leaderboard"/>}
                                                {users[rating.id] !== undefined ? users[rating.id].userName : ""}
                                            </div>
                                        </th>
                                        <th className="width-tbody-col3">{rating.slScore}</th>
                                    </tr>
                                </NavLink>
                            )
                        }) : ratings.map((rating,index) => {
                            return(
                                <NavLink className="navlink-leaderboard" to={'/profile-preview/' + rating.id}>
                                    <tr key={rating.id}>
                                        <th className="width-col1"><div className="ranking-trohpy-container">{index+1 === 1 ?
                                            <span><Trophy className="trophy"/></span> : index+1 === 2 ?
                                                <span><Trophy className="trophy trophy-silver"/></span> : index+1 === 3 ?
                                                    <span><Trophy className="trophy trophy-bronze"/></span> : ""} {index+1}</div></th>
                                        <th className="width-col2">
                                            <div className="username-photo-container">
                                                {(users[rating.id] !== undefined) && (users[rating.id].photoURL !== null) ?
                                                    <img className="profile-pic-leaderboard" src={users[rating.id].photoURL} alt="profile-pic"/>:
                                                    <AccountImg className="default-pic-leaderboard"/>}
                                                {users[rating.id] !== undefined ? users[rating.id].userName : ""}
                                            </div>
                                        </th>
                                        <th className="width-tbody-col3">{rating.rating}</th>

                                    </tr>
                                </NavLink>
                            )
                        })
                        }
                     </tbody> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/> }
                </table>
            </div>
        </div>
    )
}

export default Ranking;
