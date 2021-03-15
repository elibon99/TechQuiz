import React from 'react';

const Ranking = (props) => {
    return(
        <div className="card">
            <div className="card-content">
            <h5>{props.title}</h5>
            <ol>
                <li>Adam    256</li>
                <li>Per     240</li>
                <li>Elias   230</li>
            </ol>
            </div>
        </div>
    )
}

export default Ranking;