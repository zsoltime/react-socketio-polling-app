import React from 'react';

import Display from './Display';

const Ask = (props) => {
  const renderChoices = props.question.a.map((choice, i) => (
    <li
      key={i}
      className="col-xs-12 col-sm-6"
    >
      <button
        key={i}
        type="button"
        className="btn btn-primary"
        onClick={() => props.onAnswer(i)}
      >
        {choice}
      </button>
    </li>
  ));
  return (
    <div>
      <Display if={props.answer === false}>
        <h2>{ props.question.q }</h2>
        <ul className="row">
          {renderChoices}
        </ul>
      </Display>
      <Display if={Number.isInteger(props.answer)}>
        <p>You've already answered this question with "{props.question.a[props.answer]}"</p>
      </Display>
    </div>
  );
};

export default Ask;
