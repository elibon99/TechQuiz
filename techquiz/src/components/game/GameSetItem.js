import React from 'react';
import Square from "./Square";


/**
 * This components main focus is displaying game-set items, rendering if it's your turn, opponents turn or your and the opponents results
 * @param isYourTurn - a variable that is set to true if it is your turn,
 * @param myResults - my set results for a given set,
 * @param opponentResults - opponent results for a given set
 * @param category - game set category for a given set
 * @param currentSet - the current game set of the game
 * @param setNr - the game set number
 * @param finishedGames - all finished games of the current user,
 * @param hasBeenAnsweredBy - a variable that tells how many have answered the given game set
 * */
const GameSetItem = ({isYourTurn, myResults, opponentResults, category, currentSet, setNr, hasBeenAnsweredBy}) => {

    return(
        <div className="card-content game-set-container">
            <div className="container">
                <h6 className={"game-set-item-title"}>Set {setNr}</h6>
                <div className="card game-set-card-container">
                <div className="row flex game-item">
                      <div className="col s12 m5 game-set-item">
                          {isYourTurn && myResults===undefined && (setNr === parseInt(currentSet) || hasBeenAnsweredBy[setNr-2] === 2) ? <div className="game-set-item-your-turn-container"><h6 className="game-set-item-your-turn-title">Your turn</h6></div>:
                               myResults && myResults["qScore2"] !== undefined ?
                                   <div className="set-results-container">
                                       {Object.entries(myResults).map((results, index) => {
                                           return <Square key={index} result={results[1]}/>
                                       })}
                                   </div> :
                               setNr > parseInt(currentSet) ? "TBD" : ""}
                      </div>
                      <div className="col s12 m2 game-set-item">
                          {category ? category : ""}
                      </div>
                      <div className="col s12 m5 game-set-item">
                          {!isYourTurn && opponentResults===undefined && (setNr === parseInt(currentSet) || hasBeenAnsweredBy[setNr-2] === 2) ? <div className="game-set-item-their-turn-container"><h6 className="game-set-item-your-turn-title">Playing</h6></div>:
                           opponentResults &&  opponentResults["qScore2"]!==undefined ?
                               <div className="set-results-container">
                                   {Object.entries(opponentResults).map((results, index) => {
                                       return <Square key={index} result={results[1]}/>
                                   })}
                               </div> :
                           setNr > parseInt(currentSet) ? "TBD" : ""}
                      </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GameSetItem;