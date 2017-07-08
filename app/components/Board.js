import React from 'react';

const Board = (props) => {
  return (
    <h1>Board: {props.status ? 1: 0}</h1>
  );
};

export default Board;
