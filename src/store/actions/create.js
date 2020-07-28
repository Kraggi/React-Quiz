import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import axios from 'axios';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post(
      'https://react-quiz-a6362.firebaseio.com/quizes.json',
      getState().create.quiz
    );
    dispatch(resetQuizCreation());
  };
}
