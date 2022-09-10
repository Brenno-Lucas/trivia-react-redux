import React from 'react';

class TriviaLogo extends React.Component {
  render() {
    return (
      <div className="App-header">
        {/* foi retirado do src o "{ logo }" pois estava dando erro nos testes, dizebdi que não estava definido */}
        <img src="" className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </div>
    );
  }
}

export default TriviaLogo;
