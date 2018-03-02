import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';

class CompositionsNew extends Component {
  state = {
    composition: {
      title: '',
      sounds: []
    }
  }

  // OLD VERSION
  // handleChange = ({ target: { name, value } }) => {
  //   const composition = Object.assign({}, this.state.composition, { [name]: value });
  //   this.setState({ composition });
  //   console.log(composition);
  // }

  handleChange = ({target: {name, value, checked}}) => {
    let composition = {};

    if (name === 'sounds') {
      const oldSounds = this.state.composition.sounds;
      let newSounds = [];

      if (checked) {
        newSounds = [...oldSounds, value];
      } else {
        newSounds = oldSounds.filter((sound) => sound !== value);
      }

      composition = Object.assign({}, this.state.composition, {'sounds': newSounds});
    } else {
      composition = Object.assign({}, this.state.composition, {[name]: value});
    }
    console.log(composition);
    this.setState({composition});
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
        handleChange = { this.handleChange }
        handleSubmit = { this.handleSubmit }
        composition = { this.state.composition }
      />

    );
  }
}

export default CompositionsNew;
