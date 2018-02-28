import React, { Component } from 'react';
import Axios from 'axios';

class CompositionsShow extends Component {

  state = {
    composition: {
      title: '',
      sounds: []
    }
  }

  componentDidMount() {
    Axios
      .get(`/api/compositions/${this.props.match.params.id}`)
      .then(res => {
        this.setState({composition: res.data});
        console.log(this.state.composition);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>

        <div>
          <p>{ this.state.composition.title }</p>
        </div>

        {/* {this.state.composition.sounds.map(sound =>

          <div key={sound}>
            <div className="sound" id={sound}></div>
            <div className="stem"></div>
            <div className="leaf"></div>
          </div>

        )} */}

      </div>
    );
  }
}

export default CompositionsShow;
