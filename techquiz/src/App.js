import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUpPresenter from "./containers/SignUpPresenter";
import FindGamePresenter from "./containers/FindGamePresenter";
import Leaderboard from "./components/leaderboard/Leaderboard";
import GameLanding from "./components/game/GameLanding";
import GameCategory from "./components/game/GameCategory";
import QuizLanding from "./components/game/QuizLanding";
import QuizQuestions from "./components/game/QuizQuestions";
import CurrentGameStats from "./components/game/CurrentGameStats";
import GameFinished from "./components/game/GameFinished";
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
              <Route path = '/game-landing' component={GameLanding}></Route>
              <Route path = '/choose-category' component={GameCategory}></Route>
              <Route path = '/quiz-landing' component={QuizLanding}></Route>
              <Route path = '/quiz-question' component={QuizQuestions}></Route>
              <Route path = '/current-game-stats' component={CurrentGameStats}></Route>
              <Route path = '/game-finished' component={GameFinished}></Route>
              <Route path = '/home' component={LandingPresenter}></Route>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
