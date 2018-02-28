import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CompositionsNew from './components/compositions/CompositionsNew';

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
              <Route exact path="/compositions/new" component={ CompositionsNew } />
              {/* <Route exact path="/" component={} /> */}
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
