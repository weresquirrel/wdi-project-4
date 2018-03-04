import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';
import SoundGraph from '../../lib/SoundGraph';

class CompositionsNew extends Component {
  state = {
    composition: {
      title: '',
      // sounds: [{id: 'id01', volume: 86},{..}]
      sounds: [],
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

    console.log('submitted');
    Axios
      .post('/api/compositions', this.state.composition, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`} })
      .then(() => {
        // it should go rather to the show || the personal index
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    this.soundGraph.mix(this.state.composition.sounds);
  }

  render() {
    return(
      <CompositionsForm
        handleChange={ this.handleChange }
        handleSubmit={ this.handleSubmit }
        composition={ this.state.composition }
        sounds={this.state.sounds}
      />

    );
  }
}

export default CompositionsNew;
