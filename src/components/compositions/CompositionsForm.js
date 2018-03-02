import React from 'react';
const CompositionsForm = ({ handleChange, handleSubmit, composition, sounds }) => {
  return(
    <form onSubmit={ handleSubmit }>
      <hr/>

      { sounds.map(sound =>
        <div key={sound.id} className="form-group">
          <label>{ sound.name }</label>
          <input
            type="checkbox"
            name="sounds"
            value={sound.id}
            onChange={handleChange}
          />
        </div>
      )}

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
