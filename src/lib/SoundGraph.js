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

    req.onload = () => {
      const data = req.response;

      this.audioctx.decodeAudioData(data, (buffer) => {
        soundSrc.buffer = buffer;
        soundSrc.connect(gainNode);
        gainNode.connect(this.audioctx.destination);
        soundSrc.loop = true;
        soundSrc.start(0);
      },
      (e) => {
        console.log('error: '+ e.err);
      }
      );
    };
    req.send();
    return {gain: gainNode, source: soundSrc};
  }

  stop() {
    if (this.audioctx) {
      this.audioctx.close();
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
