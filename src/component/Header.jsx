import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
// import TriviaLogo from './TriviaLogo';

class Header extends Component {
  state = {
    linkImgGravatar: '',
    name: '',
    score: '',
  };

  componentDidMount() {
    this.createLinkImg();
  }

  createLinkImg = () => {
    const { name, email, score } = this.props;
    const gravatarConversion = md5(email).toString();
    const linkImgGravatar = `https://www.gravatar.com/avatar/${gravatarConversion}`;
    this.setState({
      linkImgGravatar,
      name,
      score,
    });
  };

  render() {
    const { linkImgGravatar, name, score } = this.state;
    return (
      <div>
        {/* <TriviaLogo /> */}
        <figure>
          <img
            src={ linkImgGravatar }
            alt={ name }
            data-testid="header-profile-picture"
          />
          <figcaption
            data-testid="header-player-name"
          >
            { name }
          </figcaption>
        </figure>
        <div
          data-testid="header-score"
        >
          { `score: ${score}` }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

Header.propTypes = {
  name: string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
