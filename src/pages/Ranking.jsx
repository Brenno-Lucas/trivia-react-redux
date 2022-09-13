/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
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

export default connect()(Ranking);
