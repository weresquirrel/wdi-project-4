import React, { Component } from 'react';
// import Axios from 'axios';

// import CompositionsForm from './CompositionsForm';

class CompositionsNew extends Component {
  state = {
    composition: {
      title: '',
      sounds: []
    }
  }

  handleChange = () => {
    console.log('changed');
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('submitted');

  }

  render() {
    return(

      <form onSubmit={ this.handleSubmit }>
        <div className="form-group">
          <label htmlFor="title">Give a title to your composition!</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="For focused work"
            value={ this.state.composition.title }
            onChange={ this.handleChange }
          />
        </div>

        <div>
          <button>Save</button>
        </div>
      </form>

    );
  }
}

export default CompositionsNew;
