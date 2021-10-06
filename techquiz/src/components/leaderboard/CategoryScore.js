import React from 'react';
import {Link, useHistory} from "react-router-dom";
import Trophy from "./Trophy";
import AccountImg from "../Notifications/AccountImg";

const CategoryScore = ({scores, title, users}) => {
    const history = useHistory();
    function handleRowClick(id){
        history.push('/profile-preview/' + id);
    }
    return(
        <div className="col s12 m12 l6 xl4">
            <div className="card leaderboard-card">
            <div className="leaderboard-small-category-container category-score-small-container">
                <div className="leaderboard-small-title-and-link">
                    <h6 className="leaderboard-small-title">{title.toUpperCase()}</h6>
                    <Link to={"/leaderboard/" + title} className="link-to-leaderboard-all">
                        <h6 className="leaderboard-small-title">View All</h6>
                    </Link>
                </div>
                {scores && users ?
                <table>
                    <thead>
                    <tr>
                        <th className="width-col1" scope="col">Rank</th>
                        <th className="width-col2" scope="col">Player</th>
                        <th className="width-col3" scope="col">{title === "Multiplayer rating" ? "Rating" : "Score"}</th>
                    </tr>
                    </thead>

                    <tbody className="tbody-small-leaderboard">
                        {scores.map((score, index) => {
                            return (
                                    <tr key={score.id} onClick={() => handleRowClick(score.id)}>
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
                            )
                        })}
                        </tbody>
                </table> : <img className='loading-wheel-general-view' src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/> }
            </div>
            </div>
        </div>
    )
}

export default CategoryScore;
