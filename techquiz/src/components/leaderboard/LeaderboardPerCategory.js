import React from 'react';

const leaderboardPerCategory = ({category, categoryScore}) => {
    return(
        <div className="card profile-info-card">
            <div className="card-content">
                <h5>{category}</h5>
                {categoryScore ?
                    <ol>
                        {categoryScore && Object.entries(categoryScore).map((score) => {
                            return (
                                <li key={score[0]}>{score[1].username}  {score[1].score}</li>
                            )
                        })}
                    </ol> :
                    <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
            </div>
        </div>
    )
}

export default leaderboardPerCategory;
