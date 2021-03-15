import React from 'react'
import GameItemYourTurn from "../dashboard/GameItemYourTurn";

const QuickMatch = () => {
    return (
        <div className="card">
            <div className="card-content">
                <h4 className="quick-match-title">Quick match</h4>
                <h5>Friends</h5>
                <GameItemYourTurn/>
            </div>
            <div className="card-content">
                <h5>Recent Players</h5>
                <GameItemYourTurn/>
                <GameItemYourTurn/>
            </div>
        </div>
    )

}

export default QuickMatch
