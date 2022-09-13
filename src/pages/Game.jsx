import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import {
  getTokenStorage,
  setPlayersStorage,
  getPlayersStorage,
} from '../helpers/handlingLocalStorage';
import { thunkQuestionsAPI, addScore } from '../redux/actions/index';

const NUMBERMAGICBODY = 4;

class Game extends React.Component {
  state = {
    questions: [],
    indexQuestions: 0,
    answers: [],
    buttonIsDisabled: false,
    counter: 30,
    assertions: 0,
    score: 0,
    nextVisible: false,
    players: [],
  };

  async componentDidMount() {
    await this.requestQuestions();
    this.checkToken();
    this.countdownNextQuestion();
    this.countdown();
    this.getPlayersLocalStorage();
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

  addPlayerLocalStorage = () => { // deve ser chamada quando clicar no botão next;
    const { name, email, score } = this.props;
    const { players, indexQuestions } = this.state;
    const objPlayer = { name, email, score };
    if (indexQuestions >= NUMBERMAGICBODY) setPlayersStorage([...players, objPlayer]);
  };

  getPlayersLocalStorage = () => {
    const players = getPlayersStorage();
    if (players) this.setState({ players });
  };

  countdownNextQuestion = () => {
    const TIMECOUNTDOWN = 30000;
    setTimeout(() => {
      const button = document.getElementsByTagName('button');
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
    if (questions.length > 0) {
      this.setState({
        questions,
      });
      this.getCaptureAnswers();
    } else {
      localStorage.clear();
      history.push('/');
    }
  };

  getCaptureAnswers = () => {
    const { questions, indexQuestions, buttonIsDisabled } = this.state;
    const NUMBERMAGIC = 0.5;
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
    const BTN = document.getElementsByTagName('button');
    Object.values(BTN).map((item) => {
      item.disabled = true;
      return item;
    });
    this.buttonNext();
    this.rightAnswerAccumulator(value, correctAnswer);
  };

  buttonNext = () => {
    this.setState({ nextVisible: true });
  };

  checkDifficulty = () => {
    const { questions, indexQuestions } = this.state;
    const THREE = 3;
    switch (questions[indexQuestions].difficulty) {
    case 'hard': return THREE;
    case 'medium': return 2;
    default: return 1;
    }
  };

  rightAnswerAccumulator = (chosenAnswer, correctAnswer) => {
    const { player } = this.props;
    const { assertions, counter, score } = this.state;
    const NUMBERMAGIC = 10;
    const actualScore = NUMBERMAGIC + (counter * this.checkDifficulty());
    if (chosenAnswer === correctAnswer) {
      this.setState({
        assertions: assertions + 1,
        score: score + actualScore,
      }, () => {
        const { score: test } = this.state;
        player(test);
      });
    }
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { indexQuestions } = this.state;
    if (indexQuestions === NUMBERMAGICBODY) {
      this.addPlayerLocalStorage();
      history.push('/feedback');
    }
    this.setState((state) => ({
      indexQuestions: state.indexQuestions + 1,
      nextVisible: false,
      counter: 30,
      buttonIsDisabled: false,
    }), () => this.getCaptureAnswers());
  };

  render() {
    const {
      answers,
      questions,
      indexQuestions,
      counter,
      nextVisible,
    } = this.state;
    return (
      <div>
        <Header />
        <div>Game</div>
        { nextVisible && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.nextQuestion }
          >
            Next
          </button>)}
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
  player: (score) => dispatch(addScore(score)),
});

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  score: state.player.score,
});

Game.propTypes = {
  questions: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
