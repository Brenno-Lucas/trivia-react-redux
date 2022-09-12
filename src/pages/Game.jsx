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
    buttonIsDisabled: false,
    counter: 30,
    assertions: 0,
    score: 0,
  };

  async componentDidMount() {
    await this.requestQuestions();
    this.checkToken();
    this.countdownNextQuestion();
    this.countdown();
  }

  componentDidUpdate() {
    // this.countdown();
  }

  countdown = () => {
    const { counter } = this.state;
    const TIMECOUNTER = 1000;
    for (let i = counter; i > 0; i -= 1) {
      setTimeout(() => this.setState((state) => ({
        counter: state.counter - 1,
      })), i * TIMECOUNTER);
    }
  };

  countdownNextQuestion = () => {
    const TIMECOUNTDOWN = 30000;
    setTimeout(() => {
      Object.values(button).map((item) => {
        item.disabled = true;
        return item;
      });
      this.getCaptureAnswers();
    }, TIMECOUNTDOWN);
  };

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
    const {
      questions,
      indexQuestions,
      buttonIsDisabled,
    } = this.state;
    const NUMBERMAGIC = 0.5;
    console.log(questions[indexQuestions]);
    const answers = [(
      <button
        key={ 3 }
        type="button"
        name={ [questions[indexQuestions].correct_answer] }
        id={ [questions[indexQuestions].correct_answer] }
        value={ [questions[indexQuestions].correct_answer] }
        data-testid="correct-answer"
        onClick={ this.onSubmitAnswer }
        disabled={ buttonIsDisabled }
      >
        {[questions[indexQuestions].correct_answer]}
      </button>)];
    questions[indexQuestions].incorrect_answers.forEach((element, i) => {
      answers.push((
        <button
          key={ i }
          type="button"
          name={ element }
          id={ element }
          value={ element }
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.onSubmitAnswer }
          disabled={ buttonIsDisabled }
        >
          {element}
        </button>));
    });
    this.setState({
      answers: answers.sort(() => Math.random() - NUMBERMAGIC),
    });
  };

  onSubmitAnswer = ({ target: { value } }) => {
    const { questions, indexQuestions } = this.state;
    console.log(questions);
    const correctAnswer = questions[indexQuestions].correct_answer;
    const answers = document.getElementById('answer-options');
    const answersElements = [];
    Object.values(answers.children)
      .forEach((item) => answersElements.push(item));
    const correctButton = answersElements
      .filter((item) => item.value === correctAnswer)[0].textContent;
    document.getElementById(correctButton)
      .setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
    const incorrectButton = answersElements.filter((item) => item.value !== correctAnswer)
      .map((i) => i.textContent);
    incorrectButton.map((i) => document.getElementById(i)
      .setAttribute('style', 'border: 3px solid red'));
    Object.values(button).map((item) => {
      item.disabled = true;
      return item;
    });
    this.rightAnswerAccumulator(value);
  };

  checkDifficulty = () => {
    const { question, indexQuestions } = this.state;
    const { dificulty } = question[indexQuestions];
    const THREE = 3;
    switch (dificulty) {
    case 'hard':
      return THREE;
    case 'medium':
      return 2;
    default:
      return 1;
    }
  };

  rightAnswerAccumulator = (chosenAnswer) => {
    const { indexQuestions, assertions, counter } = this.state;
    const score = 10 + (counter * this.checkDifficulty());
    if (chosenAnswer === correctAnswer) {
      this.setState({
        assertions: assertions + 1,
        indexQuestions: indexQuestions + 1,
        score,
      });
    }
  }; // Acumulador de acertos, será que ta certo ?

  render() {
    const {
      answers,
      questions,
      indexQuestions,
      counter,
    } = this.state;
    const NUMBERMAGICBODY = 4;
    return (
      <div>
        <Header />
        <div>Game</div>
        {questions[indexQuestions] && (
          <div>
            <div>{ counter }</div>
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
            <div data-testid="answer-options" id="answer-options">
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
