import React from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import { withRouter } from 'react-router';
import Header from '../component/Header';
import { addScore } from '../redux/actions/index';

class Feedback extends React.Component {
  resetScoreAndRedirect = () => {
    const { history, player } = this.props;
    console.log('reset');
    player(0, 0);
    history.push('/');
  };

  messageForHit = () => {
    const { assertions } = this.props;
    const magic = 3;
    const Well = <p data-testid="feedback-text">Well Done!</p>;
    const Could = <p data-testid="feedback-text">Could be better...</p>;
    const currenct = assertions >= magic ? Well : Could;
    return currenct;
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <div>
          {this.messageForHit()}
        </div>
        <div>
          <h3>Placar final</h3>
          <div>
            <p>Numero de acertos:</p>
            <p data-testid="feedback-total-question">{ assertions }</p>
          </div>
          <div>
            <p>Pontuação total:</p>
            <p data-testid="feedback-total-score">{ score }</p>
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.resetScoreAndRedirect }
        >
          Play Again
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          View ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  player: (score, assertions) => dispatch(addScore(score, assertions)),
});

Feedback.propTypes = {
  assertions: number,
}.isRequered;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));
