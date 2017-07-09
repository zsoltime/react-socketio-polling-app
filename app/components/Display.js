import React from 'react';

const Display = (props) => {
  if (props.if) {
    return (
      <div>{ props.children }</div>
    );
  }
  return null;
};

export default Display;
