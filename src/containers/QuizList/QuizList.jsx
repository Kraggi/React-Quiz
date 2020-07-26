import React, { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes = () => {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        'https://react-quiz-a6362.firebaseio.com/quizes.json'
      );
      const quizes = [];
      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
      this.setState({ quizes, loading: false });
    } catch (error) {
      console.log('Oops', error);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
