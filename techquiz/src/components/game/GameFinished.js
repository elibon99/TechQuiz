import React from 'react';
import {Link, Redirect} from "react-router-dom";

const GameFinished = ({auth}) => {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        <div className="container game-finished-container">
            <h3 className="center">Game Finished</h3>

            <h5 className="center">Elias Won: 9-5</h5>

            <br/>
            <br/>

            <p className="center">Elias rating: 105(+3)</p>
            <p className="center">Per rating: 94(-3)</p>

            <div className="container game-finished-btn">
                <Link to='/game-landing'>
                    <button className="btn blue lighten-1 z-depth-0 play-button">Rematch</button>
                </Link>
            </div>

            <div className="container game-finished-btn">
                <Link to='/'>
                    <button className="btn blue lighten-1 z-depth-0 play-button">Return to dashboard</button>
                </Link>
            </div>




        </div>
    )
}

export default GameFinished;
