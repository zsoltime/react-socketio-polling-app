import React from 'react';

import Display from './Display';
import JoinSpeaker from './JoinSpeaker';

const Speaker = (props) => {
  const { member, status, onStart } = props;
  return (
    <div>
      <Display if={ status }>
        <Display if={ member.name && member.type === 'speaker' }>
          <p>Questions</p>
          <p>Attendance</p>
        </Display>
        <Display if={ !member.name }>
          <h2>Start the Presentation</h2>
          <JoinSpeaker onStart={ onStart } />
        </Display>
      </Display>
    </div>
  );
};

export default Speaker;
