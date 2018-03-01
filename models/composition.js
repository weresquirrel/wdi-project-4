const mongoose = require('mongoose');

const compositionSchema = mongoose.Schema({
  title: { type: String, required: true },
  sounds: [],
  stars: { type: Number },
  createdBy: { type: String }
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

compositionSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('composition', compositionSchema);
