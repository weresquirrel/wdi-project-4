import React, { Component } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class CompositionsShow extends Component {

  state = {
    composition: {
      title: '',
      sounds: [],
      createdBy: {}
    },
    sounds: []
  }

  deleteComposition = () => {
    Axios
      .delete(`/api/compositions/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` }})
      .then(() => {
        // it should go rather to the personal index
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {

    Axios
      .get('/api/sounds')
      .then(res => {
        this.setState({ sounds: res.data });
        Axios
          .get(`/api/compositions/${this.props.match.params.id}`)
          .then(res => {
            this.setState({composition: res.data});
            console.log(this.state.composition);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }

  render() {
    return(
      <div>

        <div>
          <p>{ this.state.composition.title }</p>
          <p>{ this.state.composition.createdBy.username }</p>
        </div>

        {this.state.composition.sounds.map(chosenSound => {
          const sound = this.state.sounds.find(s => s.id === chosenSound.id);
          return(
            <div key={chosenSound.id}>

              <p>{ sound.name }: { chosenSound.volume }%</p>

            </div>
          );
        })}

        { Auth.isAuthenticated() &&
        <button>
          <Link to={`/compositions/${this.state.composition.id}/edit`} >
            Edit
          </Link>
        </button>}

        { Auth.isAuthenticated() &&
        <button onClick={ this.deleteComposition }>
          Delete
        </button>}

      </div>
    );
  }
}

export default CompositionsShow;
