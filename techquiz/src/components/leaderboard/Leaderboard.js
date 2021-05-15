import React from 'react';
import Ranking from "./Ranking";
import CategoryScore from "./CategoryScore";

const Leaderboard = ({
                         mlRating,
                         users,
                         slScores,
                         bashScore,
                         devopsScore,
                         dockerScore,
                         htmlScore,
                         javascriptScore,
                         kubernetesScore,
                         laravelScore,
                         linuxScore,
                         mysqlScore,
                         phpScore,
                         wordpressScore
                     }) => {
    return(
        <div>
        <h5 className="page-title">Leaderboard</h5>
        <div className="container general-container">
            <div className="row">
                <div className="col s12 m12 l3">
                    <Ranking title={"Multiplayer rating"} ratings={mlRating} type="mlRating" users={users}/>
                    <Ranking title={"Singleplayer score"} ratings={slScores} type="slScore" users={users}/>
                </div>
                <div className="col s12 m12 l9">
                    <div className="row">
                        <CategoryScore title={"PHP"} scores={phpScore}/>
                        <CategoryScore title={"Linux"} scores={linuxScore}/>
                        <CategoryScore title={"MySQL"} scores={mysqlScore}/>
                        <CategoryScore title={"BASH"} scores={bashScore}/>
                        <CategoryScore title={"DevOps"} scores={devopsScore}/>
                        <CategoryScore title={"Docker"} scores={dockerScore}/>
                        <CategoryScore title={"HTML"} scores={htmlScore}/>
                        <CategoryScore title={"JavaScript"} scores={javascriptScore}/>
                        <CategoryScore title={"Kubernetes"} scores={kubernetesScore}/>
                        <CategoryScore title={"Laravel"} scores={laravelScore}/>
                        <CategoryScore title={"WordPress"} scores={wordpressScore}/>
                    </div>
                </div>

            </div>
        </div>
        </div>
    )
}

export default Leaderboard;
