import React from 'react';
import SoundsMixer from '../sounds/SoundsMixer';

const CompositionsForm = ({ handleChange, handleSubmit, composition, sounds }) => {
  return(
    <form onSubmit={ handleSubmit }>

      <SoundsMixer
        handleChange={ handleChange }
        composition={ composition }
        sounds={ sounds }
      />
      <hr/>
      <div className="form-group">
        <label htmlFor="title">Give a title to your composition!</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="For focused work"
          value={ composition.title }
          onChange={ handleChange }
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="private">Private</label>
        <input
          type="checkbox"
          name="private"
          onChange={ handleChange }
          checked={ composition.private }
        />
      </div>

      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export default CompositionsForm;
