import React from 'react';

const SoundsMixer = ({ handleChange, composition, sounds }) => {
  return(
    sounds.map(sound =>
      <div key={sound.id} className="form-group">
        <label htmlFor={`sound-${sound.id}`}>{ sound.name }</label>
        <input
          type="checkbox"
          name="sounds"
          id={`sound-${sound.id}`}
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
    )
  );
};

export default SoundsMixer;
