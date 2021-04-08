import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AllQuestions from "./Components/Questions/AllQuestions";

// Adding a comment for testing purposes

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={AllQuestions} />
        <Route path="/manage-questions" component={AllQuestions} />
      </div>
    </Router>
  );
}

export default App;
