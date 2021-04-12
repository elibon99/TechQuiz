import React from 'react';
import GameVsCategoryInfo from "./GameVsCategoryInfo";
import {Link, Redirect} from "react-router-dom";

const categories = [
    {name: "Linux", id: 1},
    {name: "Java", id: 2},
    {name: "MySQL", id: 3 },
    {name: "PHP", id: 4}
]



const GameCategory = ({auth}) =>  {
    if(!auth.uid) {
        return <Redirect to="/signin"/>
    }
    return (
        <div className="container">
            <div className="card game-landing-container">
                <GameVsCategoryInfo/>
                <div className="card-content">
                    <div className="container">
                        <div className="row flex">
                    {categories.map((category => {
                        return (
                            <div key={category.id} className="col s12 m6 game-category-col">
                                <div className="card category-title-container">
                                    <div className="category-title">
                                        {category.name}
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
        </div>
    )
}

export default GameCategory;
