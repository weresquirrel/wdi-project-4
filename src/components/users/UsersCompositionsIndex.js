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
      <div >

        <h2>My compositions</h2>

        <div className="row">
          {this.state.compositions.map(composition =>
            <div key={composition.id} className="col-md-4 col-sm-6">
              <div className="index-composition-wrapper">
                <Link to={`/compositions/${composition.id}`}>
                  <h3>{ composition.title }</h3>

                  { composition.private && <p>p</p>}
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

}

export default UsersCompositionsIndex;
