import React from 'react';

const QuestionMark = ({className}) => {
    return(
        <div className="question-mark-container">
        <svg className={className} xmlns="http://www.w3.org/2000/svg" tabIndex="1" aria-hidden="true" focusable="false" width="1em" height="1em"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="#626262">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z"/>
                <path d="M12 6a3.5 3.5 0 0 0-3.5 3.5a1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"/>
                <circle cx="12" cy="17" r="1"/>
            </g>

        </svg>
            <div className="question-mark-text">
                <p>Only players with at least one win or loss will appear on this leaderboard</p>
            </div>

        </div>

    )
}

export default QuestionMark;