import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';

class CompositionsNew extends Component {
  state = {
    composition: {
      title: '',
      sounds: []
    },
    sounds: []
  }

  // OLD VERSION
  // handleChange = ({ target: { name, value } }) => {
  //   const composition = Object.assign({}, this.state.composition, { [name]: value });
  //   this.setState({ composition });
  //   console.log(composition);
  // }

  componentDidMount() {
    Axios
      .get('/api/sounds')
      .then(res => this.setState({ sounds: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({target: { value, name }}) => {
    let composition = null;

    if(name === 'sounds') {
      const index = this.state.composition.sounds.findIndex(sound => sound.id === value);

      if(index < 0) {
        composition = Object.assign({}, this.state.composition, { sounds: this.state.composition.sounds.concat({id: value, volume: 100})});
      } else {
        composition = Object.assign({}, this.state.composition, { sounds: this.state.composition.sounds.filter(sound => sound.id !== value)});
      }
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
