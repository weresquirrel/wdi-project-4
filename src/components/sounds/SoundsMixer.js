import React from 'react';

const SoundsMixer = ({ handleChange, composition, sounds }) => {
  return(
    <div className="row">
      {sounds.map(sound =>
        <div key={sound.id} className="form-group col-md-3 col-sm-4 col-xs-6 sound-wrapper">

          <label htmlFor={`sound-${sound.id}`}>
            <img src={sound.icon} />
            <br/>
            { sound.name }
          </label>
          <input
            type="checkbox"
            name="sounds"
            id={`sound-${sound.id}`}
            value={ sound.id }
            onChange={ handleChange }
            checked={ composition.sounds.findIndex(s => s.id === sound.id) >= 0 }
          />
          <br/>
          { (composition.sounds.findIndex(s => s.id === sound.id) >= 0) &&
            <input
              type="range"
              min="1"
              max="100"
              name={`volume-${sound.id}`}
              value={composition.sounds[composition.sounds.findIndex(s => s.id === sound.id)].volume}
              onChange={ handleChange }
              className="slider"
            />
          }
        </div>

      )}
    </div>
  );
};

export default SoundsMixer;
