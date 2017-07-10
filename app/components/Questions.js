import React from 'react';

const Questions = ({ onAsk, questions }) => {
  const renderQuestions = questions.map(question => (
    <div key={question.id} className="col-xs-12 col-sm-6 col-md-3">
      <button onClick={() => onAsk(question)}>{question.q}</button>
    </div>
  ));
  return (
    <div className="row">
      <h2>Questions</h2>
      {renderQuestions}
    </div>
  )
};

export default Questions;
