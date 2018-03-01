import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <ul>
        <li><Link to="/compositions">Browse</Link></li>
        { Auth.isAuthenticated() &&<li><Link to="/compositions/new">Add New</Link></li>}
        { Auth.isAuthenticated() &&<li><Link to={`/users/${Auth.getPayload().userId}/compositions`}>My stuff</Link></li>}
        { !Auth.isAuthenticated() && <li><Link to="/login">Login</Link></li>}
        { !Auth.isAuthenticated() && <li><Link to="/register">Register</Link></li> }
        { Auth.isAuthenticated() && <li><a href="#" onClick={logout}>Logout</a></li> }
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);
