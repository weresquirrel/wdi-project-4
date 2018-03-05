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
      
      <div className="form-group title-group">
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

      <div className="form-group private-group">
        <input
          type="checkbox"
          name="private"
          onChange={ handleChange }
          checked={ composition.private }
        />
        <label htmlFor="private">Private</label>
      </div>

      <div>
        <button className="btn submit-button">Save</button>
      </div>
    </form>
  );
};

export default CompositionsForm;
