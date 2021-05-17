import React from 'react';

const AlertImg = ({className}) => {
    return(
        <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="none">
                <path d="M12 9v5" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 17.5v.5" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2.232 19.016L10.35 3.052c.713-1.403 2.59-1.403 3.302 0l8.117 15.964C22.45 20.36 21.544 22 20.116 22H3.883c-1.427 0-2.334-1.64-1.65-2.984z" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    )
}

export default AlertImg;