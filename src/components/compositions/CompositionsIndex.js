import React, { Component } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';

class CompositionsIndex extends Component {
  state = {
    compositions: []
  }

  componentDidMount() {
    Axios
      .get('/api/compositions')
      .then(res => {
        this.setState({compositions: res.data});
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>

        <h2>Public compositions</h2>

        {this.state.compositions.map(composition =>
          <div key={composition.id}>
            <Link to={`/compositions/${composition.id}`}>
              <p>{composition.title}</p>
            </Link>
          </div>
        )}

      </div>
    );
  }
}

export default CompositionsIndex;
