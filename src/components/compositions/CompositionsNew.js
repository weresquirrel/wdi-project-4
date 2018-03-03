import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';

class SoundGraph {
  audioctx = null
  controls = {}

  loadSounds(sounds) {
    this.audioctx = new (window.AudioContext || window.webkitAudioContext)();
    sounds.forEach(sound => {
      this.controls[sound.id] = this.loadSound(sound.src);
    });
  }

  loadSound(src) {
    const soundSrc = this.audioctx.createBufferSource();
    const req = new XMLHttpRequest();

    req.open('GET', src, true);
    req.responseType = 'arraybuffer';

    const gainNode = this.audioctx.createGain();

    req.onload = () => {
      const data = req.response;

      this.audioctx.decodeAudioData(data, (buffer) => {
        soundSrc.buffer = buffer;
        soundSrc.connect(gainNode);
        gainNode.connect(this.audioctx.destination);
        soundSrc.loop = true;
        gainNode.gain.setValueAtTime(0, 0);
        soundSrc.start(0);
      },
      (e) => {
        console.log('error: '+ e.err);
      }
      );
    };
    req.send();
    return {gain: gainNode, source: soundSrc};
  }

  stop() {
    if (this.audioctx) {
      this.audioctx.close();
      this.audioctx = null;
      this.controls = {};
    }
  }

  mix(sounds) {
    Object.keys(this.controls).forEach( soundId => {
      const sound = sounds.find(s => s.id === soundId);
      if (sound) {
        this.controls[soundId].gain.gain.setValueAtTime(sound.volume/100.0, 0);
      } else {
        this.controls[soundId].gain.gain.setValueAtTime(0, 0);
      }
    });  
  }

}

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
