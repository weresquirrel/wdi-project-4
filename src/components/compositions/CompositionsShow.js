import React, { Component } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import SoundGraph from '../../lib/SoundGraph';

class CompositionsShow extends Component {

  state = {
    composition: {
      title: '',
      sounds: [],
      createdBy: {}
    },
    sounds: []
  }

  soundGraph = new SoundGraph

  deleteComposition = () => {
    Axios
      .delete(`/api/compositions/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` }})
      .then(() => {
        this.props.history.push(`/users/${Auth.getPayload().userId}/compositions`);
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {

    Axios
      .get('/api/sounds')
      .then(res => {
        this.setState({ sounds: res.data });
        this.soundGraph.loadSounds(res.data);
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

  componentWillUnmount() {
    this.soundGraph.stop();
  }

  componentDidUpdate() {
    this.soundGraph.mix(this.state.composition.sounds);
  }

  render() {
    return(
      <div>

        <div>
          <p>{ this.state.composition.title }</p>
          <p>by: { this.state.composition.createdBy.username }</p>
        </div>

        {this.state.composition.sounds.map(chosenSound => {
          const sound = this.state.sounds.find(s => s.id === chosenSound.id);
          return(
            <div key={chosenSound.id}>
              {/* <img src={ sound.icon } />  */}
              <p>{ sound.name }: { chosenSound.volume }%</p>

            </div>
          );
        })}

        { Auth.isAuthenticated() &&
          this.state.composition.createdBy.id === Auth.getPayload().userId &&
        <button className="btn zen-button edit-button">
          <Link to={`/compositions/${this.state.composition.id}/edit`}>
            Edit
          </Link>
        </button>}

        {/* {
          console.log('by: ' + this.state.composition.createdBy.id),
          console.log('pl: ' + Auth.getPayload().userId)
        } */}

        { Auth.isAuthenticated() &&
          this.state.composition.createdBy.id === Auth.getPayload().userId &&
        <button onClick={ this.deleteComposition } className="btn zen-button">
          Delete
        </button>}

      </div>
    );
  }
}

export default CompositionsShow;
