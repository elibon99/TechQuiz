import React from 'react';
import {Link, useHistory} from "react-router-dom";
import Trophy from "./Trophy";
import AccountImg from "../Notifications/AccountImg";
import QuestionMark from "./QuestionMark";
const Ranking = ({ratings, title, type, users}) => {
    const history = useHistory();
    function handleRowClick(id){
        history.push('/profile-preview/' + id);
    }
    return(
        <div className="card profile-info-card">
            <div className="leaderboard-small-category-container">
                <div className="leaderboard-small-title-and-link">
                    <h6 className="leaderboard-small-title">{title === "Singleplayer score" ? "TOTAL CATEGORY SCORE" : title.toUpperCase()}</h6>
                    {title === "Multiplayer rating" ? <QuestionMark className="question-mark"/> : ""}
                    <Link to={"/leaderboard/" + title} className="link-to-leaderboard-all">
                        <h6 className="leaderboard-small-title">View All</h6>
                    </Link>
                </div>
                {ratings && users ?
                <table>
                    <thead>
                        <tr>
                            <th className="width-col1" scope="col">Rank</th>
                            <th className="width-col2" scope="col">Player</th>
                            <th className="width-col3" scope="col">{title === "Multiplayer rating" ? "Rating" : "Score"}</th>
                        </tr>
                    </thead>
                     <tbody>
                        {title === "Singleplayer score" ? ratings.map((rating, index) => {
                            return (
                                    <tr key={rating.id} onClick={() => handleRowClick(rating.id)}>
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
                            )
                        }) : ratings.map((rating,index) => {
                            return(
                                    <tr key={rating.id} onClick={() => handleRowClick(rating.id)}>
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
                            )
                        })
                        }
                     </tbody>
                </table> : <img className='loading-wheel-general-view' src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
            </div>
        </div>
    )
}

export default Ranking;
