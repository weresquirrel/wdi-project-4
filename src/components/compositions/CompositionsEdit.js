import React, { Component } from 'react';
import Axios from 'axios';

import CompositionsForm from './CompositionsForm';
import Auth from '../../lib/Auth';

class CompositionsEdit extends Component {
  state = {
    composition: {
      title: '',
      sounds: [],
      createdBy: {}
    }
  }

  componentDidMount() {
    Axios
      .get(`/api/compositions/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ composition: res.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const composition = Object.assign({}, this.state.composition, { [name]: value });
    this.setState({ composition });
    console.log(composition);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...this.state.composition,
      createdBy: this.state.composition.createdBy.id
    };

    Axios
      .put(`/api/compositions/${this.props.match.params.id}`, updated, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push(`/compositions/${this.props.match.params.id}`))
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

export default CompositionsEdit;
