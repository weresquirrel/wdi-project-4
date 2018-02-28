import React, { Component } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';

class CompositionsShow extends Component {

  state = {
    composition: {
      title: '',
      sounds: []
    }
  }

  deleteComposition = () => {
    Axios
      .delete(`/api/compositions/${this.props.match.params.id}`)
      .then(() => {
        // it should go rather to the personal index
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
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

        <button>
          <Link to={`/compositions/${this.state.composition.id}/edit`} >
            Edit
          </Link>
        </button>

        <button onClick={ this.deleteComposition }>
          Delete
        </button>

      </div>
    );
  }
}

export default CompositionsShow;
