import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
      </Switch>
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
    </div>
  );
}
