import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: object,
}.isRequired;
export default connect()(Ranking);
