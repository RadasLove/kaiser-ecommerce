import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#FF9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link 
        className="nav-link" 
        style={isActive(history, '/')}
        to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
          Sign
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
          SignUp
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
