import React from 'react';

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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
