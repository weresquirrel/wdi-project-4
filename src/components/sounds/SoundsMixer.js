import React from 'react';

const SoundsMixer = ({ handleChange, composition, sounds }) => {
  const soundsArray = composition.sounds.map(sound => sound.id);
  return(
    <div className="row sounds-mixer">
      {sounds.map(sound =>
        <div key={sound.id} className="form-group col-md-3 col-sm-4 col-6 sound-wrapper">

          <label htmlFor={`sound-${sound.id}`} style={soundsArray.includes(sound.id) ? {backgroundImage: `url(${sound.icon})`} : {backgroundImage: `url(${sound.icon})`, opacity: '0.6'}}>
            <br/>
          </label>
          <input
            type="checkbox"
            name="sounds"
            id={`sound-${sound.id}`}
            value={ sound.id }
            onChange={ handleChange }
            checked={ composition.sounds.findIndex(s => s.id === sound.id) >= 0 }
            hidden
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
