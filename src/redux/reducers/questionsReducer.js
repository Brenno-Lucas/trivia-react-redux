import {
  REQUIRED_QUESTIONS,
  RECEIVE_QUESTIONS,
  REJECTED_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  loading: false,
  error: '',
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUIRED_QUESTIONS:
    return ({
      ...state,
    });
  case REJECTED_QUESTIONS:
    return ({
      ...state,
      error: action.error,
    });
  case RECEIVE_QUESTIONS:
    return ({
      ...state,
      questions: [...action.questions],
    });
  default: return state;
  }
};

export default questionsReducer;
