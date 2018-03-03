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
            value={ sound.id }
            onChange={ handleChange }
            checked={ composition.sounds.findIndex(s => s.id === sound.id) >= 0 }
          />
          { (composition.sounds.findIndex(s => s.id === sound.id) >= 0) &&
            <input
              type="range"
              min="1"
              max="100"
              name={`volume-${sound.id}`}
              value={composition.sounds[composition.sounds.findIndex(s => s.id === sound.id)].volume}
              onChange={ handleChange }
            />
          }
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
