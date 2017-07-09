import React from 'react';

import Display from './Display';
import JoinSpeaker from './JoinSpeaker';
import Attendance from './Attendance';

const Speaker = (props) => {
  const { audience, member, status, onStart } = props;
  return (
    <div>
      <Display if={ status }>
        <Display if={ member.name && member.type === 'speaker' }>
          <p>Questions</p>
          <Attendance audience={audience} />
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
