const mongoose = require('mongoose');

const soundSchema = mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String },
  icon: { type: String }
});

soundSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('sound', soundSchema);
