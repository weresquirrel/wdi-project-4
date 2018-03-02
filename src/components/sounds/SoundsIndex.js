import React, { Component } from 'react';
import Axios from 'axios';

class SoundsIndex extends Component {
  state = {
    sounds: []
  }

  componentDidMount() {
    Axios
      .get('/api/sounds')
      .then(res => {
        this.setState({ sounds: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>

        <h2>All the sound options</h2>

        {this.state.sounds.map(sound =>
          <div key={ sound.id }>
            <label htmlFor={ sound.name }>{ sound.name }</label>
            <input
              type="checkbox"
              id={ sound.name }
              value={ sound.name }
              name="sounds"
              // I need to change the handleChange
              // onChange={ handleChange }
              // checked={ composition.sounds.indexOf({sound.name}) >= 0 }
              // checked={sound.name}
            />
          </div>
        )}

      </div>
    );
  }

}

export default SoundsIndex;
