import { combineReducers } from 'redux';
import player from './playerReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  player,
  questionsReducer,
});

export default rootReducer;
