import React from 'react';
import GameVsCategoryInfo from "./GameVsCategoryInfo";
import {Link, Redirect} from "react-router-dom";


function getCategories(categories){
    let selectedCategories = [];
    for(let i = 0; i < 4; i += 1){
        var randomIndex = Math.floor(Math.random() * (categories.length-1));
        selectedCategories.push(categories[randomIndex]);
        categories.splice(randomIndex, 1);
    }
    return selectedCategories;
}

const GameCategory = ({game, opponent, profile, userStat, score, isYourTurn, auth}) =>  {
    const categories = [
        "Linux", "DevOps", "MySQL", "PHP", "BASH", "Dockers",
        "HTML", "WordPress", "Laravel", "Kubernetes", "JavaScript"
    ]
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        (game && userStat) ?
        <div className="container">
            <div className="card game-landing-container">
                <GameVsCategoryInfo game={game} opponent={opponent} profile={profile} userStat={userStat}/>
                <div className="card-content">
                    <div className="container">
                        <div className="row flex">
                    {getCategories(categories) && getCategories(categories).map((category => {
                        return (
                            <div key={category} className="col s12 m6 game-category-col">
                                <div className="card category-title-container" tabIndex="1">
                                    <div className="category-title">
                                        {category}
                                    </div>
                                </div>
                            </div>)
                    }))}
                        </div>
                    </div>
                </div>

                <div className="card-content">
                        <div className="container">
                            <Link to='/quiz-landing'>
                                <button className="btn blue lighten-1 z-depth-0 play-button">Play</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>
    )
}

export default GameCategory;
