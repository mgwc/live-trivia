import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AllQuestions from "./Components/Questions/AllQuestions";
import AllGames from "./Components/Games/AllGames";
import Game from "./Components/Games/Game";
import PlayerView from "./Components/LiveGames/PlayerView";


function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={AllQuestions} />
        <Route path="/manage-questions" exact component={AllQuestions} />
        <Route path="/manage-questions/:gameId" component={AllQuestions} />
        <Route path="/manage-games" exact component={AllGames} />
        <Route path="/manage-games/:id" component={Game} />
        <Route path="/play/:gameId" component={PlayerView} />
      </div>
    </Router>
  );
}

export default App;
