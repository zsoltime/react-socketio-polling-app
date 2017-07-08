import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ status, title }) => (
  <header className="row">
    <div className="col-xs-10">
      <h1>{ title }</h1>
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
