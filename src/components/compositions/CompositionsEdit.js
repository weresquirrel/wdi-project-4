import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';
import SoundGraph from '../../lib/SoundGraph';

class CompositionsEdit extends Component {
  state = {
    composition: {
      title: '',
      sounds: [],
      createdBy: {},
      private: false
    },
    sounds: []
  }

  soundGraph = new SoundGraph

  componentDidMount() {

    Axios
      .get('/api/sounds')
      .then(res => {
        this.setState({ sounds: res.data });
        this.soundGraph.loadSounds(res.data);
        Axios
          .get(`/api/compositions/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ composition: res.data });
            console.log(this.state);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.soundGraph.stop();
  }

  handleChange = ({target: { value, name, checked }}) => {
    let composition = null;

    if(name === 'sounds') {
      const index = this.state.composition.sounds.findIndex(sound => sound.id === value);

      if(index < 0) {
        composition = Object.assign({}, this.state.composition,
          { sounds: this.state.composition.sounds.concat({id: value, volume: 100})});
      } else {
        composition = Object.assign({}, this.state.composition,
          { sounds: this.state.composition.sounds.filter(sound => sound.id !== value)});
      }
    } else if ( name.startsWith('volume-') ) {
      const soundId = name.substring(7);

      composition = Object.assign({}, this.state.composition,
        { sounds: this.state.composition.sounds
          .filter(sound => sound.id !== soundId)
          .concat({ id: soundId, volume: parseInt(value) })
        });
    } else if(name === 'private') {
      composition = Object.assign({}, this.state.composition, { [name]: checked });
    } else {
      composition = Object.assign({}, this.state.composition, { [name]: value });
    }
    console.log(composition);
    this.setState({ composition });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...this.state.composition,
      createdBy: this.state.composition.createdBy.id
    };

    Axios
      .put(`/api/compositions/${this.props.match.params.id}`, updated, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push(`/compositions/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    this.soundGraph.mix(this.state.composition.sounds);
  }

  render() {
    return(
      <CompositionsForm
        handleChange = { this.handleChange }
        handleSubmit = { this.handleSubmit }
        composition = { this.state.composition }
        sounds={this.state.sounds}
      />
    );
  }
}

export default CompositionsEdit;
