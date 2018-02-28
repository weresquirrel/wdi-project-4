import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';

class CompositionsNew extends Component {
  state = {
    composition: {
      title: '',
      sounds: []
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const composition = Object.assign({}, this.state.composition, { [name]: value });
    this.setState({ composition });
    console.log(composition);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('submitted');
    Axios
      .post('/api/compositions', this.state.composition)
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
