import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUpPresenter from "./containers/SignUpPresenter";
import FindGamePresenter from "./containers/FindGamePresenter";
import LeaderboardPresenter from "./containers/LeaderboardPresenter";
import GameLandingPresenter from "./containers/GameLandingPresenter";
import GameCategoryPresenter from "./containers/GameCategoryPresenter";
import QuizLandingPresenter from "./containers/QuizLandingPresenter";
import QuizQuestionsPresenter from "./containers/QuizQuestionsPresenter";
import GameFinishedPresenter from "./containers/GameFinishedPresenter";
import DashboardPresenter from "./containers/DashboardPresenter";
import NavBarPresenter from "./containers/NavBarPresenter";
import SignInPresenter from "./containers/SignInPresenter";
import LandingPresenter from "./containers/LandingPresenter";
import FriendPresenter from "./containers/FriendPresenter";
import ProfilePreviewPresenter from "./containers/ProfilePreviewPresenter";
import LeaderboardCategoryPresenter from "./containers/LeaderboardCategoryPresenter";
import LeaveGamePopUpPresenter from "./containers/LeaveGamePopUpPresenter";

import Footer from "./components/layout/Footer";


function App({store}) {
    const [confirm, setConfirm] = React.useState(false);
    const [confirmCallback, setConfirmCallback] = React.useState(null);

    function getConfirmation(message, callback){
        setConfirmCallback(() => callback);
        setConfirm(true);
    }
  return (
      <BrowserRouter getUserConfirmation={getConfirmation}>
        <div className="App">
          <NavBarPresenter/>
          <Switch>
              <Route exact path = '/' component={LandingPresenter}></Route>
              <Route path = '/profile' component={DashboardPresenter}></Route>
              <Route path = '/signup' component={SignUpPresenter}></Route>
              <Route path = '/signin' component={SignInPresenter}></Route>
              <Route path = '/findgame' component={FindGamePresenter}></Route>
              <Route exact path = '/leaderboard' component={LeaderboardPresenter}></Route>
              <Route path = '/leaderboard/:id' component={LeaderboardCategoryPresenter}></Route>
              <Route path = '/game-landing/:id' component={GameLandingPresenter}></Route>
              <Route path = '/choose-category/:id' component={GameCategoryPresenter}></Route>
              <Route path = '/quiz-landing/:id' component={QuizLandingPresenter}></Route>
              <Route path = '/quiz-question/:id' component={QuizQuestionsPresenter}></Route>
              <Route path = '/game-finished/:id' component={GameFinishedPresenter}></Route>
              <Route path = '/home' component={LandingPresenter}></Route>
              <Route path = '/friends' component={FriendPresenter}></Route>
              <Route path = '/profile-preview/:id' component={ProfilePreviewPresenter}></Route>
          </Switch>

            {confirm && (<LeaveGamePopUpPresenter confirmCallback={confirmCallback} setConfirm={setConfirm}/>)}

            <Footer/>

        </div>
      </BrowserRouter>
  );
}

export default App;
