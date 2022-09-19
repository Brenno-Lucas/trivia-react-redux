import { PLAYER_INFO, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_INFO:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    });
  case ADD_SCORE:
    return ({
      ...state,
      score: action.score,
      assertions: action.assertions,
    });
  default:
    return state;
  }
};

export default player;
