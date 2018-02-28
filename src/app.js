import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CompositionsNew from './components/compositions/CompositionsNew';
import CompositionsIndex from './components/compositions/CompositionsIndex';
import CompositionsShow from './components/compositions/CompositionsShow';
import CompositionsEdit from './components/compositions/CompositionsEdit';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './scss/style.scss';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <h1><Link to="/">Zen Sounds</Link></h1>
            <nav>
              <ul>
                <li><Link to="/compositions/new">Add New</Link></li>
                <li><Link to="/compositions">Browse</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route path="/login" component={ Login } />
              <Route path="/register" component={ Register } />
              <Route path="/compositions/new" component={ CompositionsNew } />
              <Route path="/compositions/:id/edit" component={ CompositionsEdit } />
              <Route path="/compositions/:id" component={ CompositionsShow } />
              <Route path="/compositions" component={ CompositionsIndex } />
              {/* <Route exact path="/" component={ Demo } /> */}
            </Switch>
          </main>
        </div>
      </Router>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
