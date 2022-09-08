import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { playerInfo } from '../redux/actions';
import { setTokenStorage } from '../helpers/handlingLocalStorage';
import requestTokenAPI from '../services/requestTokenAPI';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  buttonPlayerSubmit = async () => {
    const { name, email } = this.state;
    const { player, history } = this.props;
    setTokenStorage(await requestTokenAPI());
    player(name, email);
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const magaicNumber = 3;
    const regex = /\S+@\S+\.\S+/;
    const validName = name.length >= magaicNumber;
    const validEmail = regex.test(email);
    const valid = validEmail && validName;
    return (
      <div>
        <label htmlFor="name">
          <input
            name="name"
            id="name"
            value={ name }
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            name="email"
            id="email"
            type="email"
            value={ email }
            placeholder="Digite seu e-mail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ !valid }
          onClick={ this.buttonPlayerSubmit }
        >
          Play
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  player: (name, gravatarEmail) => dispatch(playerInfo(name, gravatarEmail)),
});

Login.propTypes = {
  player: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
