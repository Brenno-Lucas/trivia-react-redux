import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
// import TriviaLogo from './TriviaLogo';

class Header extends Component {
  state = {
    linkImgGravatar: '',
    name: '',
  };

  componentDidMount() {
    this.createLinkImg();
  }

  createLinkImg = () => {
    const { name, email } = this.props;
    const gravatarConversion = md5(email).toString();
    const linkImgGravatar = `https://www.gravatar.com/avatar/${gravatarConversion}`;
    this.setState({
      linkImgGravatar,
      name,
    });
  };

  render() {
    const { linkImgGravatar, name } = this.state;
    const { score } = this.props;

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
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
