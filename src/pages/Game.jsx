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
    // points: 0,
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
    const { questions } = this.props;
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
      history.push('/'); Codigo inutilizavel: "properties of undefined (reading 'push')"
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
        name={ [questions[indexQuestions].correct_answer] }
        id={ [questions[indexQuestions].correct_answer] }
        value={ [questions[indexQuestions].correct_answer] }
        data-testid="correct-answer"
        onClick={ this.onSubmitAnswer }
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
        >
          {element}
        </button>));
    });
    this.setState({
      answers: answers.sort(() => Math.random() - NUMBERMAGIC),
    });
  };

  onSubmitAnswer = () => {
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
    // Esse trecho se refere a um somador de pontos e o indexQuestion(para ir avançando nas questões)
    // this.setState({
    // if (value === correctAnswer) {
    //     points: points + 1,
    //     indexQuestions: indexQuestions + 1,
    //   }, () => { this.getCaptureAnswers(); });
    // }
  };

  render() {
    const { answers, questions, indexQuestions } = this.state;
    const NUMBERMAGICBODY = 4;
    return (
      <div>
        <Header />
        <div>Game</div>
        {questions[indexQuestions] && (
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
