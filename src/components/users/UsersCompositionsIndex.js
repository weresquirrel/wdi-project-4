import React, { Component } from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import { Link } from 'react-router-dom';

class UsersCompositionsIndex extends Component {
  state = {
    compositions: []
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.userId}/compositions`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`} })
      .then(res => {
        this.setState({ compositions: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>

        <h2>My compositions</h2>

        {this.state.compositions.map(composition =>
          <div key={composition.id}>
            <Link to={`/compositions/${composition.id}`}>
              <p>{ composition.title }</p>
            </Link>
          </div>
        )}

      </div>
    );
  }

}

export default UsersCompositionsIndex;
