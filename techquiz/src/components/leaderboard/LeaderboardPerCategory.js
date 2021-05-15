import React from 'react';

const leaderboardPerCategory = ({category, categoryScore, users}) => {
    return(
        <div className="card profile-info-card">
            <div className="card-content">
                <h5>{category}</h5>
                {categoryScore ?
                    <ol>
                        {category === "Singleplayer score" ? Object.entries(categoryScore).map((score) => {
                            return (
                                <li key={score[0]}> {users[score[0]] !== undefined ? users[score[0]].userName : ""} {score[1].slScore} </li>
                            )
                        }) : category === "Multiplayer rating" ? Object.entries(categoryScore).map((score) => {
                            return (
                                <li key={score[0]}>{score[1].username} {score[1].rating}  </li>
                            )
                        }) : (categoryScore) && Object.entries(categoryScore).map((score) => {
                            return (
                                <li key={score[0]}>{score[1].username} {score[1].score}  </li>
                            )
                        })}
                    </ol> :
                    <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
            </div>
        </div>
    )
}

export default leaderboardPerCategory;
