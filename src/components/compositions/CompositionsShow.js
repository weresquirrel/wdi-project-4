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
            // console.log(this.state.composition);
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

        <div className="show-title">
          <h3>{ this.state.composition.title }</h3>
          <p>by: { this.state.composition.createdBy.username }</p>
        </div>

        <div className="row">

          {this.state.composition.sounds.map(chosenSound => {
            const sound = this.state.sounds.find(s => s.id === chosenSound.id);
            return(
              <div key={chosenSound.id} className="col-md-3 col-sm-4 col-6 show-sound-wrapper">

                <div
                  className="show-sound-icon-holder"
                  style={{backgroundImage: `url(${sound.icon})`} }>
                </div>
                <br/>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={ chosenSound.volume }
                  className="slider"
                  disabled
                />
                <div className="show-data">{ sound.name }: { chosenSound.volume }%</div>

              </div>
            );
          })}

        </div>
        <div className="row show-buttons">
          { Auth.isAuthenticated() &&
            this.state.composition.createdBy.id === Auth.getPayload().userId &&
          <button className="btn zen-button edit-button">
            <Link to={`/compositions/${this.state.composition.id}/edit`}>
              Edit
            </Link>
          </button>}

          { Auth.isAuthenticated() &&
            this.state.composition.createdBy.id === Auth.getPayload().userId &&
          <button onClick={ this.deleteComposition } className="btn zen-button">
            Delete
          </button>}
        </div>

      </div>
    );
  }
}

export default CompositionsShow;
