import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';

class CompositionsEdit extends Component {
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

    Axios
      .put(`/api/compositions/${this.props.match.params.id}`, this.state.composition)
      .then(() => this.props.history.push(`/compositions/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    Axios
      .get(`/api/compositions/${this.props.match.params.id}`)
      .then(res => this.setState({ composition: res.data }))
      .catch(err => console.log(err));
    console.log(this.state);
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

export default CompositionsEdit;
