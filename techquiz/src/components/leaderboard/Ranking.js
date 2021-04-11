import React from 'react';

const Ranking = ({ratings, title, type, users}) => {
    return(
        <div className="card">
            <div className="card-content">
            <h5>{title}</h5>
            {(ratings && users) ?
            <ol>
                {ratings && ratings.map((rating) => {
                    return (
                        <li key={rating.id}>{(type === "slScore" && users[rating.id]) ? users[rating.id].userName : rating.username}  {type === "slScore" ? rating.slScore : rating.rating}</li>
                    )
                })}
            </ol> :
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
            </div>
        </div>
    )
}

export default Ranking;
