import React from 'react';
import GameVsCategoryInfo from "./GameVsCategoryInfo";
import {Link, Redirect} from "react-router-dom";

const GameCategory = ({game, opponent, profile, userStat, score, isYourTurn, auth, localGame, fetchQuestions, gamingID, hasChosenCategory}) =>  {
    const [selectedCategories, setSelectedCategories]= React.useState("");
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }

    console.log(localGame.selectedCategories, "<- all 4 categories")

    return (
        (game && userStat && localGame.selectedCategories) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsCategoryInfo game={game} opponent={opponent} profile={profile} userStat={userStat} hasChosenCategory={hasChosenCategory}/>
                <div className="card-content">
                    <div className="container">
                        <div className="row flex">
                    {(localGame.selectedCategories && !hasChosenCategory) ? localGame.selectedCategories.map((category => {
                        return (
                            <div key={category.tags}  className="col s12 m6 game-category-col">
                                <div id={category.tags} onClick={e => {setSelectedCategories(e.target.id)}} className="card category-title-container" tabIndex="1">
                                    <div id={category.tags} className="quiz-landing-card quiz-landing-card-title" onClick={e => {setSelectedCategories(e.target.id)}}>
                                        <img id={category.tags} className="category-background-image" onClick={e => {setSelectedCategories(e.target.id)}} src={category.iconSrc} alt={category.category}/>
                                            {category.category}
                                    </div>
                                </div>
                            </div>)
                    })) : <div></div>}
                        </div>
                    </div>
                </div>

                <div className="card-content">
                        <div className="container">
                            <Link to={'/quiz-landing/' + gamingID}>
                                {hasChosenCategory ? <button className="btn blue lighten-1 z-depth-0 play-button">Go to questions</button> :
                                                    <button className="btn blue lighten-1 z-depth-0 play-button" onClick={() => {fetchQuestions(gamingID,selectedCategories)}}>Play</button>
                                }
                            </Link>
                        </div>
                </div>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameCategory;
