import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AllQuestions from "./Components/Questions/AllQuestions";
import AllGames from "./Components/Games/AllGames";
import Game from "./Components/Games/Game";
import Home from "./Components/Home"
import NavBar from "./Components/Visuals/NavBar"
import PlayerView from "./Components/LiveGames/PlayerView";
import HostView from "./Components/LiveGames/HostView";


function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manage-questions" exact component={AllQuestions} />
          <Route path="/manage-questions/:gameId" component={AllQuestions} />
          <Route path="/manage-games" exact component={AllGames} />
          <Route path="/manage-games/:id" component={Game} />
          <Route path="/play/:gameId" component={PlayerView} />
          <Route path="/host/:gameId" component={HostView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
