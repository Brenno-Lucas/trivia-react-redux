import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withRouter } from 'react-router';
// import md5 from 'crypto-js/md5';
// import { getPlayersStorage } from '../helpers/handlingLocalStorage';
import { addScore } from '../redux/actions/index';

class Ranking extends React.Component {
  // state = {
  //   players: [],
  // };

  // componentDidMount() {
  //   const players = getPlayersStorage();
  //   players.sort((player1, player2) => player2.score - player1.score);
  //   this.setState({ players });
  // }

  resetScoreAndRedirect = () => {
    const { history, player } = this.props;
    player(0, 0);
    history.push('/');
  };

  // listPlayers = () => {
  //   const { players } = this.state;
  //   const list = players.map((player, index) => {
  //     const { email, name, score } = player;
  //     const emailGravatar = md5(email).toString();
  //     return (
  //       <li key={ index }>
  //         <img src={ `https://www.gravatar.com/avatar/${emailGravatar}` } alt={ name } />
  //         <p data-testid={ `player-name-${index}` }>{name}</p>
  //         <p data-testid={ `player-score-${index}` }>{ score }</p>
  //       </li>
  //     );
  //   });
  //   return list;
  // };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* <ol>
          {this.listPlayers()}
        </ol> */}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.resetScoreAndRedirect }
        >
          Início
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  player: (score, assertions) => dispatch(addScore(score, assertions)),
});

Ranking.propTypes = {
  history: object,
}.isRequired;

export default withRouter(connect(null, mapDispatchToProps)(Ranking));
