import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвета солнце?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          { id: 1, text: 'Черное' },
          { id: 2, text: 'Желтое' },
          { id: 3, text: 'Розовое' },
          { id: 4, text: 'Серое' },
        ],
      },
      {
        question: 'Назовите столицу Беларуси?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          { id: 1, text: 'Могилев' },
          { id: 2, text: 'Витебск' },
          { id: 3, text: 'Гродно' },
          { id: 4, text: 'Минск' },
        ],
      },
    ],
  };

  onAnswerClickHandler = answerId => {
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' },
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished!');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: 'error' },
      });
    }
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>React Quiz</h1>

          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            onAnswerClick={this.onAnswerClickHandler}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
