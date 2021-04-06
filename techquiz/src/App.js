import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./components/authentication/SignUp";
import FindGame from "./components/gameSetup/FindGame";
import Leaderboard from "./components/leaderboard/Leaderboard";
import GameLanding from "./components/game/GameLanding";
import GameCategory from "./components/game/GameCategory";
import QuizLanding from "./components/game/QuizLanding";
import QuizQuestions from "./components/game/QuizQuestions";
import CurrentGameStats from "./components/game/CurrentGameStats";
import GameFinished from "./components/game/GameFinished";
import Landing from "./components/home/Landing";
import DashboardPresenter from "./containers/DashboardPresenter";
import NavBarPresenter from "./containers/NavBarPresenter";
import SignInPresenter from "./containers/SignInPresenter";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBarPresenter/>
          <Switch>
              <Route exact path = '/profile' component={DashboardPresenter}></Route>
              <Route path = '/signup' component={SignUp}></Route>
              <Route path = '/signin' component={SignInPresenter}></Route>
              <Route path = '/findgame' component={FindGame}></Route>
              <Route path = '/leaderboard' component={Leaderboard}></Route>
              <Route path = '/game-landing' component={GameLanding}></Route>
              <Route path = '/choose-category' component={GameCategory}></Route>
              <Route path = '/quiz-landing' component={QuizLanding}></Route>
              <Route path = '/quiz-question' component={QuizQuestions}></Route>
              <Route path = '/current-game-stats' component={CurrentGameStats}></Route>
              <Route path = '/game-finished' component={GameFinished}></Route>
              <Route path = '/home' component={Landing}></Route>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
