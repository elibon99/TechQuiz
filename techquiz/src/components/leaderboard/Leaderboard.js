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
                <div className="col s12 m12 l6">
                    <Ranking title={"Multiplayer rating"} ratings={mlRating} type="mlRating" users={users}/>
                </div>
                <div className="col s12 m12 l6">
                    <Ranking title={"Singleplayer score"} ratings={slScores} type="slScore" users={users}/>
                </div>

                <div className="col s12 m12">
                    <div className="row">
                        <CategoryScore title={"PHP"} scores={phpScore} users={users}/>
                        <CategoryScore title={"Linux"} scores={linuxScore} users={users}/>
                        <CategoryScore title={"MySQL"} scores={mysqlScore} users={users}/>
                        <CategoryScore title={"BASH"} scores={bashScore} users={users}/>
                        <CategoryScore title={"DevOps"} scores={devopsScore} users={users}/>
                        <CategoryScore title={"Docker"} scores={dockerScore} users={users}/>
                        <CategoryScore title={"HTML"} scores={htmlScore} users={users}/>
                        <CategoryScore title={"JavaScript"} scores={javascriptScore} users={users}/>
                        <CategoryScore title={"Kubernetes"} scores={kubernetesScore} users={users}/>
                        <CategoryScore title={"Laravel"} scores={laravelScore} users={users}/>
                        <CategoryScore title={"WordPress"} scores={wordpressScore} users={users}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Leaderboard;
