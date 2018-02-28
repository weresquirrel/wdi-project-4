import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CompositionsNew from './components/compositions/CompositionsNew';
import CompositionsIndex from './components/compositions/CompositionsIndex';
import CompositionsShow from './components/compositions/CompositionsShow';

import './scss/style.scss';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <h1><Link to="/">Zen Sounds</Link></h1>
          </header>
          <main>
            <Switch>
              <Route path="/compositions/new" component={ CompositionsNew } />
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
