import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = (props) => (
  <div className="not-found">
    <h1>Whoops</h1>
    <p>We cannot find the page you're looking for.</p>
    <p>Were you looking for one of these?</p>
    <ul>
      <li><Link to="/">Join as Audience</Link></li>
      <li><Link to="/speaker">Start the Presentation</Link></li>
      <li><Link to="/board">View the Board</Link></li>
    </ul>
  </div>
);

export default Page404;
