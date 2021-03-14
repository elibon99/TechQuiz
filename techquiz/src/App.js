import Navbar from "./components/layout/NavBar";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";



function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
              <Route exact path = '/' component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
