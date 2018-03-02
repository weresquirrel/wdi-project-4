const sound = require('../models/sound');

function soundsIndex(req, res, next) {
  sound
    .find()
    .exec()
    .then(sounds => res.json(sounds))
    .catch(next);
}

module.exports = {
  soundsIndex: soundsIndex
};
