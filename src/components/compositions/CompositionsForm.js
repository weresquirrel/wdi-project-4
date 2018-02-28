import React from 'react';

const CompositionsForm = ({ handleChange, handleSubmit, composition }) => {
  return(
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label htmlFor="title">Give a title to your composition!</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="For focused work"
          value={ composition.title }
          onChange={ handleChange }
        />
      </div>

      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export default CompositionsForm;
