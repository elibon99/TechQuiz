import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUpPresenter from "./containers/SignUpPresenter";
import FindGamePresenter from "./containers/FindGamePresenter";
import Leaderboard from "./components/leaderboard/Leaderboard";
import GameLandingPresenter from "./containers/GameLandingPresenter";
import GameCategoryPresenter from "./containers/GameCategoryPresenter";
import QuizLandingPresenter from "./containers/QuizLandingPresenter";
import QuizQuestionsPresenter from "./containers/QuizQuestionsPresenter";
import CurrentGameStatsPresenter from "./containers/CurrentGameStatsPresenter";
import GameFinishedPresenter from "./containers/GameFinishedPresenter";
import DashboardPresenter from "./containers/DashboardPresenter";
import NavBarPresenter from "./containers/NavBarPresenter";
import SignInPresenter from "./containers/SignInPresenter";
import LandingPresenter from "./containers/LandingPresenter";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBarPresenter/>
          <Switch>
              <Route exact path = '/' component={LandingPresenter}></Route>
              <Route path = '/profile' component={DashboardPresenter}></Route>
              <Route path = '/signup' component={SignUpPresenter}></Route>
              <Route path = '/signin' component={SignInPresenter}></Route>
              <Route path = '/findgame' component={FindGamePresenter}></Route>
              <Route path = '/leaderboard' component={Leaderboard}></Route>
              <Route path = '/game-landing' component={GameLandingPresenter}></Route>
              <Route path = '/choose-category' component={GameCategoryPresenter}></Route>
              <Route path = '/quiz-landing' component={QuizLandingPresenter}></Route>
              <Route path = '/quiz-question' component={QuizQuestionsPresenter}></Route>
              <Route path = '/current-game-stats' component={CurrentGameStatsPresenter}></Route>
              <Route path = '/game-finished' component={GameFinishedPresenter}></Route>
              <Route path = '/home' component={LandingPresenter}></Route>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
