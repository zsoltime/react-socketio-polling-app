import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ speaker, status, title }) => (
  <header className="row">
    <Link to="/">Home</Link>
    <Link to="/board">Board</Link>
    <Link to="/rffe">404</Link>
    <div className="col-xs-10">
      <h1>{ title }</h1>
      <h2>{ speaker }</h2>
    </div>
    <div className="col-xs-2">
      <div className={ status ? 'connected' : 'disconnected' }></div>
    </div>
  </header>
);

Header.defaultProps = {
  status: false,
};

Header.propTypes = {
  status: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
