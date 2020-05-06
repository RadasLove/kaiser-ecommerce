import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#FF9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <div>
    <div className="bg-primary"></div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">
          Home
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, '/user/dashboard')}
            to="/user/dashboard"
          >
            dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, '/admin/dashboard')}
            to="/admin/dashboard"
          >
            dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signin')}
              to="/signin"
            >
              Přihlášení
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signup')}
              to="/signup"
            >
              Registrace
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: 'pointer', color: '#ffffff' }}
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            Odhlášení
          </span>
        </li>
      )}
    </ul>
  </div>
  
);

export default withRouter(Menu);
