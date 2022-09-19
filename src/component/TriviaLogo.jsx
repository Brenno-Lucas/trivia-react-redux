import React from 'react';
import logo from '../trivia.png';
import '../App.css';

class TriviaLogo extends React.Component {
  render() {
    return (
      <div className="App-header">
        <h1>{logo}</h1>
      </div>
    );
  }
}

export default TriviaLogo;
