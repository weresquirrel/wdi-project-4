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
        this.setState({ compositions: res.data });
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>

        <h2>Listen what the others did</h2>

        <div className="row">
          {this.state.compositions.map(composition =>
            <div key={ composition.id } className="col-md-4 col-sm-6">
              <div className="index-composition-wrapper">
                <Link to={`/compositions/${ composition.id }`}>
                  <h3>{ composition.title }</h3>
                  <p>by: { composition.createdBy.username }</p>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default CompositionsIndex;
