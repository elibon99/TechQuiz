import React from 'react';

const Square = ({result}) => {
    return(
        <div className={result>0 ? "square-green" : "square-red"}>
            {result}
        </div>
    )
}

export default Square;