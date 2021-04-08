import React from 'react';

const Ranking = ({ratings, title}) => {
    return(
        <div className="card">
            <div className="card-content">
            <h5>{title}</h5>
            {ratings ?
            <ol>
                {ratings && ratings.map((rating) => {
                    return (
                        <li key={rating.id}>{rating.username}  {rating.rating}</li>
                    )
                })}
            </ol> :
            <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
            </div>
        </div>
    )
}

export default Ranking;
