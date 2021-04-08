import React from 'react';
import Ranking from "./Ranking";
import CategoryScore from "./CategoryScore";

const Leaderboard = ({mlRating}) => {
    return(
        <div className="container">
            <h5>Leaderboard</h5>
            <div className="row">
                <div className="col s12 m3">
                    <Ranking title={"Multiplayer rating"} ratings={mlRating}/>
                    <Ranking title={"Singleplayer rating"}/>
                </div>
                <div className="col s12 m9">
                    <div className="row">
                        <CategoryScore title={"PHP"}/>
                        <CategoryScore title={"LINUX"}/>
                        <CategoryScore title={"MySQL"}/>
                        <CategoryScore title={"BASH"}/>
                        <CategoryScore title={"DevOps"}/>
                        <CategoryScore title={"Java"}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Leaderboard;
