import requestQuestsApi from '../../services/requestQuestsAPI';

export const PLAYER_INFO = 'PLAYER_INFO';
export const REQUIRED_QUESTIONS = 'REQUIRED_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const REJECTED_QUESTIONS = 'REJECTED_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';

export const playerInfo = (name, gravatarEmail) => ({
  type: PLAYER_INFO,
  name,
  gravatarEmail,
});

const requiredQuestions = () => ({
  type: REQUIRED_QUESTIONS,
});

const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

const rejectedQuestions = (error) => ({
  type: REJECTED_QUESTIONS,
  error,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const thunkQuestionsAPI = (token) => async (dispatch) => {
  dispatch(requiredQuestions());
  try {
    const data = await requestQuestsApi(token);
    dispatch(receiveQuestions(data));
  } catch (error) {
    dispatch(rejectedQuestions(error.message));
  }
};
