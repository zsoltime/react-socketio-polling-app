import React from 'react';

import Display from './Display';
import Join from './Join';

const Audience = (props) => {
  return (
    <Display if={ props.status }>
      <Display if={ props.member.name }>
        <h2>Welcome, { props.member.name }</h2>
        <p>{ props.audience.length } members are connected.</p>
        <p>Questions will appear here.</p>
      </Display>

      <Display if={ !props.member.name }>
        <h2>Join the Session</h2>
        <Join onJoin={ props.onJoin } />
      </Display>
    </Display>
  );
};

export default Audience;
