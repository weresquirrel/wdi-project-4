import React, { Component } from 'react';
import Axios from 'axios';

import SoundsMixer from '../sounds/SoundsMixer';
import SoundGraph from '../../lib/SoundGraph';

class CompositionsDemo extends Component {
  state = {
    composition: {
      sounds: []
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

  componentDidUpdate() {
    this.soundGraph.mix(this.state.composition.sounds);
  }

  handleChange = ({target: { value, name }}) => {
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

    }
    console.log(composition);
    this.setState({ composition });
  }

  render() {
    return(
      <div>
        <SoundsMixer
          handleChange={ this.handleChange }
          composition={ this.state.composition }
          sounds={ this.state.sounds }
        />
        <p className="demo-p">To save your composition, please register</p>
      </div>

    );
  }
}

export default CompositionsDemo;
