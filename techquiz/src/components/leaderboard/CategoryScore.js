import React from 'react';

const CategoryScore = (props) => {
    return(
        <div className="col s12 m4">
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

        </div>
    )
}

export default CategoryScore;