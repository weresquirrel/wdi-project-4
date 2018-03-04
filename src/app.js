import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CompositionsNew from './components/compositions/CompositionsNew';
import CompositionsIndex from './components/compositions/CompositionsIndex';
import CompositionsShow from './components/compositions/CompositionsShow';
import CompositionsEdit from './components/compositions/CompositionsEdit';
import CompositionsDemo from './components/compositions/CompositionsDemo';
import Navbar from './components/utility/Navbar';
import UsersCompositionsIndex from './components/users/UsersCompositionsIndex';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import 'bootstrap-css-only';
import './scss/style.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <h1><Link to="/">ZeN SoUNdS</Link></h1>
            <Navbar />

          </header>
          <main>
            <Switch>
              <Route path="/login" component={ Login } />
              <Route path="/register" component={ Register } />
              <Route path="/users/:userId/compositions" component={ UsersCompositionsIndex } />
              <Route path="/compositions/new" component={ CompositionsNew } />
              <Route path="/compositions/:id/edit" component={ CompositionsEdit } />
              <Route path="/compositions/:id" component={ CompositionsShow } />
              <Route path="/compositions" component={ CompositionsIndex } />
              <Route exact path="/" component={ CompositionsDemo } />
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
