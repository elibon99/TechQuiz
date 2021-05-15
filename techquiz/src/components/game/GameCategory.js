import React from 'react';
import GameVsCategoryInfo from "./GameVsCategoryInfo";
import {Link, Redirect} from "react-router-dom";

const GameCategory = ({game, opponent, generatedCategories, profile, userStat, score, isYourTurn, auth, localGame, fetchQuestions, gamingID, hasChosenCategory}) =>  {
    const [selectedCategories, setSelectedCategories]= React.useState("");
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }

    return (
        (game && userStat && generatedCategories) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsCategoryInfo game={game} opponent={opponent} profile={profile} userStat={userStat} hasChosenCategory={hasChosenCategory}/>
                <div className="card-content">
                    <div className="container">
                        <div className="row flex">
                    {(generatedCategories && !hasChosenCategory) ? Object.entries(generatedCategories).map((category => {
                        return (
                            <div key={category[1].tags}  className="col s12 m6 game-category-col">
                                <div id={category[1].tags} onClick={e => {setSelectedCategories(e.target.id)}} className="card category-title-container" tabIndex="1">
                                    <div id={category[1].tags} className="quiz-landing-card quiz-landing-card-title" onClick={e => {setSelectedCategories(e.target.id)}}>
                                        <img id={category[1].tags} className="category-background-image" onClick={e => {setSelectedCategories(e.target.id)}} src={category[1].iconSrc} alt={category[1].category}/>
                                            {category[1].category}
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
        </div> : <img className='loading-wheel-general-view' src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameCategory;
