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
        // console.log(res.data);
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
              <div className="user-index-composition-wrapper">
                <Link to={`/compositions/${composition.id}`}>

                  { composition.private &&
                    <img src="../../../static/icons/002-padlock.svg" className="padlock-index"/>}

                  <h3>{ composition.title }</h3>
                  <p>{ composition.sounds.length } sounds</p>
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
