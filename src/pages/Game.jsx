import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { getTokenStorage } from '../helpers/handlingLocalStorage';
import { thunkQuestionsAPI } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    questions: [],
    indexQuestions: 0,
    answers: [],
  };

  async componentDidMount() {
    await this.requestQuestions();
    this.checkToken();
  }

  requestQuestions = async () => {
    const { getQuestions } = this.props;
    const token = getTokenStorage();
    await getQuestions(token);
  };

  checkToken = () => {
    const { questions, history } = this.props;
    console.log(questions.length);
    if (questions.length > 0) {
      console.log('verdadeiro');
      this.setState({
        questions,
      });
      this.getCaptureAnswers();
    } else {
      console.log('false');
      localStorage.clear();
      history.push('/');
    }
  };

  getCaptureAnswers = () => {
    const { questions, indexQuestions } = this.state;
    const NUMBERMAGIC = 0.5;
    console.log(questions[indexQuestions]);
    const answers = [(
      <button
        key={ 3 }
        type="button"
        data-testid="correct-answer"
      >
        {[questions[indexQuestions].correct_answer]}
      </button>)];
    questions[indexQuestions].incorrect_answers.forEach((element, i) => {
      answers.push((
        <button
          key={ i }
          type="button"
          data-testid={ `wrong-answer-${i}` }
        >
          {element}
        </button>));
    });
    this.setState({
      answers: answers.sort(() => Math.random() - NUMBERMAGIC),
    });
  };

  render() {
    const { answers, questions, indexQuestions } = this.state;
    const NUMBERMAGICBODY = 4;
    return (
      <div>
        <Header />
        <div>Game</div>
        {questions[indexQuestions] && ( // iniciando requisito 07
          <div>
            <p
              data-testid="question-category"
            >
              { questions[indexQuestions].category }
            </p>
            <p
              data-testid="question-text"
            >
              { questions[indexQuestions].question }
            </p>
            <div data-testid="answer-options">
              {answers.slice(0, NUMBERMAGICBODY)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(thunkQuestionsAPI(token)),
});

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Game.propTypes = {
  questions: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
