class SoundGraph {
  audioctx = null
  controls = {}

  loadSounds(sounds) {
    this.audioctx = new (window.AudioContext || window.webkitAudioContext)();
    sounds.forEach(sound => {
      this.controls[sound.id] = this.loadSound(sound.src);
    });
  }

  loadSound(src) {
    const soundSrc = this.audioctx.createBufferSource();
    const req = new XMLHttpRequest();

    req.open('GET', src, true);
    req.responseType = 'arraybuffer';

    const gainNode = this.audioctx.createGain();
    gainNode.gain.setValueAtTime(0, 0);

    soundSrc.connect(gainNode);
    gainNode.connect(this.audioctx.destination);

    req.onload = () => {
      if (this.audioctx) {
        const data = req.response;

        this.audioctx.decodeAudioData(data)
          .then((buffer) => {
            soundSrc.buffer = buffer;
            soundSrc.loop = true;
            soundSrc.start(0);
          })
          .catch((/* e */) => {
            //console.log(`decode error: ${e}`);
          });
      }
    };
    req.send();
    return {gain: gainNode, source: soundSrc};
  }

  stop() {
    if (this.audioctx) {
      this.audioctx
        .close()
        .catch();
      //.catch(e => console.log(`rejected: ${e}`));
      this.audioctx = null;
      this.controls = {};
    }
  }

  mix(sounds) {
    Object.keys(this.controls).forEach( soundId => {
      const sound = sounds.find(s => s.id === soundId);
      if (sound) {
        this.controls[soundId].gain.gain.setValueAtTime(sound.volume/100.0, 0);
      } else {
        this.controls[soundId].gain.gain.setValueAtTime(0, 0);
      }
    });
  }

}

export default SoundGraph;
