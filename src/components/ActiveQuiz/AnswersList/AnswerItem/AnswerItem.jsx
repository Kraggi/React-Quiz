import React from 'react';
import classes from './AnswerItem.module.scss';

const AnswerItem = props => {
  const cls = [classes.AnswerItem];

  if (props.state) {
    cls.push(classes[props.state]);
  }
  return (
    <li
      onClick={() => props.onAnswerClick(props.answer.id)}
      className={cls.join(' ')}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
